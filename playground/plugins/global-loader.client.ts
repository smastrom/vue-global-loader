import { globalLoader } from 'vue-global-loader'

export default defineNuxtPlugin({
   order: 0,
   setup({ vueApp }) {
      vueApp.use(globalLoader)
   },
})
