import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Sparkles } from "lucide-react";

// Kết nối Sanity
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Header from "@/app/components/Header";
import { getPostData } from "@/services/api";

const playfair = Playfair_Display({ subsets: ["vietnamese"], weight: ["600", "700", "900"] });
const inter = Inter({ subsets: ["vietnamese"], weight: ["300", "400", "600"] });

// 1. Hàm lấy dữ liệu bài viết (Fix lỗi param $slug)


export default async function BlogArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);
  console.log("post", post)
  console.log("post.mainImage", post.mainImage);
  if (!post) {
    notFound();
  }

  return (
    <div className={`${inter.className} min-h-screen bg-[#020205] text-slate-300 antialiased`}>
      {/* HEADER: Mobile (Hamburger) - Desktop (Nav + Login) */}
      <Header />

      <div className="max-w-[850px] mx-auto px-6 pt-12 md:pb-16">
        {/* ĐIỀU HƯỚNG QUAY LẠI */}
        <Link href="/blog" className="m-2 inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-[0.3em] mb-12 transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại thư viện 
        </Link>

        {/* BREADCRUMB MINIMAL */}
        <nav className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-indigo-500">Số {post.targetNumber}</span>
        </nav>

        {/* HEADER BÀI VIẾT */}
        <header className="mb-16">
          <h1 className={`${playfair.className} text-4xl md:text-7xl text-white font-bold leading-[1.1] tracking-tight`}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-y border-white/5 py-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              6 phút đọc
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              Numerology Expert
            </div>
          </div>
        </header>

        {/* ẢNH ĐẠI DIỆN VỚI HIỆU ỨNG GRayscale */}
        {post.mainImage && (
          <div className="relative aspect-[16/9] w-full rounded-[45px] overflow-hidden mb-20 border border-white/5 shadow-2xl group">
            <Image
              src={urlFor(post.mainImage).width(1200).height(500).auto("format").url()}
              fill
              alt={post.title}

              className="object-cover"
              priority
            />
          </div>
        )}

        {/* NỘI DUNG CHI TIẾT (PORTABLE TEXT) */}
        <div className="prose prose-invert max-w-none 
          prose-p:text-[19px] md:prose-p:text-[22px] prose-p:leading-[2] prose-p:text-slate-400 prose-p:font-light prose-p:mb-12
          prose-headings:text-white prose-headings:font-serif
          prose-h2:text-3xl md:prose-h2:text-5xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:tracking-tight
          prose-blockquote:border-l-4 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-white/[0.03] prose-blockquote:px-10 prose-blockquote:py-8 prose-blockquote:rounded-3xl prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-2xl
          prose-img:rounded-[40px] prose-img:border prose-img:border-white/5 prose-img:shadow-2xl">
          
          <PortableText value={post.body} />
        </div>

        {/* PHẦN KẾT (CTA) */}
        <div className="mt-32 p-12 md:p-20 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[60px] text-center space-y-8 relative overflow-hidden">
          <Sparkles className="w-8 h-8 text-indigo-500 mx-auto" />
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-3xl md:text-5xl text-white`}>Bạn thuộc về số {post.targetNumber}?</h3>
            <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Mỗi con số là một mảnh ghép của linh hồn. Hãy để chúng tôi giúp bạn lắp ghép lộ trình thịnh vượng cá nhân năm 2026.
            </p>
          </div>
          <Link href="/" className="inline-block py-6 px-12 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-2xl">
            Giải mã ngay bây giờ
          </Link>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/5 blur-[100px]" />
        </div>
      </div>
    </div>
  );
}