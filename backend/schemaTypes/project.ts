import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Artificial Intelligence', value: 'Artificial Intelligence' },
          { title: 'Machine Learning', value: 'Machine Learning' },
          { title: 'Competitive Programming', value: 'Competitive Programming' },
          { title: 'Open Source', value: 'Open Source' },
          { title: 'Cybersecurity', value: 'Cybersecurity' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
            defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'demoLink',
      title: 'Live Demo Link',
      type: 'url',
    }),
    defineField({
      name: 'repoLink',
      title: 'Repository Link',
      type: 'url',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
