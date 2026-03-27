import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'codex-backend',

  projectId: 'wp10p4qb',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Regular document types (filtering out the singleton)
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (prev) =>
      prev.filter((template) => !['settings'].includes(template.id)),
  },
})
