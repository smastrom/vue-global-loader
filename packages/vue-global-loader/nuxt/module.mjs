import {
   defineNuxtModule,
   addPluginTemplate,
   addComponentsDir,
   addImports,
   createResolver,
   addComponent,
   extendViteConfig,
} from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
   meta: {
      name: 'nuxt/vue-global-loader',
      configKey: 'globalLoader',
      compatibility: {
         nuxt: '>=3.0.0',
      },
   },
   setup(moduleOptions, nuxt) {
      nuxt.options.runtimeConfig.public.globalLoader = defu(
         nuxt.options.runtimeConfig.public.globalLoader || {},
         moduleOptions
      )

      if (nuxt.options.runtimeConfig.public.globalLoader.addPlugin !== false) {
         addPluginTemplate({
            filename: '001.vue-global-loader.client.mjs',
            getContents() {
               return `
                  import { globalLoader } from 'vue-global-loader'
                  import { defineNuxtPlugin, useRuntimeConfig } from '#imports'               
   
                  export default defineNuxtPlugin(({ vueApp }) => {
                     const options = useRuntimeConfig().public?.globalLoader || {}
                     
                     vueApp.use(globalLoader, options)
                  })           
                  `
            },
         })
      }

      const resolver = createResolver(import.meta.url)

      addImports({ name: 'useGlobalLoader', as: 'useGlobalLoader', from: 'vue-global-loader' })

      addComponentsDir({
         path: resolver.resolve('../components/spinners'),
         extensions: ['vue'],
      })

      addComponent({
         name: 'GlobalLoader',
         filePath: resolver.resolve('../components/GlobalLoader.vue'),
      })

      extendViteConfig((config) => {
         config.optimizeDeps ||= {}
         config.optimizeDeps.include ||= []

         if (!config.optimizeDeps.include.includes('vue-global-loader')) {
            config.optimizeDeps.include.push('vue-global-loader')
         }
      })
   },
})
