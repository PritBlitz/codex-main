import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workshops', value: 'Workshops' },
          { title: 'Competitions', value: 'Competitions' },
          { title: 'Seminars', value: 'Seminars' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'Upcoming' },
          { title: 'Ongoing', value: 'Ongoing' },
          { title: 'Past', value: 'Past' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Upcoming'
    }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'desc', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({ name: 'link', title: 'Link', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' })
  ],
})
