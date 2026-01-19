"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import { Fingerprint, Mail, Star, AlertCircle, MoveRight } from 'lucide-react';
import { slugify } from '@/lib/utils';
import Header from './components/Header';

const playfair = Playfair_Display({ subsets: ['vietnamese'], weight: ['600', '700', '900'] });
const inter = Inter({ subsets: ['vietnamese'], weight: ['300', '400', '600'] });

export default function InputPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const cleanName = name.trim();
    if (cleanName.length < 2) return "Vui lòng nhập họ và tên thật.";
    
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    if (isNaN(d) || d < 1 || d > 31 || isNaN(m) || m < 1 || m > 12 || isNaN(y) || y < 1920 || y > 2026) {
        return "Ngày tháng năm sinh không hợp lệ.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // TẠO CLEAN SLUG: tên-không-dấu-ngaythangnam
    const nameSlug = slugify(name);
    const dateSlug = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
    
    // Điều hướng sang URL sạch: /result/nguyen-manh-duc-26011997
    router.push(`/result/${nameSlug}-${dateSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#010103] flex flex-col">
      <main className={`${inter.className} mt-20 flex-1 text-slate-300 flex flex-col items-center justify-center p-4 relative overflow-hidden antialiased`}>
        {/* hiệu ứng ánh sáng nền */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[140px] z-0" />
        
        <div className="w-full max-w-6xl z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] tracking-[0.3em] text-indigo-400 font-bold uppercase">
              <Star className="w-3 h-3 fill-current" /> Phiên bản 2026
            </div>
            <h1 className={`${playfair.className} text-6xl md:text-9xl font-bold leading-[0.9] text-white tracking-tighter uppercase`}>
              <p className='mb-6 md:mb-11'>Mật mã</p>              
              <span className="italic font-normal opacity-30 text-slate-500">Linh hồn.</span>
            </h1>
              <p className="max-w-md text-slate-500 text-sm md:text-base font-light leading-relaxed">
                Khám phá bản đồ vận mệnh thông qua toán học tâm linh. <br className="hidden md:block" />
                Dữ liệu được bảo mật và luận giải bởi chuyên gia.
              </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSubmit}
            className="bg-[#0a0f1e]/60 backdrop-blur-[50px] border border-white/5 p-8 md:p-10 rounded-[48px] shadow-2xl space-y-8 w-full max-w-[440px]"
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs animate-shake">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.2em] text-slate-600 font-bold uppercase ml-1">Danh tính đầy đủ</label>
                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl focus-within:border-indigo-500/50 transition-all">
                  <Fingerprint className="w-5 h-5 text-slate-600" />
                  <input required className="bg-transparent outline-none w-full text-white text-sm" placeholder="Nhập họ và tên..." onChange={e => setName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.2em] text-slate-600 font-bold uppercase ml-1">Ngày sinh định mệnh</label>
                <div className="grid grid-cols-3 gap-3">
                  <input required maxLength={2} placeholder="DD" className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-center text-white text-lg outline-none focus:border-indigo-500/50" value={day} onChange={e => { const v = e.target.value.replace(/\D/g, ''); setDay(v); if(v.length===2) monthRef.current?.focus(); }} />
                  <input ref={monthRef} required maxLength={2} placeholder="MM" className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-center text-white text-lg outline-none focus:border-indigo-500/50" value={month} onChange={e => { const v = e.target.value.replace(/\D/g, ''); setMonth(v); if(v.length===2) yearRef.current?.focus(); }} />
                  <input ref={yearRef} required maxLength={4} placeholder="YYYY" className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-center text-white text-lg outline-none focus:border-indigo-500/50" value={year} onChange={e => setYear(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.2em] text-slate-600 font-bold uppercase ml-1">Email liên kết (Tùy chọn)</label>
                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl focus-within:border-indigo-500/50 transition-all">
                  <Mail className="w-5 h-5 text-slate-700" />
                  <input type="email" className="bg-transparent outline-none w-full text-white text-sm" placeholder="email@example.com" onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
            </div>

            <button className="w-full py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98]">
              Bắt đầu giải mã <MoveRight className="w-4 h-4 inline ml-2" />
            </button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}