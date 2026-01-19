import { groq } from "next-sanity";

// Query lấy chi tiết bài viết dựa trên con số chủ đạo
export const postByNumberQuery = groq`
  *[_type == "post" && targetNumber == $number][0] {
    title,
    "slug": slug.current,
    mainImage,
    body,
    seoTitle,
    seoDescription
  }
`;