import { NUMEROLOGY_DATA } from "@/app/constants/numerology";

// 1. Hàm lấy danh hiệu
export const getTitleByNumber = (num: number): string => 
  NUMEROLOGY_DATA[num]?.title || "Người Tìm Đường";

// 2. Hàm lấy màu sắc Aura
export const getColorByNumber = (num: number): string => 
  NUMEROLOGY_DATA[num]?.color || "#6366F1";

// 3. Hàm lấy mô tả tóm tắt
export const getDescriptionByNumber = (num: number): string => 
  NUMEROLOGY_DATA[num]?.description || "";

export const calculateNumerology = (
  name: string,
//   email: string,
  birthdayRaw: string
) => {
  // 1. Logic cộng tổng ngày sinh (Life Path)
  const digits = birthdayRaw.replace(/\-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  
  const reduceNumber = (num: number): number => {
    while (num > 9 && ![11, 22, 33].includes(num)) {
      num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  };

  const lifePath = reduceNumber(sum);

  // 2. Logic tính tên (Linh hồn, Nhân cách...)
  // Bạn có thể bê nguyên logic từ backend sang đây rất dễ dàng
  
  return {
    lifePath,
    name,
    title: getTitleByNumber(lifePath), // Hàm lấy title tương ứng
    description: getDescriptionByNumber(lifePath), // Lấy từ một file JSON cố định
    color: getColorByNumber(lifePath),
    // ... các chỉ số khác
  };
};
