'use client'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {/* 1. MỤC BÀI VIẾT */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg">Bài Viết</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4 p-4">
                {/* Mỗi Link nên nằm trong 1 thẻ li riêng để đúng cấu trúc HTML */}
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/blog">
                      <div className="font-medium text-lg">Tất cả bài viết</div>
                      <div className="text-muted-foreground">Browse all components in the library.</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/blog/?category=nutrition">
                      <div className="font-medium text-lg">Dinh Dưỡng</div>
                      <div className="text-muted-foreground">Browse all components in the library.</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/blog?category=sleep">
                      <div className="font-medium text-lg">Giấc Ngủ</div>
                      <div className="text-muted-foreground">Learn how to use the library.</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/blog?category=exercise">
                      <div className="font-medium text-lg">Tập Luyện</div>
                      <div className="text-muted-foreground">Read our latest blog posts.</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/blog?category=mental">
                      <div className="font-medium text-lg">Tâm Lý</div>
                      <div className="text-muted-foreground">Read our latest blog posts.</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 2. MỤC E-BOOK */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/e-book">
                <span className="text-lg px-4 py-2 inline-block">E-Book</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 3. MỤC VỀ CHÚNG TÔI (ĐÃ FIX LỖI LỒNG THẺ) */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/about">
                <span className="text-lg px-4 py-2 inline-block">Về chúng tôi</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* MOBILE MENU - GIỮ NGUYÊN CLASS CŨ */}
      <div className="flex justify-end md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button><FaBars /></button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-2xl">Menu</SheetTitle>
              <SheetDescription className="text-xl">
                Khỏe Mãi - Sống Khỏe Mỗi Ngày
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
              <div className="text-xl">
                <Link href="/" onClick={() => setOpen(false)}>Trang chủ</Link>
              </div>
              <div className="flex flex-col gap-5 text-xl">
                <Link href="/blog?category=nutrition" onClick={() => setOpen(false)}>Dinh Dưỡng</Link>
                <Link href="/blog?category=sleep" onClick={() => setOpen(false)}>Giấc Ngủ</Link>
                <Link href="/blog?category=exercise" onClick={() => setOpen(false)}>Tập luyện</Link>
                <Link href="/blog?category=mental" onClick={() => setOpen(false)}>Tâm Lý</Link>
              </div>
              <div className="text-xl">
                <Link href="/about" onClick={() => setOpen(false)}>Về chúng tôi</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}