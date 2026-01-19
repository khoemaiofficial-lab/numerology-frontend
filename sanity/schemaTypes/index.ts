import { type SchemaTypeDefinition } from 'sanity'

// 1. Import các schema bạn vừa tạo
import post from './post'
import category from './category'
import blockContent from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Thêm chúng vào mảng types này để Sanity Studio nhận diện
  types: [post, category, blockContent],
}