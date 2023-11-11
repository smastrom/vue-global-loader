import { defineConfig } from 'cypress'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
   video: false,
   viewportWidth: 1280,
   viewportHeight: 720,
   experimentalMemoryManagement: true,
   component: {
      devServer: {
         framework: 'vue',
         bundler: 'vite',
         viteConfig: {
            server: {
               port: 5176,
            },
            resolve: {
               alias: {
                  '@/support': resolve(__dirname, './cypress/support'),
                  '@': resolve(__dirname, './'),
               },
            },
            plugins: [vue(), vueJsx()],
         },
      },
   },
})
