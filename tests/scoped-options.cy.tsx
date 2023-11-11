import { defineComponent, onMounted } from 'vue'
import {
   GlobalLoader,
   CircleSpinner,
   useGlobalLoader,
   DEFAULT_OPTIONS as DEF,
} from 'vue-global-loader'

describe('Scoped Options', () => {
   const customConf = {
      backgroundColor: 'red',
      backgroundOpacity: 0.5,
      backgroundBlur: 10,
      foregroundColor: 'blue',
      transitionDuration: 1000,
      screenReaderMessage: 'Custom message',
      zIndex: 1000,
   }

   const App = defineComponent({
      setup() {
         const { displayLoader, destroyLoader } = useGlobalLoader(customConf)
         const { displayLoader: displayNewLoader } = useGlobalLoader()

         onMounted(() => {
            window.addEventListener('display-loader', () => displayLoader())
            window.addEventListener('destroy-loader', () => destroyLoader())
            window.addEventListener('display-new-loader', () => displayNewLoader())
         })

         return () => (
            <GlobalLoader data-cy-loader>
               <CircleSpinner />
            </GlobalLoader>
         )
      },
   })

   it('Scoped options are applied to a specific loader and restored on destroy', () => {
      cy.mountApp(App)

         .get('body')
         .triggerAppEvent('display-loader')

      cy.getRoot()
         .checkCssVars(customConf)
         .checkComputedStyles(customConf)

         .get('[aria-live]')
         .should('contain.text', customConf.screenReaderMessage)

      cy.triggerAppEvent('destroy-loader')

      cy.triggerAppEvent('display-new-loader')

      cy.getRoot()
         .checkCssVars(DEF)
         .checkComputedStyles(DEF)

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })
})
