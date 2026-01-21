import { client } from "@/sanity/lib/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getBlogData(categorySlug?: string, targetNumber?: number) {
  const query = `*[_type == "post" 
    && ($category == "" || category->slug.current == $category)
    && ($number == 0 || targetNumber == $number)
  ] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    summary,
    mainImage,
    publishedAt,
    targetNumber,
    "category": category->{title, description, "slug": slug.current}
  }`;

  return await client.fetch(query, { 
    category: categorySlug || "", 
    number: targetNumber || 0 
  });
}

export async function getCategories() {
  const query = `*[_type == "category"] {
    title,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}