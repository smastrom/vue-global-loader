import { defineComponent, onMounted } from 'vue'
import { useGlobalLoader, DEFAULT_OPTIONS as DEF } from 'vue-global-loader'

import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'

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
         const { displayLoader: displayLoader2 } = useGlobalLoader()

         onMounted(() => {
            window.addEventListener('display-loader', () => displayLoader())
            window.addEventListener('destroy-loader', () => destroyLoader())
            window.addEventListener('display-loader-2', () => displayLoader2())
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

      cy.triggerAppEvent('display-loader')

      cy.getRoot()
         .checkCssVars(customConf)
         .checkComputedStyles(customConf)
         .within(() => {
            cy.get('[aria-live]').should('contain.text', customConf.screenReaderMessage)
         })

      cy.triggerAppEvent('destroy-loader')

      cy.getRoot().should('not.exist')
      cy.triggerAppEvent('display-loader-2')
      cy.getRoot()
         .checkCssVars(DEF)
         .checkComputedStyles(DEF)
         .within(() => {
            cy.get('[aria-live]').should('contain.text', DEF.screenReaderMessage)
         })
   })
})
