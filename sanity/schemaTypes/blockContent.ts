import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Nội dung chi tiết',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Văn bản thường', value: 'normal'},
        {title: 'Tiêu đề lớn (H1)', value: 'h1'},
        {title: 'Tiêu đề phụ (H2)', value: 'h2'},
        {title: 'Trích dẫn hào quang', value: 'blockquote'},
      ],
      marks: {
        decorators: [
          {title: 'In đậm', value: 'strong'},
          {title: 'In nghiêng', value: 'em'},
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true}, // Tối ưu cắt ảnh tự động
    }),
  ],
})