import { defineComponent as c, onMounted } from 'vue'
import {
   GlobalLoader,
   CircleSpinner,
   useGlobalLoader,
   DEFAULT_OPTIONS as DEF,
} from 'vue-global-loader'

describe('Config', () => {
   const App = c({
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
      cy.mountApp(App)
         .getRoot()
         .checkCssVars(DEF)
         .checkComputedStyles(DEF)

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

      cy.mountApp(App, customConf)
         .getRoot()
         .checkCssVars(customConf)
         .checkComputedStyles(customConf)

         .get('[aria-live]')
         .should('contain.text', customConf.screenReaderMessage)
   })

   it('Custom config overrides and is merged with default config', () => {
      const customConf2 = {
         backgroundColor: 'red',
         backgroundOpacity: 0.5,
         backgroundBlur: 10,
      } as const

      cy.mountApp(App, customConf2)
         .getRoot()
         .checkCssVars({ ...DEF, ...customConf2 })
         .checkComputedStyles({ ...DEF, ...customConf2 })

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })

   it('Config can be updated via `updateOptions`', () => {
      const customConf = {
         backgroundColor: 'orange',
         backgroundOpacity: 0.75,
         backgroundBlur: 5,
         screenReaderMessage: 'Custom updated message',
      }

      const App = c({
         setup() {
            const { displayLoader, updateOptions } = useGlobalLoader()

            onMounted(() => {
               window.addEventListener('display-loader', () => displayLoader())
               window.addEventListener('update-options', () => updateOptions(customConf))
            })

            return () => (
               <GlobalLoader data-cy-loader>
                  <CircleSpinner />
               </GlobalLoader>
            )
         },
      })

      cy.mountApp(App)
         .triggerAppEvent('display-loader')

         .getRoot()
         .checkCssVars(DEF)
         .checkComputedStyles(DEF)
         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)

         .triggerAppEvent('update-options')

         .getRoot()
         .checkCssVars({ ...DEF, ...customConf })
         .checkComputedStyles({ ...DEF, ...customConf })
         .get('[aria-live]')
         .should('contain.text', customConf.screenReaderMessage)
   })
})
