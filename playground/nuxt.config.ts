export default defineNuxtConfig({
   modules: ['vue-global-loader/nuxt'],
   css: ['@/assets/global.css'],
   devtools: {
      enabled: true,
   },
   globalLoader: {
      addPlugin: true,
      // backgroundOpacity: 0.5,
      transitionDuration: 400,
      backgroundColor: 'var(--light-1)',
      foregroundColor: 'var(--dark-1)',
   },
})
