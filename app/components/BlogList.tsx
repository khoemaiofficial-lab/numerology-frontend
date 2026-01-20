'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { capitalizeWords } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

export default function BlogList({list}: {list: any}) {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 p-3 md:grid-cols-2 lg:max-w-8xl lg:grid-cols-3 gap-6">
        {list.map((post: any) => (
          <Card key={post?.currentSlug} className="border-2 pt-0 w-86 mx-auto md:w-92 lg:w-81 hover:shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-800 transition duration-300">
            <Image
              src={urlFor(post?.mainImage).width(1200).height(500).auto("format").url()} // Use the urlFor function to generate the image URL
              width={500}
              height={300}
              alt={post?.title}  
              loading="lazy"
              className="h-58 w-full object-cover rounded-lg"
            />
            <CardContent>
              <Badge variant="secondary" className="mb-2 bg-blue-500 text-gray-200">{capitalizeWords(post?.category?.title)}</Badge>
              <h2 className="text-xl line-clamp-2 font-semibold">{post?.title}</h2>
              <p className="line-clamp-3 text-lg mt-2 text-gray-600 dark:text-gray-300">{post?.smallDescription}</p>
              <Button asChild className="w-full mt-7">
                <Link className="dark:text-gray-200" href={`/blog/${post?.slug}`} rel="preload">Đọc thêm</Link>
              </Button>
            </CardContent>
          </Card>
      ))}
      </div>
    )
}