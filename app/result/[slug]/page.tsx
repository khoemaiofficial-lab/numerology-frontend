"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { 
  Loader2, ArrowDown, Star, UserCheck, Compass, 
  Briefcase, Heart, Sparkles, Share2, RotateCcw, 
  ChevronRight, BookOpen, Zap 
} from 'lucide-react';
import Link from 'next/link';

// Kết nối hệ thống
import { calculateNumerology } from '@/services/api';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const playfair = Playfair_Display({ subsets: ['vietnamese'], weight: ['600', '700', '900'] });
const inter = Inter({ subsets: ['vietnamese'], weight: ['300', '400', '600'] });

export default function ResultPage() {
  const params = useParams();
  const slug = params.slug as string; // Lấy slug từ URL: nguyen-manh-duc-26011997
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const decodeAndFetch = async () => {
      if (!slug) return;

      try {
        // 1. GIẢI MÃ SLUG "TỬ TẾ"
        const parts = slug.split('-');
        const birthdayRaw = parts.pop(); // Lấy "26011997"
        const name = parts.join(' ').toUpperCase(); // Lấy "NGUYEN MANH DUC"
        
        // Format lại ngày cho API: 26011997 -> 1997-01-26
        const formattedDate = `${birthdayRaw?.slice(4, 8)}-${birthdayRaw?.slice(2, 4)}-${birthdayRaw?.slice(0, 2)}`;

        // 2. GỌI API TÍNH TOÁN
        const data = await calculateNumerology(name, 'guest', formattedDate);
        setResult(data);

        // 3. FETCH BÀI VIẾT TỪ SANITY (Dùng Dataset Public, gói Free)
        const sanityQuery = `*[_type == "post" && targetNumber == ${data.lifePath}] | order(publishedAt desc)[0...3] {
          title,
          "slug": slug.current,
          "categoryName": category->title,
          mainImage
        }`;
        const sanityPosts = await client.fetch(sanityQuery);
        setPosts(sanityPosts);

      } catch (error) {
        console.error("Lỗi giải mã hoặc fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    decodeAndFetch();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-[9px] tracking-[0.5em] text-slate-600 uppercase font-black">Vũ trụ đang giải mã vận mệnh...</p>
    </div>
  );

  if (!result) return <div className="text-white text-center pt-20">Dữ liệu không hợp lệ hoặc Slug sai cấu trúc.</div>;

  const auraColor = result.color || "#6366f1";

  return (
    <main className={`${inter.className} min-h-screen bg-[#020205] text-slate-300 flex flex-col items-center relative overflow-x-hidden antialiased`}>
      {/* BACKGROUND SPOTLIGHT */}
      <div style={{ background: `radial-gradient(circle at 50% 0%, ${auraColor}20 0%, transparent 70%)` }} className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0" />

      <div className="w-full max-w-4xl z-10 px-6 pb-24">
          {/* 1. HERO SECTION: CON SỐ CHỦ ĐẠO */}
          <section className="h-[85dvh] flex flex-col items-center justify-center text-center relative">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative mb-8">
              <h1 style={{ textShadow: `0 0 50px ${auraColor}80` }} className={`${playfair.className} text-[150px] md:text-[220px] font-black text-white leading-none tracking-tighter`}>
                {result.lifePath}
              </h1>
            </motion.div>
            
            <div className="space-y-4">
              <h2 className={`${playfair.className} text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>{result.name}</h2>
              <p style={{ color: auraColor }} className="text-[10px] md:text-[12px] tracking-[0.6em] font-black uppercase">{result.title}</p>
            </div>

            <div className="mt-10 bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 rounded-[40px] text-xs md:text-sm text-slate-400 font-light italic leading-relaxed max-w-md shadow-2xl">
              "{result.description}"
            </div>

            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-12">
                <ArrowDown className="w-6 h-6 text-slate-700" />
            </motion.div>
          </section>

          {/* 2. CHỈ SỐ CỐT LÕI (CORE PILLARS) */}
          <section className="grid grid-cols-3 gap-4 mb-24">
            {[
              { label: 'LINH HỒN', val: result.soulNumber, icon: <Star className="w-3.5 h-3.5" /> },
              { label: 'NHÂN CÁCH', val: result.personalityNumber, icon: <UserCheck className="w-3.5 h-3.5" /> },
              { label: 'SỨ MỆNH', val: result.missionNumber, icon: <Compass className="w-3.5 h-3.5" /> }
            ].map((p, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[24px] p-6 text-center group hover:bg-white/[0.06] transition-all">
                <div className="flex justify-center text-slate-700 group-hover:text-white transition-colors mb-2">{p.icon}</div>
                <div className={`${playfair.className} text-3xl text-white font-bold`}>{p.val}</div>
                <div className="text-[7px] tracking-[0.2em] text-slate-600 font-black uppercase mt-1">{p.label}</div>
              </div>
            ))}
          </section>

          {/* 3. LUẬN GIẢI TỪ SANITY */}
          <section className="space-y-10 mb-28">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
                  <h3 className={`${playfair.className} text-2xl text-white italic`}>Luận giải chuyên sâu cho số {result.lifePath}</h3>
                  <BookOpen className="w-5 h-5 text-slate-800" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                  {posts.length > 0 ? posts.map((post, idx) => (
                      <Link key={idx} href={`/blog/${post.slug}`} className="group">
                        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[35px] flex items-center gap-6 hover:bg-white/[0.05] hover:border-white/10 transition-all shadow-lg">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                              {post.mainImage ? (
                                <img 
                                  src={urlFor(post.mainImage).width(200).url()} 
                                  alt={post.title}
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-800"><Sparkles className="w-6 h-6" /></div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <span className="text-[8px] font-black tracking-[0.4em] text-indigo-500 uppercase">{post.categoryName || 'LUẬN GIẢI'}</span>
                                <h4 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-1">{post.title}</h4>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                  )) : (
                    <div className="py-20 text-center space-y-4">
                      <Zap className="w-8 h-8 text-slate-800 mx-auto animate-pulse" />
                      <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em]">Hệ thống đang cập nhật thêm nội dung...</p>
                    </div>
                  )}
              </div>
          </section>

          {/* 4. PREMIUM CTA & ACTIONS */}
          <div className="space-y-6">
            <section className="bg-indigo-600/5 border border-indigo-500/20 rounded-[45px] p-12 text-center relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <h3 className={`${playfair.className} text-3xl text-white font-bold`}>Lộ trình thịnh vượng 2026</h3>
                  <p className="text-[9px] font-black text-indigo-400 tracking-[0.4em] uppercase">BẢN GIẢI MÃ VẬN MỆNH CHI TIẾT</p>
                </div>
                <button className="w-full max-w-[300px] py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-xl">
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