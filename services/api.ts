import { client } from "@/sanity/lib/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const calculateNumerology = async (
  name: string,
  email: string,
  birthday: string
) => {
  try {
    // Sử dụng fetch thay cho axios
    const res = await fetch(`${API_URL}/users/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Fetch yêu cầu bạn phải tự chuyển object sang string
      body: JSON.stringify({
        name,
        email,
        birthday,
      }),
    });

    // Kiểm tra nếu phản hồi không thành công (400, 500...)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Lỗi kết nối từ vũ trụ");
    }

    // Trả về dữ liệu JSON
    return await res.json();
    
  } catch (error) {
    console.error("Lỗi API Calculate:", error);
    throw error;
  }
};

export async function getPostData(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    "categoryName": category->title,
    targetNumber,
    mainImage,
    body,
    summary,
    seoTitle,
    seoDescription
  }`;
  return await client.fetch(query, { slug });
}