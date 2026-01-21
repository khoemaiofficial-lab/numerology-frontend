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

export function capitalizeWords(str: string) {
  return str.replace(/(^|[\s-])(\S)/g, (_match, sep, ch) => {
    // dùng toLocaleUpperCase để hỗ trợ Unicode (ví dụ tiếng Việt)
    return sep + ch.toLocaleUpperCase('vi');
  });
}

export function calculatePersonalAndWorldNumber(data: { lifePath: number }) {
  const today = new Date(); // Mặc định hệ thống lấy 2026 theo context
  const d = today.getDate();
  const m = today.getMonth() + 1;
  const y = today.getFullYear();

  const sumDigits = (n: number | string): number => 
    n.toString().split('').reduce((a, b) => a + (parseInt(b) || 0), 0);

  const reduceToSingle = (n: number): number => {
    let res = n;
    while (res > 9 && res !== 11 && res !== 22 && res !== 33) {
      res = sumDigits(res);
    }
    return res;
  };

  
  const worldDay = reduceToSingle(sumDigits(d) + sumDigits(m) + sumDigits(y));
  const personalDay = reduceToSingle(worldDay + data.lifePath);

  return { worldDay, personalDay };
}