"use client";
import { usePathname } from 'next/navigation';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="vi">
      <body className="bg-[#020205] antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}