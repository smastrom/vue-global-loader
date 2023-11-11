import { defineComponent as c, onMounted } from 'vue'
import {
   GlobalLoader,
   CircleSpinner,
   useGlobalLoader,
   DEFAULT_OPTIONS as DEF,
} from 'vue-global-loader'

describe('Config', () => {
   const app = c({
      setup() {
         const { displayLoader } = useGlobalLoader()
         onMounted(displayLoader)

         return () => (
            <GlobalLoader data-cy-loader>
               <CircleSpinner />
            </GlobalLoader>
         )
      },
   })

   it('Default config is injected', () => {
      cy.mountApp(app)
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
         zIndex: 1000,
      }

      cy.mountApp(app, customConf)
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

      cy.mountApp(app, customConf2)
         .getRoot()
         .checkCssVars({ ...DEF, ...customConf2 })

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })
})
