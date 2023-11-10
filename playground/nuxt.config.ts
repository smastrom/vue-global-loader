export default defineNuxtConfig({
   modules: ['vue-global-loader/nuxt'],
   devtools: {
      enabled: true,
   },
   globalLoader: {
      addPlugin: true,
      backgroundOpacity: 0.5,
      transitionDuration: 300,
   },
})
