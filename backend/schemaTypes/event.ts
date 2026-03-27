import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'eventId', title: 'Event ID', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workshops', value: 'Workshops' },
          { title: 'Hackathons', value: 'Hackathons' },
          { title: 'Seminars', value: 'Seminars' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'time', title: 'Time', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'icon', title: 'Material Icon Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'desc', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', validation: (Rule) => Rule.required() }),
  ],
})
