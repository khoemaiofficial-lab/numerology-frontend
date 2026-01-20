// src/app/blog/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import BlogList from "../components/BlogList";
import { getBlogData } from "@/services/api";
import Header from "@/app/components/Header";
import CategoryFilter from "../components/CategoryFilter";

export default async function BlogPage({ searchParams }: {
  searchParams: Promise<{ category?: string; number?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category || "";
  const number = params?.number ? parseInt(params.number) : 0;

  // Lấy dữ liệu dựa trên URL params
  const data = await getBlogData(category, number);

  return (
    <div className={` min-h-screen bg-[#020205] text-slate-300 antialiased`}>
      <Header />
      <main className="min-h-screen bg-[#020205] pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tiêu đề & Thanh Filter */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Thư viện bài viết</h1>
            <CategoryFilter currentCategory={category} currentNumber={number}/>
          </header>

          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Card className="bg-white/5 border-white/10 w-full max-w-md">
                <CardContent className="p-10 text-center text-slate-400">
                  <p className="text-lg">Chưa có bài viết nào trong mục này.</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <BlogList list={data} />
          )}
        </div>
      </main>
    </div>
  );
}