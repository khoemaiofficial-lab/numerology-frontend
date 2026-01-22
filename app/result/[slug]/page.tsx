"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation'; // Thêm useSearchParams
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { 
  Loader2, ArrowDown, Sparkles, Globe, Heart, X, CalendarDays, AlertCircle, ChevronRight, Zap,
  BookOpen,
  Share2,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { calculatePersonalAndWorldNumber } from '@/lib/utils';
import { calculateNumerology } from '@/utils/numerology';
import { DAILY_PREDICTIONS } from '@/app/constants/predictions';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const playfair = Playfair_Display({ subsets: ['vietnamese'], weight: ['600', '700', '900'] });
const inter = Inter({ subsets: ['vietnamese'], weight: ['300', '400', '600'] });

// --- COMPONENT THANH NĂNG LƯỢNG CAO CẤP (CHO WIDGET) ---
const EnergyBar = ({ percentage, color, label, value }: { percentage: number, color: string, label: string, value: string | number }) => (
  <div className="w-full space-y-2 mb-6 group">
    <div className="flex justify-between items-end px-1">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">{label}</span>
      <span className="text-xs font-black text-white tabular-nums">{percentage}%</span>
    </div>
    <div className="relative h-3 w-full bg-white/5 rounded-full border border-white/10 p-[2px] overflow-hidden backdrop-blur-sm">
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          background: `linear-gradient(90deg, ${color}60, ${color}, #fff)`,
          boxShadow: `0 0 15px ${color}40`
        }}
        className="relative h-full rounded-full"
      />
    </div>
  </div>
);

