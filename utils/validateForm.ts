export const validateForm = (name: string, email: string, day: string, month: string, year: string) => {
  // 1. Làm sạch dữ liệu (Cleansing)
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  // 2. Kiểm tra Tên (Chặn tên chứa số hoặc quá ngắn)
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ cho phép chữ và khoảng trắng
  if (cleanName.length < 2) return "Vui lòng nhập họ và tên thật.";
  if (!nameRegex.test(cleanName)) return "Tên không được chứa số hoặc ký tự đặc biệt.";
  
  // 3. Kiểm tra Email nâng cao (Nếu có nhập)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const blacklistedEmails = ['test@', 'abc@', '123@', 'asdf@'];
  if (cleanEmail) {
    if (!emailRegex.test(cleanEmail)) return "Định dạng Email không hợp lệ.";
    if (blacklistedEmails.some(domain => cleanEmail.startsWith(domain))) {
      return "Vui lòng sử dụng Email thật để nhận bản giải mã.";
    }
  }

  // 4. Kiểm tra Ngày sinh chuyên sâu
  const d = parseInt(day);
  const m = parseInt(month);
  const y = parseInt(year);
  const currentYear = new Date().getFullYear();

  if (y < 1920 || y > currentYear) return `Năm sinh phải từ 1920 đến ${currentYear}.`;

  const dateCheck = new Date(y, m - 1, d);
  if (dateCheck.getFullYear() !== y || dateCheck.getMonth() !== m - 1 || dateCheck.getDate() !== d) {
    return "Ngày sinh bạn nhập không tồn tại trên lịch thực tế.";
  }

  // Chặn người dùng quá nhỏ tuổi (Dưới 13 tuổi chẳng hạn - tùy phễu của bạn)
  const age = currentYear - y;
  if (age < 13) return "Ứng dụng dành cho người từ 13 tuổi trở lên.";

  return null;
};