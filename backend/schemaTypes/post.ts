import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Web3', value: 'Web3' },
          { title: 'Security', value: 'Security' },
          { title: 'Wasm', value: 'Wasm' },
          { title: 'React', value: 'React' },
          { title: 'OS', value: 'OS' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'desc', title: 'Short Description', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Main Image', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'teamMember' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
  ],
})