// --- COMPONENT THANH NĂNG LƯỢNG PREMIUM (CHO MODAL) ---
const CosmicEnergyBar = ({ percentage, color, label }: { percentage: number, color: string, label: string }) => (
  <div className="w-full space-y-3 group">
    <div className="flex justify-between items-end px-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{label}</span>
      <span className="text-sm font-black text-white tabular-nums tracking-tighter">{percentage}%</span>
    </div>
    <div className="relative h-4 w-full bg-white/5 rounded-full border border-white/10 p-[3px] overflow-hidden backdrop-blur-md">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          background: `linear-gradient(90deg, ${color}40, ${color}, #fff)`,
          boxShadow: `0 0 25px ${color}50`
        }}
        className="relative h-full rounded-full shadow-inner"
      >
        <motion.div 
          animate={{ x: ['-100%', '250%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg]"
        />
      </motion.div>
    </div>
  </div>
);

// Tách nội dung chính để sử dụng useSearchParams an toàn trong Next.js
function ResultContent() {
  const params = useParams();
  const searchParams = useSearchParams(); // Hook để đọc URL params
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'mindset' | 'action' | 'opportunity'>('mindset');
  const [currentDate, setCurrentDate] = useState(''); 
  const widgetRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); 
  const [partnerInfo, setPartnerInfo] = useState({ name: '', birthday: '' });
  const [validationError, setValidationError] = useState('');
  const [compTab, setCompTab] = useState<'love' | 'work' | 'lesson'>('love');
  const [partnerEnergy, setPartnerEnergy] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const calculateQuickEnergy = (dateStr: string) => {
    const digits = dateStr.replace(/\D/g, '');
    let sum = digits.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    while (sum > 9) sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    return sum;
  };

  // --- LOGIC 1: FETCH DỮ LIỆU CƠ BẢN ---
  useEffect(() => {
    const decodeAndFetch = async () => {
      if (!slug) return;
      try {
        const now = new Date();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();
        setCurrentDate(`${d} . ${m} . ${y}`);

        const parts = slug.split('-');
        const birthdayRaw = parts.pop() || "";
        const name = parts.join(' ').toUpperCase();
        const data = calculateNumerology(name, birthdayRaw);
        const { worldDay, personalDay } = calculatePersonalAndWorldNumber(data);
        
        const dailyContent = DAILY_PREDICTIONS[worldDay]?.[personalDay] || {
            mindset: "Năng lượng hôm nay khuyến khích bạn kết nối sâu sắc hơn với bản thân.",
            action: "Hãy dành thời gian để lập kế hoạch cho những bước đi quan trọng.",
            opportunity: "Một cơ hội hợp tác mới có thể xuất hiện.",
            energyLevel: 50
        };

        setResult({ ...data, worldDay, personalDay, dailyContent });

        const sanityQuery = `*[_type == "post" && targetNumber == ${data.lifePath}] | order(publishedAt desc)[0...3] {
          title, "slug": slug.current, "categoryName": category->title, mainImage
        }`;
        const sanityPosts = await client.fetch(sanityQuery);
        setPosts(sanityPosts || []);
        
      } catch (error) {
        console.error("Lỗi dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    decodeAndFetch();
  }, [slug]);

  // --- LOGIC 2: TỰ ĐỘNG MỞ MODAL NẾU CÓ THÔNG SỐ TRÊN URL ---
  useEffect(() => {
    const pName = searchParams.get('pName');
    const pBirth = searchParams.get('pBirth');

    if (pName && pBirth && result) {
      setPartnerInfo({ name: pName, birthday: pBirth });
      setPartnerEnergy(calculateQuickEnergy(pBirth));
      setModalStep(3); // Nhảy thẳng bước kết quả
      setIsModalOpen(true);
    }
  }, [searchParams, result]);

  const resetCompatibilityModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setPartnerInfo({ name: '', birthday: '' });
    setValidationError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const isFormValid = partnerInfo.name.trim().length >= 2 && 
                        partnerInfo.birthday !== "" && 
                        new Date(partnerInfo.birthday).getFullYear() >= 1940 && 
                        new Date(partnerInfo.birthday).getFullYear() <= 2013;

    if (!isFormValid) {
      setValidationError('Thông tin chưa chính xác. Vui lòng kiểm tra lại Tên và Năm sinh (từ 1940 -> 2013).');
      return;
    }
    
    setValidationError('');
    setModalStep(2);
    setPartnerEnergy(calculateQuickEnergy(partnerInfo.birthday));
    setTimeout(() => setModalStep(3), 2500);
  };

  // --- LOGIC 3: XỬ LÝ CHIA SẺ LINK CÁ NHÂN HÓA ---
  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?pName=${encodeURIComponent(partnerInfo.name)}&pBirth=${partnerInfo.birthday}`;
    const shareText = `Khám phá mức độ hòa hợp 85% giữa mình và ${partnerInfo.name}! ✨`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Hòa hợp năng lượng', text: shareText, url: shareUrl });
      } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (loading || !result) return (
    <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>
  );

  const auraColor = result.color || "#6366f1";

  return (
    <main className={`${inter.className} min-h-screen bg-[#020205] text-slate-300 flex flex-col items-center relative overflow-x-hidden antialiased`}>
      <div style={{ background: `radial-gradient(circle at 50% 0%, ${auraColor}20 0%, transparent 70%)` }} className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0" />

      <div className="w-full max-w-4xl z-10 px-6 pb-24">
        {/* SECTION 1: HERO */}
        <section className="h-[95dvh] flex flex-col items-center justify-center text-center relative">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h1 style={{ textShadow: `0 0 60px ${auraColor}80` }} className={`${playfair.className} text-[150px] md:text-[220px] font-black text-white leading-none tracking-tighter`}>{result.lifePath}</h1>
          </motion.div>
          <div className="space-y-4">
            <h2 className={`${playfair.className} mt-6 text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>{result.name}</h2>
            <p style={{ color: auraColor }} className="text-[10px] md:text-[12px] tracking-[0.6em] font-black uppercase">{result.title}</p>
          </div>
          <div className="mt-8 bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 rounded-[40px] text-xs text-slate-400 font-light italic leading-relaxed max-w-md relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020205] px-4 text-indigo-500"><Sparkles size={14}/></div>
            "{result.description}"
          </div>
          <button onClick={() => widgetRef.current?.scrollIntoView({ behavior: 'smooth' })} className="mt-12 group flex flex-col items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.4em] text-slate-500 uppercase group-hover:text-white transition-colors">Khám phá năng lượng hôm nay</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}><ArrowDown className="w-6 h-6 text-slate-700" /></motion.div>
          </button>
        </section>

        {/* SECTION 2: DAILY WIDGET */}
        <section ref={widgetRef} className="pb-12 scroll-mt-20">
            <div className="relative p-[1px] rounded-[55px] bg-gradient-to-b from-indigo-500/40 to-white/5">
                <div className='grid bg-[#050512]/95 backdrop-blur-3xl rounded-[54px] p-8 md:p-20 relative overflow-hidden lg:grid-cols-2 gap-16'>
                  <div>
                    <div className="text-center mb-12 relative z-10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-4">{currentDate}</p>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                          <Globe className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ngày Thế Giới: {result.worldDay}</span>
                      </div>
                    </div>
                    <div className="text-center  relative z-10">
                        <div className="text-8xl md:text-[160px] font-black text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] leading-none">{result.personalDay}</div>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.6em] mt-6">Năng lượng cá nhân</p>
                        <div className="mt-10 max-w-[320px] mx-auto">
                            <EnergyBar percentage={Math.round((result.personalDay / 9) * 100)} color={auraColor} label="Cường độ rung động" value={result.personalDay} />
                        </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 min-h-[220px] relative z-10 flex flex-col items-center text-center">
                      <AnimatePresence mode="wait">
                          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                              <h4 className="font-bold text-[10px] uppercase tracking-widest text-indigo-400">{activeTab === 'mindset' ? 'Tâm thế' : activeTab === 'action' ? 'Hành động' : 'Cơ hội'}</h4>
                              <p className="text-slate-300 text-sm md:text-lg font-light leading-relaxed max-w-lg">{activeTab === 'mindset' ? result.dailyContent.mindset : activeTab === 'action' ? result.dailyContent.action : result.dailyContent.opportunity}</p>
                              <button onClick={() => setIsModalOpen(true)} className="relative mt-8 flex items-center justify-between w-full max-w-sm mx-auto p-5 rounded-[28px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)] active:scale-[0.96] transition-all duration-200 overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.3),transparent)] animate-[spin_4s_linear_infinite]" />
                                <div className="flex items-center gap-4 text-left relative z-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500/40 blur-xl rounded-full animate-pulse" />
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-white/10 relative z-10"><Heart size={20} fill="currentColor" /></div>
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="text-[10px] font-black text-white uppercase tracking-[0.15em]">Tương hợp năng lượng</p>
                                      <p className="text-[11px] text-slate-400 italic">Kiểm tra tần số với người ấy</p>
                                    </div>
                                </div>
                                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10"><ChevronRight size={18} className="text-indigo-400" /></div>
                              </button>
                          </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-[30px] border border-white/10 relative">
                      <motion.div className="absolute bg-white rounded-[24px] shadow-lg" layoutId="tabPill" transition={{ type: "spring", duration: 0.5 }}
                        style={{ top: 6, bottom: 6, left: activeTab === 'mindset' ? '6px' : activeTab === 'action' ? '33.33%' : '66.66%', width: 'calc(33.33% - 8px)' }}
                      />
                      {['mindset', 'action', 'opportunity'].map((t) => (
                        <button key={t} onClick={() => setActiveTab(t as any)} className={`relative flex-1 py-4 z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === t ? "text-black" : "text-slate-500"}`}>
                           {t === 'mindset' ? 'Tâm thế' : t === 'action' ? 'Hành động' : 'Cơ hội'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
        </section>
      </div>

      {/* SECTION 4 & 5: BLOG & CTA (GIỮ NGUYÊN CODE CŨ CỦA BẠN TẠI ĐÂY) */}
      <section className="space-y-10 mb-28 w-full max-w-4xl px-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
              <h3 className={`${playfair.className} text-2xl text-white italic`}>Chỉ dẫn chuyên sâu cho số {result.lifePath}</h3>
              <BookOpen className="w-5 h-5 text-slate-800" />
          </div>
          <div className="grid grid-cols-1 gap-6">
              {posts.map((post, idx) => (
                  <Link key={idx} href={`/blog/${post.slug}`} className="group">
                      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[35px] flex items-center gap-6 hover:bg-white/[0.05] transition-all">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                              {post.mainImage ? <img src={urlFor(post.mainImage).width(150).url()} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /> : <div className="w-full h-full flex items-center justify-center text-slate-800"><Sparkles className="w-5 h-5" /></div>}
                          </div>
                          <div className="flex-1 space-y-1">
                              <span className="text-[7px] font-black tracking-[0.4em] text-indigo-500 uppercase">{post.categoryName || 'LUẬN GIẢI'}</span>
                              <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{post.title}</h4>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                  </Link>
              ))}
          </div>
      </section>

      <div className="space-y-6 w-full max-w-4xl px-6 mb-24">
          <section className="bg-indigo-600/5 border border-indigo-500/20 rounded-[45px] p-12 text-center relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                  <div className="space-y-3">
                      <h3 className={`${playfair.className} text-3xl text-white font-bold`}>Lộ trình thịnh vượng 2026</h3>
                      <p className="text-[9px] font-black text-indigo-400 tracking-[0.4em] uppercase">BẢN GIẢI MÃ VẬN MỆNH CHI TIẾT</p>
                  </div>
                  <button className="w-full max-w-[300px] py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">NHẬN BẢN FULL NGAY</button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 blur-[100px] transition-all" />
          </section>
          <div className="grid grid-cols-2 gap-4">
              <button onClick={handleShare} className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/5 text-slate-300 rounded-3xl font-bold text-[10px] uppercase hover:bg-white/10 transition-all">
                  <Share2 className="w-4 h-4" /> {isCopied ? 'ĐÃ COPY' : 'CHIA SẺ'}
              </button>
              <Link href="/" className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/5 text-slate-300 rounded-3xl font-bold text-[10px] uppercase hover:bg-white/10 transition-all"><RotateCcw className="w-4 h-4" /> TRA CỨU TIẾP</Link>
          </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetCompatibilityModal} className="absolute inset-0 bg-black/98 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-[#050512] border border-white/10 rounded-[60px] p-10 md:p-16 overflow-y-auto max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,1)]">
                <button onClick={resetCompatibilityModal} className="absolute top-10 right-10 z-20 text-slate-500 hover:text-white transition-colors cursor-pointer"><X size={24} /></button>

                {modalStep === 1 && (
                  <form onSubmit={handleFormSubmit} className="space-y-10 relative z-10">
                    <div className="text-center space-y-6">
                        <div className="relative flex justify-center items-center h-28">
                          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 6 }} style={{ backgroundColor: auraColor }} className="absolute w-44 h-44 rounded-full blur-[90px]" />
                          <div className="relative z-10 w-20 h-20 rounded-[30px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                            <div className="absolute inset-0 rounded-[30px] bg-pink-500/20 blur-xl animate-pulse" />
                            <Heart size={36} className="text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" fill="currentColor" />
                          </div>
                        </div>
                        <h3 className={`${playfair.className} text-4xl md:text-5xl text-white font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60`}>Hòa hợp năng lượng</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] opacity-70">Điền thông tin và nhấn Enter để kết nối</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-2">
                        <div className="space-y-3 group">
                          <label className="text-[12px] font-black text-slate-500 uppercase ml-6 tracking-[0.3em] group-focus-within:text-indigo-400 transition-colors">Tên đối tác</label>
                          <input required type="text" placeholder="Nhập tên..." value={partnerInfo.name} onChange={(e) => setPartnerInfo({...partnerInfo, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-5 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all" />
                        </div>
                        <div className="space-y-3 group">
                          <label className="text-[12px] font-black text-slate-500 uppercase ml-6 tracking-[0.3em] group-focus-within:text-pink-400 transition-colors">Ngày sinh</label>
                          <input required type="date" value={partnerInfo.birthday} onChange={(e) => setPartnerInfo({...partnerInfo, birthday: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-pink-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]" />
                        </div>
                    </div>
                    <div className="space-y-6 pt-4 px-2">
                        {validationError && <p className="text-red-500 text-[10px] font-bold uppercase text-center tracking-widest">{validationError}</p>}
                        <button type="submit" className="group relative w-full py-7 rounded-[32px] overflow-hidden transition-all duration-500 active:scale-[0.98]">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:opacity-90 transition-opacity" />
                          <motion.div animate={{ x: ['-100%', '400%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg] z-10" />
                          <span className="relative z-20 flex items-center justify-center gap-3 font-black text-xs text-white tracking-[0.5em] uppercase"><Zap size={16} fill="white" className="group-hover:animate-bounce" />Kết nối tần số</span>
                        </button>
                    </div>
                  </form> 
                )}

                {modalStep === 2 && (
                  <div className="py-32 flex flex-col items-center justify-center space-y-12 text-center">
                      <div className="relative w-48 h-48 flex items-center justify-center"><motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute inset-0 bg-indigo-500 blur-[100px] rounded-full" /><Loader2 size={48} className="text-white animate-spin relative z-10" /></div>
                      <p className="text-white font-black text-xs uppercase tracking-[1.2em] animate-pulse">Đang hòa quyện năng lượng...</p>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="space-y-14 text-center pb-6">
                      <div className="relative inline-block py-6">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full" />
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[120px] font-black text-white leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tabular-nums relative z-10">85%</motion.div>
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.6em] mt-2 relative z-10">Chỉ số hòa hợp toàn diện</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-xl mx-auto px-4">
                          <CosmicEnergyBar percentage={Math.round((result.personalDay / 9) * 100)} color="#6366f1" label="Năng lượng của bạn" />
                          <CosmicEnergyBar percentage={Math.round((partnerEnergy / 9) * 100)} color="#ec4899" label={`Năng lượng ${partnerInfo.name}`} />
                      </div>
                      <div className="flex bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 relative max-w-md mx-auto">
                          <motion.div className="absolute bg-white rounded-full shadow-xl" layoutId="modalTabPill" transition={{ type: "spring", duration: 0.5 }}
                            style={{ top: 8, bottom: 8, left: compTab === 'love' ? '8px' : compTab === 'work' ? '33.33%' : '66.66%', width: 'calc(33.33% - 12px)' }}
                          />
                          {['love', 'work', 'lesson'].map((t) => (
                              <button key={t} onClick={() => setCompTab(t as any)} className={`relative flex-1 py-5 z-10 text-[10px] font-black uppercase transition-all cursor-pointer ${compTab === t ? "text-black" : "text-slate-500"}`}>
                                {t === 'love' ? 'Tình cảm' : t === 'work' ? 'Sự nghiệp' : 'Thử thách'}
                              </button>
                          ))}
                      </div>
                      <motion.div key={compTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[45px] p-10 min-h-[160px] flex items-center justify-center shadow-inner relative overflow-hidden">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                         <p className="italic text-slate-300 text-lg leading-relaxed font-light relative z-10">"{compTab === 'love' ? "Sự thấu cảm tự nhiên giúp các bạn vượt qua mọi rào cản ngôn từ." : compTab === 'work' ? "Đây là bộ đôi kiến tạo những thành tựu tài chính lớn lao và bền vững." : "Hãy học cách lắng nghe để năng lượng chung luôn được lưu thông và phát triển."}"</p>
                      </motion.div>
                      
                      <div className="flex flex-col md:flex-row gap-4 max-w-sm mx-auto">
                        <button onClick={handleShare} className="flex-1 py-7 bg-indigo-600 text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                          <Share2 size={16} /> {isCopied ? 'ĐÃ COPY LINK' : 'CHIA SẺ KẾT QUẢ'}
                        </button>
                        <button onClick={resetCompatibilityModal} className="flex-1 py-7 border border-white/10 text-slate-500 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">HOÀN TẤT</button>
                      </div>
                  </div>
                )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Wrap trong Suspense để tránh lỗi build Next.js khi dùng useSearchParams
export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#010103] flex items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>}>
      <ResultContent />
    </Suspense>
  );
}