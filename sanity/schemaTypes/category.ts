import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Chuyên mục',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Tên chuyên mục' }),
    defineField({ name: 'description', type: 'text', title: 'Mô tả ngắn' }),
  ],
})