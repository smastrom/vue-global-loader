import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const isFinalBundle = !process.argv.includes('--watch')

export default defineConfig({
   esbuild: {
      drop: isFinalBundle ? ['console'] : [],
   },
   build: {
      emptyOutDir: isFinalBundle,
      target: 'es2015',
      lib: {
         entry: 'index.ts',
         name: 'vue-global-loader',
         fileName: 'index',
         formats: ['es'],
      },
      rollupOptions: {
         external: ['vue'],
         output: {
            globals: {
               vue: 'Vue',
            },
         },
      },
   },
   plugins: [
      dts({
         rollupTypes: true,
      }),
      vue(),
   ],
})
