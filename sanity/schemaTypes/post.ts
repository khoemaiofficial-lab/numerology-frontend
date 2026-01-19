import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Bài luận giải',
  type: 'document',
  fields: [
    // 1. THÔNG TIN CƠ BẢN
    defineField({ name: 'title', title: 'Tiêu đề bài viết', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Đường dẫn (URL)', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    
    // 2. LOGIC THẦN SỐ HỌC
    defineField({
      name: 'targetNumber',
      title: 'Số chủ đạo mục tiêu',
      description: 'Bài viết này dành cho con số nào?',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22] },
    }),
    defineField({ name: 'category', title: 'Chuyên mục', type: 'reference', to: {type: 'category'} }),
    
    // 3. HÌNH ẢNH & NỘI DUNG
    defineField({ name: 'mainImage', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Nội dung luận giải', type: 'blockContent' }),
    
    // 4. SEO METADATA (DÀNH CHO GOOGLE)
    defineField({
      name: 'seoTitle',
      title: 'Tiêu đề SEO',
      type: 'string',
      description: 'Hiển thị trên kết quả tìm kiếm (Tối ưu 60 ký tự)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Mô tả SEO',
      type: 'text',
      rows: 3,
      description: 'Đoạn trích dẫn hiện trên Google để thu hút click',
    }),
  ],
})