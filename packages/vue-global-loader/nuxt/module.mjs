import {
   defineNuxtModule,
   addPluginTemplate,
   addComponentsDir,
   addImports,
   createResolver,
} from '@nuxt/kit'
import { defu } from 'defu'

const module = defineNuxtModule({
   meta: {
      name: 'nuxt/vue-global-loader',
      configKey: 'globalLoader',
      compatibility: {
         nuxt: '>=3.0.0',
      },
   },

   async setup(moduleOptions, nuxt) {
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
                  import { defineNuxtPlugin, useRuntimeConfig } from '#app'               
   
                  export default defineNuxtPlugin(({ vueApp }) => {
                     const options = useRuntimeConfig().public?.globalLoader || {}
                     console.log(options) // TODO: Remove

                     vueApp.use(globalLoader, options)
                  })           
                  `
            },
         })
      }

      const resolver = createResolver(import.meta.url)

      addImports({ name: 'useGlobalLoader', as: 'useGlobalLoader', from: 'vue-global-loader' })

      addComponentsDir({ path: resolver.resolve('../components') })
   },
})

export { module as default }
