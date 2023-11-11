import { defineComponent as c, onMounted } from 'vue'
import { useGlobalLoader, DEFAULT_OPTIONS as DEF } from 'vue-global-loader'

import App from '@/App.vue'

describe('Config', () => {
   const Home = c({
      setup() {
         const { displayLoader } = useGlobalLoader()
         onMounted(displayLoader)

         return null
      },
   })

   const routes = [
      {
         path: '/',
         component: Home,
      },
   ]

   it('Default config is injected', () => {
      cy.mountApp(App, {}, routes)
         .getRoot()
         .checkCssVars(DEF)

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })

   it('Custom config is injected', () => {
      const customConf = {
         backgroundColor: 'red',
         backgroundOpacity: 0.5,
         backgroundBlur: 10,
         foregroundColor: 'blue',
         transitionDuration: 1000,
         screenReaderMessage: 'Custom message',
      }

      cy.mountApp(App, customConf, routes)
         .getRoot()
         .checkCssVars(customConf)

         .get('[aria-live]')
         .should('contain.text', customConf.screenReaderMessage)
   })

   it('Custom config overrides and is merged with default config', () => {
      const customConf2 = {
         backgroundColor: 'red',
         backgroundOpacity: 0.5,
         backgroundBlur: 10,
      } as const

      cy.mountApp(App, customConf2, routes)
         .getRoot()
         .checkCssVars({ ...DEF, ...customConf2 })

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })
})
