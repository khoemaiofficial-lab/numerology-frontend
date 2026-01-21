"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { 
  Loader2, ArrowDown, Star, UserCheck, Compass, 
  Sparkles, Share2, RotateCcw, 
  ChevronRight, BookOpen, Zap, Globe, Lock, 
  Lightbulb, Footprints, Brain 
} from 'lucide-react';
import Link from 'next/link';

// Kết nối hệ thống
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { calculatePersonalAndWorldNumber } from '@/lib/utils';
import { calculateNumerology } from '@/utils/numerology';
import { DAILY_PREDICTIONS } from '@/app/constants/predictions';

const playfair = Playfair_Display({ subsets: ['vietnamese'], weight: ['600', '700', '900'] });
const inter = Inter({ subsets: ['vietnamese'], weight: ['300', '400', '600'] });

export default function ResultPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'mindset' | 'action' | 'opportunity'>('mindset');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const decodeAndFetch = async () => {
      if (!slug) return;
      try {
        const parts = slug.split('-');
        const birthdayRaw = parts.pop() || "";
        const name = parts.join(' ').toUpperCase();

        // 1. TÍNH TOÁN CỐ ĐỊNH (Sử dụng hàm local của bạn)
        const data = calculateNumerology(name, birthdayRaw);

        // 2. TÍNH TOÁN NĂNG LƯỢNG NGÀY
        const { worldDay, personalDay } = calculatePersonalAndWorldNumber(data);
        
        // 3. LẤY DỰ BÁO TỪ KHO 81 TỔ HỢP
        const dailyContent = DAILY_PREDICTIONS[worldDay]?.[personalDay] || {
            mindset: "Hãy giữ tâm thế bình thản và quan sát những biến chuyển nhỏ xung quanh bạn.",
            action: "Hoàn thiện các kế hoạch cũ và chuẩn bị cho một chu kỳ mới đầy tiềm năng.",
            opportunity: "Cơ hội ẩn mình sau những cuộc trò chuyện tình cờ, hãy luôn mở lòng đón nhận.",
            energyLevel: 50
        };

        setResult({ ...data, worldDay, personalDay, dailyContent });

        // 4. FETCH BÀI VIẾT TỪ SANITY
        const sanityQuery = `*[_type == "post" && targetNumber == ${data.lifePath}] | order(publishedAt desc)[0...3] {
          title, "slug": slug.current, "categoryName": category->title, mainImage
        }`;
        const sanityPosts = await client.fetch(sanityQuery);
        setPosts(sanityPosts);

      } catch (error) {
        console.error("Lỗi dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    decodeAndFetch();
  }, [slug]);

  const scrollToWidget = () => {
    widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-[9px] tracking-[0.5em] text-slate-600 uppercase font-black italic text-center px-6">Vũ trụ đang giải mã vận mệnh của {slug.split('-')[0]}...</p>
    </div>
  );

  if (!result) return <div className="text-white text-center pt-20">Dữ liệu không hợp lệ.</div>;

  const auraColor = result.color || "#6366f1";

  return (
    <main className={`${inter.className} min-h-screen bg-[#020205] text-slate-300 flex flex-col items-center relative overflow-x-hidden antialiased`}>
      
      {/* 1. BACKGROUND SPOTLIGHT */}
      <div 
        style={{ background: `radial-gradient(circle at 50% 0%, ${auraColor}20 0%, transparent 70%)` }} 
        className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0" 
      />

      <div className="w-full max-w-4xl z-10 px-6 pb-24">
        
        {/* --- SECTION 1: HERO (Số chủ đạo) --- */}
        <section className="h-[90dvh] flex flex-col items-center justify-center text-center relative">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
            <h1 
                style={{ textShadow: `0 0 60px ${auraColor}80` }} 
                className={`${playfair.className} text-[150px] md:text-[220px] font-black text-white leading-none tracking-tighter`}
            >
              {result.lifePath}
            </h1>
          </motion.div>
          
          <div className="space-y-4">
            <h2 className={`${playfair.className} mt-6 text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>{result.name}</h2>
            <p style={{ color: auraColor }} className="text-[10px] md:text-[12px] tracking-[0.6em] font-black uppercase">{result.title}</p>
          </div>

          <div className="mt-8 bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 rounded-[40px] text-xs md:text-sm text-slate-400 font-light italic leading-relaxed max-w-md shadow-2xl relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020205] px-4 text-indigo-500"><Sparkles size={14}/></div>
            "{result.description}"
          </div>

          <button 
            onClick={scrollToWidget}
            className="mt-12 group flex flex-col items-center gap-3 cursor-pointer transition-all"
          >
            <span className="text-[11px] font-bold tracking-[0.4em] text-slate-500 uppercase group-hover:text-white transition-colors">
                Khám phá năng lượng hôm nay
            </span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <ArrowDown className="w-7 h-7 text-slate-700 group-hover:text-indigo-500 transition-colors" />
            </motion.div>
          </button>
        </section>

        {/* --- SECTION 2: DAILY FORECAST WIDGET --- */}
        <section ref={widgetRef} className="py-12 scroll-mt-20">
            <div className="relative group p-[1px] rounded-[55px] bg-gradient-to-b from-indigo-500/40 via-transparent to-white/5 shadow-[0_0_40px_rgba(79,70,229,0.15)] transition-all duration-700 hover:shadow-[0_0_60px_rgba(79,70,229,0.25)]">
                <div className='bg-[#050512]/95 backdrop-blur-3xl rounded-[54px] p-8 md:p-16 relative overflow-hidden'>
                  
                  {/* Backlight hiệu ứng tỏa sáng cho con số */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none" />

                  {/* Header: Ngày thế giới */}
                  <div className="text-center mb-12 space-y-3 relative z-10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Thứ Tư, 21 Tháng 1, 2026</p>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                          <Globe className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ngày Thế Giới: {result.worldDay}</span>
                      </div>
                  </div>

                  {/* Center: Ngày Cá Nhân */}
                  <div className="text-center mb-14 relative z-10">
                      <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }} 
                          whileInView={{ opacity: 1, scale: 1 }} 
                          className="text-8xl md:text-9xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                      >
                          {result.personalDay}
                      </motion.div>
                      <p className="text-[10px] font-black text-indigo-500/80 uppercase tracking-[0.6em]">Năng lượng ngày của bạn</p>
                  </div>

                  {/* Content Area: Tabs Dữ liệu động */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-[35px] p-8 md:p-10 min-h-[220px] mb-10 relative z-10">
                      <AnimatePresence mode="wait">
                          {activeTab === 'mindset' && (
                              <motion.div key="mindset" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                  <div className="flex items-center gap-3 text-indigo-300">
                                      <Brain className="w-5 h-5" />
                                      <h4 className="font-bold text-[11px] uppercase tracking-[0.2em]">Tâm thế chủ đạo</h4>
                                  </div>
                                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                                      {result.dailyContent.mindset}
                                  </p>
                              </motion.div>
                          )}
                          {activeTab === 'action' && (
                              <motion.div key="action" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                  <div className="flex items-center gap-3 text-emerald-300">
                                      <Footprints className="w-5 h-5" />
                                      <h4 className="font-bold text-[11px] uppercase tracking-[0.2em]">Hành động chiến lược</h4>
                                  </div>
                                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                                      {result.dailyContent.action}
                                  </p>
                                  {/* Thanh năng lượng tự động */}
                                  <div className="space-y-2 pt-2">
                                      <div className="flex justify-between text-[9px] uppercase tracking-widest text-slate-500">
                                          <span>Cường độ năng lượng</span>
                                          <span className="text-emerald-400 font-bold">{result.dailyContent.energyLevel}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                          <motion.div 
                                              initial={{ width: 0 }} 
                                              animate={{ width: `${result.dailyContent.energyLevel}%` }} 
                                              transition={{ duration: 1.2 }}
                                              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                                          />
                                      </div>
                                  </div>
                              </motion.div>
                          )}
                          {activeTab === 'opportunity' && (
                              <motion.div key="opp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                  <div className="flex items-center gap-3 text-amber-300">
                                      <Lightbulb className="w-5 h-5" />
                                      <h4 className="font-bold text-[11px] uppercase tracking-[0.2em]">Hạt giống cơ hội</h4>
                                  </div>
                                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light italic">
                                      "{result.dailyContent.opportunity}"
                                  </p>
                              </motion.div>
                          )}
                      </AnimatePresence>
                  </div>

                  {/* Tabs Điều hướng tối giản */}
                  <div className="flex gap-3 relative z-10">
                      {[
                          { id: 'mindset', icon: <Brain />, label: 'Tâm thế' },
                          { id: 'action', icon: <Footprints />, label: 'Hành động', locked: true },
                          { id: 'opportunity', icon: <Lightbulb />, label: 'Cơ hội', locked: true }
                      ].map((tab) => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-3 py-5 rounded-[25px] border transition-all duration-500 ${
                                  activeTab === tab.id 
                                  ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-[1.02]" 
                                  : "bg-white/[0.02] border-white/5 text-slate-600 hover:text-slate-300 hover:bg-white/[0.05]"
                              }`}
                          >
                              {tab.locked && activeTab !== tab.id ? (
                                  <Lock className="w-3.5 h-3.5 opacity-50" />
                              ) : (
                                  React.cloneElement(tab.icon as any, { size: 16 })
                              )}
                              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
                          </button>
                      ))}
                  </div>
                </div>
            </div>
        </section>

        {/* --- SECTION 3: CORE PILLARS --- */}
        {/* Henry có thể mở lại phần này nếu muốn hiện 3 chỉ số Linh hồn/Nhân cách/Sứ mệnh */}

        {/* --- SECTION 4: BLOG RECOMMENDATIONS --- */}
        <section className="space-y-10 mb-28">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                <h3 className={`${playfair.className} text-2xl text-white italic`}>Chỉ dẫn chuyên sâu cho số {result.lifePath}</h3>
                <BookOpen className="w-5 h-5 text-slate-800" />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {posts.length > 0 ? posts.map((post, idx) => (
                    <Link key={idx} href={`/blog/${post.slug}`} className="group">
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[35px] flex items-center gap-6 hover:bg-white/[0.05] transition-all">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                                {post.mainImage ? (
                                    <img 
                                        src={urlFor(post.mainImage).width(150).url()} 
                                        alt={post.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-800"><Sparkles className="w-5 h-5" /></div>
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="text-[7px] font-black tracking-[0.4em] text-indigo-500 uppercase">{post.categoryName || 'LUẬN GIẢI'}</span>
                                <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-1">{post.title}</h4>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                )) : (
                    <div className="py-10 text-center opacity-30">
                        <Zap className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-[8px] uppercase tracking-widest">Đang cập nhật bài viết mới...</p>
                    </div>
                )}
            </div>
        </section>

        {/* --- SECTION 5: PREMIUM CTA --- */}
        <div className="space-y-6">
            <section className="bg-indigo-600/5 border border-indigo-500/20 rounded-[45px] p-12 text-center relative overflow-hidden group">
                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
                        <h3 className={`${playfair.className} text-3xl text-white font-bold`}>Lộ trình thịnh vượng 2026</h3>
                        <p className="text-[9px] font-black text-indigo-400 tracking-[0.4em] uppercase">BẢN GIẢI MÃ VẬN MỆNH CHI TIẾT</p>
                    </div>
                    <button className="w-full max-w-[300px] py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">
                        NHẬN BẢN FULL NGAY
                    </button>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 blur-[100px] group-hover:bg-indigo-600/20 transition-all" />
            </section>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/5 text-slate-300 rounded-3xl font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                    <Share2 className="w-4 h-4" /> CHIA SẺ
                </button>
                <Link href="/" className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/5 text-slate-300 rounded-3xl font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                    <RotateCcw className="w-4 h-4" /> TRA CỨU TIẾP
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
}