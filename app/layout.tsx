"use client";
import { usePathname } from 'next/navigation';
import "./globals.css";
import Header from './components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Ẩn Header ở Trang chủ và Trang kết quả để giữ sự huyền bí
  // const isMinimalPage = pathname === '/' || pathname === '/result';

  return (
    <html lang="vi">
      <body className="bg-[#020205] antialiased">
        {/* Header nằm ở đây sẽ luôn Full-width */}
        {/* {!isMinimalPage && <Header />} */}
        
        {/* Content nằm trong luồng riêng */}
        <main>{children}</main>
      </body>
    </html>
  );
}