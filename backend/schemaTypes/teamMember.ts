import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'memberId', title: 'Member ID', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Design', value: 'Design' },
          { title: 'Operations', value: 'Operations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'image', title: 'Profile Image', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'social' }]
    }),
  ],
})
