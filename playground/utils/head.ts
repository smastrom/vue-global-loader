const siteName = 'Vue Global Loader'
const description = 'Global loaders made easy for Vue and Nuxt.'

export function getHead() {
   return {
      title: `${siteName} - ${description}`,
      link: [
         {
            rel: 'icon',
            href: '/favicon.ico',
         },
      ],
      htmlAttrs: {
         lang: 'en',
      },
      meta: [
         {
            hid: 'description',
            name: 'description',
            content: description,
         },
         {
            hid: 'og:title',
            property: 'og:title',
            content: `${siteName} - ${description}`,
         },
         {
            hid: 'og:description',
            property: 'og:description',
            content: description,
         },
         {
            hid: 'og:image',
            property: 'og:image',
            content: '/og-image.jpg',
         },
         {
            hid: 'og:url',
            property: 'og:url',
            content: 'https://notivue.pages.dev',
         },
         {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: `${siteName} - ${description}`,
         },
         {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description,
         },

         {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: '/og-image.jpg',
         },
         {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image',
         },
      ],
   }
}
