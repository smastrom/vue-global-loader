import { defineComponent, onMounted, ref } from 'vue'
import { GlobalLoader, CircleSpinner, useGlobalLoader } from 'vue-global-loader'

describe('Callbacks', () => {
   const destroyedText = 'Destroyed'

   const App = defineComponent({
      setup() {
         const { displayLoader, destroyLoader } = useGlobalLoader()

         const callbackResult = ref('')

         onMounted(() => {
            window.addEventListener('display-loader', () => displayLoader())
            window.addEventListener('destroy-loader', () =>
               destroyLoader(() => {
                  callbackResult.value = destroyedText
               })
            )
         })

         return () => (
            <>
               <div data-cy-callback>{callbackResult.value}</div>

               <GlobalLoader data-cy-loader>
                  <CircleSpinner />
               </GlobalLoader>
            </>
         )
      },
   })

   it('onDestroyed callback is called', () => {
      cy.mountApp(App)

         .get('body')
         .triggerAppEvent('display-loader')
         .triggerAppEvent('destroy-loader')

      cy.get('[data-cy-callback]').should('contain.text', destroyedText)
   })
})
