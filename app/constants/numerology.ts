// Định nghĩa cấu trúc dữ liệu cho từng con số
export interface NumerologyDetail {
  title: string;
  color: string;
  description: string;
}

// Ma trận dữ liệu gốc
export const NUMEROLOGY_DATA: Record<number, NumerologyDetail> = {
  1: {
    title: "Người Tiên Phong",
    color: "#FACC15", // Vàng Gold
    description: "Bạn mang năng lượng của một nhà lãnh đạo bẩm sinh, đầy độc lập và quyết đoán. Khát khao lớn nhất của bạn là khẳng định bản thân và dẫn dắt người khác bằng sự sáng tạo không giới hạn."
  },
  2: {
    title: "Người Kết Nối",
    color: "#38BDF8", // Xanh Lam Nhạt
    description: "Sở hữu trực giác nhạy bén và trái tim thấu cảm, bạn là nhịp cầu kết nối mọi người. Sự hòa hợp, nhã nhặn và khả năng lắng nghe là chìa khóa giúp bạn gặt hái thành công."
  },
  3: {
    title: "Người Truyền Cảm Hứng",
    color: "#FB923C", // Cam Năng Lượng
    description: "Bạn là hiện thân của sự sáng tạo và ngôn từ. Khả năng diễn đạt tự nhiên cùng tinh thần lạc quan giúp bạn luôn là tâm điểm, mang lại niềm vui và động lực cho cộng đồng xung quanh."
  },
  4: {
    title: "Người Xây Dựng",
    color: "#4ADE80", // Xanh Lá Kỷ Luật
    description: "Thực tế, kỷ luật và kiên định là những gì định nghĩa nên bạn. Bạn có khả năng biến những ý tưởng trừu tượng thành hiện thực vững chắc nhờ vào quy trình và sự tỉ mỉ tuyệt vời."
  },
  5: {
    title: "Linh Hồn Tự Do",
    color: "#F472B6", // Hồng/Tím Nhạt (Như trong ảnh bạn gửi)
    description: "Bạn khao khát trải nghiệm và sự đổi mới. Tần số của bạn gắn liền với những chuyến đi, sự thích nghi nhanh chóng và khả năng bứt phá khỏi mọi giới hạn để khám phá những chân trời mới."
  },
  6: {
    title: "Người Nuôi Dưỡng",
    color: "#6366F1", // Indigo/Xanh Tím
    description: "Trách nhiệm và tình yêu thương vô điều kiện là sức mạnh cốt lõi của bạn. Bạn tìm thấy hạnh phúc khi được chăm sóc, bảo vệ gia đình và xây dựng những giá trị nhân văn cho xã hội."
  },
  7: {
    title: "Nhà Thông Thái",
    color: "#A855F7", // Tím Huyền Bí
    description: "Bạn là người đi tìm chân lý với một trí tuệ sâu sắc. Khả năng phân tích và chiêm nghiệm giúp bạn thấu hiểu những quy luật của vũ trụ, trở thành người dẫn dắt về mặt tâm thức."
  },
  8: {
    title: "Người Điều Hành",
    color: "#94A3B8", // Xám Bạc/Thạch Anh
    description: "Năng lượng của bạn gắn liền với quyền lực và sự thịnh vượng vật chất. Với tầm nhìn chiến lược và khả năng điều hành xuất sắc, bạn sinh ra để chinh phục những đỉnh cao sự nghiệp."
  },
  9: {
    title: "Người Nhân Ái",
    color: "#F87171", // Đỏ San Hô
    description: "Bạn mang trong mình lý tưởng lớn lao về sự phục vụ nhân loại. Lòng bao dung và trí tuệ tổng hợp giúp bạn kết thúc những chu kỳ cũ và mở ra những giá trị tốt đẹp cho thế giới."
  },
  // Các con số Master
  11: {
    title: "Người Truyền Tin Tâm Linh",
    color: "#E2E8F0",
    description: "Con số bậc thầy về trực giác. Bạn là kênh dẫn của những thông điệp cao cả, mang sứ mệnh thức tỉnh và nâng cao nhận thức cho những người xung quanh."
  },
  22: {
    title: "Bậc Thầy Kiến Tạo",
    color: "#5EEAD4",
    description: "Bạn sở hữu năng lực thực thi những dự án tầm cỡ thế giới. Với tầm nhìn của số 11 và sự thực tế của số 4, bạn có thể biến những điều không thể thành có thể."
  },
  33: {
    title: "Bậc Thầy Chữa Lành",
    color: "#FDA4AF",
    description: "Cấp độ cao nhất của tình yêu thương. Bạn cống hiến cuộc đời mình để xoa dịu nỗi đau và dạy dỗ nhân loại bằng sự từ bi và trí tuệ thượng thừa."
  }
};

// Các hàm Helper để lấy dữ liệu nhanh
export const getNumerologyDetail = (num: number): NumerologyDetail => {
  return NUMEROLOGY_DATA[num] || NUMEROLOGY_DATA[1]; // Mặc định trả về số 1 nếu lỗi
};