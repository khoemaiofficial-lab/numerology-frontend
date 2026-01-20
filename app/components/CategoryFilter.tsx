import { getCategories } from "@/services/api";
import Link from "next/link";

// Bổ sung thêm currentNumber vào props
export default async function CategoryFilter({ 
  currentCategory, 
  currentNumber 
}: { 
  currentCategory: string;
  currentNumber: number; 
}) {
  const categories = await getCategories();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

  return (
    <div className="space-y-6 mb-10">
      {/* 1. Lọc theo chuyên mục */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
            currentCategory === "" && currentNumber === 0
              ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          Tất cả bài viết
        </Link>

        {categories.map((cat: any) => (
          <Link
            key={cat.slug}
            // Logic: Giữ nguyên số đang chọn khi đổi chuyên mục
            href={`/blog?category=${cat.slug}${currentNumber !== 0 ? `&number=${currentNumber}` : ""}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
              currentCategory === cat.slug
                ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* 2. Lọc theo con số chủ đạo */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Theo số:</span>
        <div className="flex gap-2">
          {numbers.map((num) => (
            <Link
              key={num}
              // Logic: Giữ nguyên chuyên mục đang chọn khi đổi số
              href={`/blog?number=${num}${currentCategory !== "" ? `&category=${currentCategory}` : ""}`}
              // Sửa logic highlight: so sánh number từ URL với số trong mảng
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all text-sm font-bold ${
                currentNumber === num
                  ? "bg-white border-white text-black scal shadow-lg"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-blue-600 hover:text-blue-400"
              }`}
            >
              {num}
            </Link>
          ))}
          
          {/* Nút xóa nhanh bộ lọc số */}
          {currentNumber !== 0 && (
            <Link 
              href={`/blog${currentCategory !== "" ? `?category=${currentCategory}` : ""}`}
              className="flex items-center text-[10px] text-red-400 uppercase font-bold pl-2 hover:underline"
            >
              Xóa lọc số
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}