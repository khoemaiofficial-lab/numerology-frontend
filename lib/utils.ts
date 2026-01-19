import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // Tách dấu ra khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd') // Xử lý chữ đ
    .replace(/([^0-9a-z-\s])/g, '') // Xóa ký tự đặc biệt
    .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, '-') // Tránh nhiều gạch ngang liên tiếp
    .replace(/^-+|-+$/g, ''); // Xóa gạch ngang ở đầu/cuối
};
