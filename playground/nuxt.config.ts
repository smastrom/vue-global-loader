import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

import { getHead } from './utils/head'

export default defineNuxtConfig({
   modules: ['vue-global-loader/nuxt'],
   css: ['@/assets/global.css'],
   devtools: {
      enabled: true,
   },
   nitro: {
      preset: 'cloudflare-pages',
   },
   app: {
      head: getHead(),
   },
   vite: {
      css: {
         transformer: 'lightningcss',
         lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
            drafts: {
               nesting: true,
            },
         },
      },
   },
   globalLoader: {
      addPlugin: true,
      // backgroundOpacity: 0.5,
      transitionDuration: 400,
      backgroundColor: 'var(--light-1)',
      foregroundColor: 'var(--dark-1)',
   },
})
