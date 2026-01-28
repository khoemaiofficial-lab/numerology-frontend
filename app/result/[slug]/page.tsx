"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { 
  Loader2, ArrowDown, Sparkles, Globe, Heart, X, CalendarDays, AlertCircle, ChevronRight, Zap,
  BookOpen, Share2, RotateCcw, CheckCircle2, Stars
} from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { calculatePersonalAndWorldNumber, reduceNumber } from '@/lib/utils';
import { calculateNumerology } from '@/utils/numerology';
import { DAILY_PREDICTIONS } from '@/app/constants/predictions';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const playfair = Playfair_Display({ subsets: ['vietnamese'], weight: ['600', '700', '900'] });
const inter = Inter({ subsets: ['vietnamese'], weight: ['300', '400', '600'] });

// --- COMPONENT THANH NĂNG LƯỢNG WIDGET (GPU OPTIMIZED) ---
const EnergyBar = ({ percentage, color, label }: { percentage: number, color: string, label: string }) => (
  <div className="w-full space-y-2 mb-6 group transform-gpu">
    <div className="flex justify-between items-end px-1">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">{label}</span>
      <span className="text-xs font-black text-white tabular-nums">{percentage}%</span>
    </div>
    <div className="relative h-3 w-full bg-white/5 rounded-full border border-white/10 p-[2px] overflow-hidden backdrop-blur-sm">
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}60, ${color}, #fff)`, boxShadow: `0 0 15px ${color}40` }}
        className="relative h-full rounded-full"
      />
    </div>
  </div>
);

// --- COMPONENT THANH NĂNG LƯỢNG MODAL (PERFORMANCE FIX) ---
const CosmicEnergyBar = ({ percentage, color, label }: { percentage: number, color: string, label: string }) => (
  <div className="w-full space-y-3 group transform-gpu">
    <div className="flex justify-between items-end px-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{label}</span>
      <span className="text-sm font-black text-white tabular-nums tracking-tighter">{percentage}%</span>
    </div>
    <div className="relative h-4 w-full bg-white/5 rounded-full border border-white/10 p-[3px] overflow-hidden backdrop-blur-md">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}40, ${color}, #fff)`, boxShadow: `0 0 25px ${color}50` }}
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

function ResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();
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
  const [energyLevel, setEnergyLevel] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false);

  // Lock scroll khi mở Modal (Tránh giật lag Mobile)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const calculateQuickEnergy = (dateStr: string) => {
    const digits = dateStr.replace(/\D/g, '');
    let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0);
    while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    return sum;
  };

  useEffect(() => {
    const decodeAndFetch = async () => {
      if (!slug) return;
      try {
        console.log("DailyPrediction", DAILY_PREDICTIONS)
        const now = new Date();
        setCurrentDate(`${String(now.getDate()).padStart(2, '0')} . ${String(now.getMonth() + 1).padStart(2, '0')} . ${now.getFullYear()}`);
        const parts = slug.split('-');
        const birthdayRaw = parts.pop() || "";
        const name = parts.join(' ').toUpperCase();
        const data = calculateNumerology(name, birthdayRaw);
        const { worldDay, personalDay } = calculatePersonalAndWorldNumber(data);
        const pDay = reduceNumber(personalDay);
        const dailyContent = DAILY_PREDICTIONS[worldDay]?.[pDay] || { mindset: "...", action: "...", opportunity: "...", energyLevel: 50 };
        setEnergyLevel(dailyContent.energyLevel)
        setResult({ ...data, worldDay, personalDay, dailyContent });
        const sanityQuery = `*[_type == "post" && targetNumber == ${data.lifePath}] | order(publishedAt desc)[0...3] { title, "slug": slug.current, "categoryName": category->title, mainImage }`;
        const sanityPosts = await client.fetch(sanityQuery);
        setPosts(sanityPosts || []);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    decodeAndFetch();
  }, [slug]);

  useEffect(() => {
    const pName = searchParams.get('pName');
    const pBirth = searchParams.get('pBirth');
    if (pName && pBirth && result) {
      setIsReceiver(true);
      setPartnerInfo({ name: pName, birthday: pBirth });
      setPartnerEnergy(calculateQuickEnergy(pBirth));
      setModalStep(3);
      setIsModalOpen(true);
    }
  }, [searchParams, result]);

  const resetCompatibilityModal = () => {
    setIsModalOpen(false);
    if (!isReceiver) {
        setModalStep(1);
        setPartnerInfo({ name: '', birthday: '' });
        setValidationError('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const birthYear = new Date(partnerInfo.birthday).getFullYear();
    const isFormValid = partnerInfo.name.trim().length >= 2 && partnerInfo.birthday !== "" && birthYear >= 1940 && birthYear <= 2013;
    if (!isFormValid) {
      setValidationError('Thông tin chưa chính xác (1940 - 2013).');
      return;
    }
    setValidationError('');
    setModalStep(2);
    setPartnerEnergy(calculateQuickEnergy(partnerInfo.birthday));
    setTimeout(() => setModalStep(3), 2500);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?pName=${encodeURIComponent(partnerInfo.name)}&pBirth=${partnerInfo.birthday}`;
    const shareText = `Chỉ số hòa hợp của mình và ${partnerInfo.name} là 85%! ✨`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Hòa hợp năng lượng', text: shareText, url: shareUrl }); } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (loading || !result) return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center"><Loader2 className="w-10 h-10 text-indigo-500 animate-spin" /></div>
  );

  const auraColor = result.color || "#6366f1";

  return (
    <main className={`${inter.className} min-h-screen bg-[#020205] text-slate-300 flex flex-col items-center relative overflow-x-hidden antialiased pb-48`}>
      <div style={{ background: `radial-gradient(circle at 50% 0%, ${auraColor}20 0%, transparent 70%)` }} className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0" />

      <div className="w-full max-w-4xl z-10 px-6">
        {/* --- SECTION 1: HERO --- */}
        <section className="h-[95dvh] flex flex-col items-center justify-center text-center relative">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h1 style={{ textShadow: `0 0 60px ${auraColor}80` }} className={`${playfair.className} text-[150px] md:text-[220px] font-black text-white leading-none tracking-tighter`}>{result.lifePath}</h1>
          </motion.div>
          <div className="space-y-4">
            <h2 className={`${playfair.className} mt-6 text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>{result.name}</h2>
            <p style={{ color: auraColor }} className="text-[10px] md:text-[12px] tracking-[0.6em] font-black uppercase">{result.title}</p>
          </div>
          {/* BOX MÔ TẢ HERO (GIỮ NGUYÊN 100%) */}
          <div className="mt-8 bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 rounded-[40px] text-xs text-slate-400 font-light italic leading-relaxed max-w-md shadow-2xl relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020205] px-4 text-indigo-500"><Sparkles size={14}/></div>
            "{result.description}"
          </div>
          <button onClick={() => widgetRef.current?.scrollIntoView({ behavior: 'smooth' })} className="mt-12 group flex flex-col items-center gap-3 cursor-pointer">
            <span className="text-[11px] font-bold tracking-[0.4em] text-slate-500 uppercase group-hover:text-white transition-colors">Khám phá năng lượng hôm nay</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}><ArrowDown className="w-6 h-6 text-slate-700" /></motion.div>
          </button>
        </section>

        {/* --- SECTION 2: DAILY WIDGET --- */}
        <section ref={widgetRef} className="pb-24 scroll-mt-20">
            <div className="relative p-[1px] rounded-[60px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
                <div className='grid bg-[#050512]/95 backdrop-blur-3xl rounded-[59px] p-10 md:p-20 relative overflow-hidden lg:grid-cols-2 gap-16'>
                  <div className="space-y-12">
                    <div className="text-center lg:text-left space-y-6">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.6em]">{currentDate}</p>
                      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400">
                          <Globe size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ngày Thế Giới: {result.worldDay}</span>
                      </div>
                    </div>
                    <div className="text-center lg:text-left relative">
                        <div className="text-[120px] md:text-[180px] font-black text-white leading-none drop-shadow-2xl">{result.personalDay}</div>
                        <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.8em] mt-4">Năng lượng cá nhân</p>
                        <div className="mt-12 max-w-[280px] mx-auto lg:mx-0"><EnergyBar percentage={energyLevel} color={auraColor} label="Năng Lượng Hành Động" /></div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-white/[0.03] border border-white/5 rounded-[45px] p-10 min-h-[280px] flex flex-col items-center text-center shadow-inner mb-8">
                      <AnimatePresence mode="wait">
                          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                              <h4 className="font-bold text-[10px] uppercase tracking-widest text-indigo-400">{activeTab === 'mindset' ? 'Tâm thế' : activeTab === 'action' ? 'Hành động' : 'Cơ hội'}</h4>
                              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-lg">"{activeTab === 'mindset' ? result.dailyContent.mindset : activeTab === 'action' ? result.dailyContent.action : result.dailyContent.opportunity}"</p>
                              <button onClick={() => setIsModalOpen(true)} className="relative mt-8 group/btn flex items-center justify-between w-full max-w-sm mx-auto p-5 rounded-[28px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)] active:scale-[0.96] transition-all duration-200 overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.3),transparent)] animate-[spin_4s_linear_infinite]" />
                                <div className="flex items-center gap-4 text-left relative z-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500/40 blur-xl rounded-full animate-pulse" />
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-white/10 relative z-10"><Heart size={20} fill="currentColor" /></div>
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="text-[10px] font-black text-white uppercase tracking-[0.15em]">Tương hợp năng lượng</p>
                                      <p className="text-[11px] text-slate-500 italic">Kiểm tra mảnh ghép với đối tác</p>
                                    </div>
                                </div>
                                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10"><ChevronRight size={18} className="text-indigo-400" /></div>
                              </button>
                          </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                      {['mindset', 'action', 'opportunity'].map((t) => (
                        <button key={t} onClick={() => {
                          console.log("DAILY_PREDICTIONS", DAILY_PREDICTIONS)
                          console.log("DAILY_PREDICTIONS[worldDay]?.[personalDay]", )
                            console.log("result", result)
                            setActiveTab(t as any)}
                          } className={`relative flex-1 py-5 z-10 text-[10px] rounded-full font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === t ? "text-black bg-white rounded-full shadow-lg" : "text-slate-500 hover:text-slate-300"}`}>
                           {t === 'mindset' ? 'Tâm thế' : t === 'action' ? 'Hành động' : 'Cơ hội'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: BLOG RECOMMENDATIONS */}
        <section className="space-y-12 mb-32">
            <div className="flex items-center justify-between border-b border-white/5 pb-6 px-2">
                <h3 className={`${playfair.className} text-3xl text-white font-medium`}>Chỉ dẫn chuyên sâu cho số {result.lifePath}</h3>
                <BookOpen className="text-slate-800" />
            </div>
            <div className="grid grid-cols-1 gap-8">
                {posts.map((post, idx) => (
                    <Link key={idx} href={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-[40px] bg-white/[0.02] border border-white/5 p-8 flex items-center gap-8 hover:bg-white/[0.04] transition-all">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                            {post.mainImage ? <img src={urlFor(post.mainImage).width(150).url()} alt={post.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" /> : <div className="w-full h-full flex items-center justify-center text-slate-800"><Sparkles /></div>}
                        </div>
                        <div className="flex-1 space-y-2">
                            <span className="text-[8px] font-black tracking-[0.4em] text-indigo-500 uppercase">{post.categoryName || 'LUẬN GIẢI'}</span>
                            <h4 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-1">{post.title}</h4>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all"><ChevronRight size={20} className="text-slate-700" /></div>
                    </Link>
                ))}
            </div>
        </section>

        {/* PHANTOM SPACE ĐỂ FIX CHỒNG LẤN NÚT */}
        <div className="h-24 md:h-12 w-full" />
      </div>

      {/* --- GUEST WELCOME BANNER --- */}
      <AnimatePresence>
        {isReceiver && !isModalOpen && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-lg">
            <div className="bg-indigo-950/40 backdrop-blur-2xl border border-indigo-500/30 rounded-[35px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0"><Stars size={20} /></div>
                <div><p className="text-xs font-bold text-white">Muốn biết vận mệnh của riêng bạn?</p><p className="text-[10px] text-indigo-300/70 tracking-wide uppercase mt-1">Khám phá lộ trình 2026 ngay</p></div>
              </div>
              <Link href="/" className="px-6 py-4 bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 transition-all flex-shrink-0">Tra cứu</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM MODAL (OPTIMIZED FOR PERFORMANCE) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Giảm blur xuống lg để Mobile mượt hơn */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetCompatibilityModal} className="absolute inset-0 bg-black/95 backdrop-blur-lg" />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#050512] border border-white/10 rounded-[60px] p-10 md:p-16 overflow-y-auto max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,1)] transform-gpu will-change-transform"
            >
                <button onClick={resetCompatibilityModal} className="absolute top-10 right-10 z-20 text-slate-500 hover:text-white transition-colors cursor-pointer"><X size={24} /></button>

                {modalStep === 1 && (
                  <form onSubmit={handleFormSubmit} className="space-y-12 relative z-10 transform-gpu">
                    <div className="text-center space-y-6">
                        <div className="relative flex justify-center items-center h-28">
                          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 6 }} style={{ backgroundColor: auraColor }} className="absolute w-44 h-44 rounded-full blur-[90px]" />
                          <div className="relative z-10 w-20 h-20 rounded-[30px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-2xl shadow-2xl"><Heart size={36} className="text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" fill="currentColor" /></div>
                        </div>
                        <h3 className={`${playfair.className} text-4xl md:text-5xl text-white font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60`}>Hòa hợp năng lượng</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] opacity-70">Điền thông tin</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-2">
                        <div className="space-y-3 group">
                          <label className="text-[10px] font-black text-slate-500 uppercase ml-6 tracking-[0.3em] group-focus-within:text-indigo-400 transition-colors">Tên đối tác</label>
                          <input required type="text" placeholder="Nhập tên..." value={partnerInfo.name} onChange={(e) => setPartnerInfo({...partnerInfo, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all" />
                        </div>
                        <div className="space-y-3 group">
                          <label className="text-[10px] font-black text-slate-500 uppercase ml-6 tracking-[0.3em] group-focus-within:text-pink-400 transition-colors">Ngày sinh</label>
                          <input required type="date" value={partnerInfo.birthday} onChange={(e) => setPartnerInfo({...partnerInfo, birthday: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-pink-500/50 focus:bg-white/[0.05] transition-all [color-scheme:dark]" />
                        </div>
                    </div>
                    <div className="space-y-6 pt-4 px-2">
                        {validationError && <p className="text-red-500 text-[10px] font-bold uppercase text-center tracking-widest">{validationError}</p>}
                        <button type="submit" className="group relative w-full py-7 rounded-[32px] overflow-hidden transition-all duration-500 active:scale-[0.98] cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:opacity-90 transition-opacity" />
                          <motion.div animate={{ x: ['-100%', '400%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg] z-10" />
                          <span className="relative z-20 flex items-center justify-center gap-3 font-black text-xs text-white tracking-[0.5em] uppercase"><Zap size={16} fill="white" />Kết nối tần số</span>
                        </button>
                    </div>
                  </form> 
                )}

                {modalStep === 2 && (
                  <div className="py-32 flex flex-col items-center justify-center space-y-12 text-center transform-gpu">
                      <div className="relative w-48 h-48 flex items-center justify-center"><motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute inset-0 bg-indigo-500 blur-[100px] rounded-full" /><Loader2 size={48} className="text-white animate-spin relative z-10" /></div>
                      <p className="text-white font-black text-xs uppercase tracking-[1.2em] animate-pulse">Đang hòa quyện năng lượng...</p>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="space-y-14 text-center pb-6 transform-gpu">
                      <div className="relative inline-block py-6">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full" />
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[120px] font-black text-white leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tabular-nums relative z-10">85%</motion.div>
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.6em] mt-4 relative z-10">Chỉ số hòa hợp toàn diện</p>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto px-4">
                        <button onClick={handleShare} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[8px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 active:scale-95 cursor-pointer">
                          {isCopied ? <CheckCircle2 size={16} /> : <Share2 size={16} />} {isCopied ? 'ĐÃ COPY LINK' : 'CHIA SẺ KẾT QUẢ'}
                        </button>
                        {/* {isReceiver ? (
                          <Link href="/" className="flex-1 py-7 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-xl">Tra cứu cá nhân</Link>
                        ) : (
                          <button onClick={resetCompatibilityModal} className="flex-1 py-7 border border-white/10 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all cursor-pointer">HOÀN TẤT</button>
                        )} */}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-xl mx-auto px-4">
                          <CosmicEnergyBar percentage={Math.round((result.personalDay / 9) * 100)} color="#6366f1" label="Năng lượng của bạn" />
                          <CosmicEnergyBar percentage={Math.round((partnerEnergy / 9) * 100)} color="#ec4899" label={`Năng lượng ${partnerInfo.name}`} />
                      </div>
                      <div className="flex bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 relative max-w-md mx-auto">
                          {['love', 'work', 'lesson'].map((t) => (
                              <button key={t} onClick={() => setCompTab(t as any)} className={`relative flex-1 py-5 z-10 text-[10px] font-black uppercase transition-all cursor-pointer ${compTab === t ? "text-black bg-white rounded-full shadow-xl" : "text-slate-500"}`}>
                                {t === 'love' ? 'Tình cảm' : t === 'work' ? 'Sự nghiệp' : 'Thử thách'}
                              </button>
                          ))}
                      </div>
                      <motion.div key={compTab} className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[45px] p-10 min-h-[160px] flex items-center justify-center relative overflow-hidden shadow-inner">
                         <p className="italic text-slate-300 text-lg leading-relaxed font-light relative z-10">"{compTab === 'love' ? "Sự thấu cảm tự nhiên giúp các bạn vượt qua mọi rào cản ngôn từ." : compTab === 'work' ? "Đây là bộ đôi kiến tạo những thành tựu tài chính lớn lao và bền vững." : "Hãy học cách lắng nghe để năng lượng chung luôn được lưu thông và phát triển."}"</p>
                      </motion.div>
                      
                  </div>
                )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- STICKY FLOATING NAVIGATOR (OPTIMIZED FOR MOBILE) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] flex flex-nowrap items-center gap-3 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[calc(100vw-2rem)] w-auto transform-gpu translate-z-0">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full transition-all group">
          <RotateCcw size={16} className="text-slate-500 group-hover:text-white" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white whitespace-nowrap">Tra cứu mới</span>
        </Link>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white cursor-pointer">
          <ArrowDown size={18} className="rotate-180" />
        </button>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020205] flex items-center justify-center"><Loader2 className="w-10 h-10 text-indigo-500 animate-spin" /></div>}>
      <ResultContent />
    </Suspense>
  );
}