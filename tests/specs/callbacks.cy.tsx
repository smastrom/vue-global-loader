import { defineComponent, onMounted, ref } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'

import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'

describe('Callbacks', () => {
   describe('onDestroyed', () => {
      const destroyedText = 'Destroyed'

      const App = defineComponent({
         setup() {
            const { displayLoader, destroyLoader } = useGlobalLoader()
            const { displayLoader: displayLoader2, destroyLoader: destroyLoader2 } =
               useGlobalLoader()

            const result = ref('')

            onMounted(() => {
               window.addEventListener('display-loader', () => displayLoader())
               window.addEventListener('destroy-loader', () =>
                  destroyLoader(() => {
                     result.value = destroyedText
                  })
               )

               window.addEventListener('display-loader-2', () => {
                  displayLoader2()
                  result.value = ''
               })
               window.addEventListener('destroy-loader-2', () => destroyLoader2())
            })

            return () => (
               <>
                  <div data-cy-callback>{result.value}</div>
                  <GlobalLoader data-cy-loader>
                     <CircleSpinner />
                  </GlobalLoader>
               </>
            )
         },
      })

      function testOnDestroyed() {
         cy.triggerAppEvent('display-loader')
         cy.getRoot().should('exist')

         cy.triggerAppEvent('destroy-loader')
         cy.getRoot().should('not.exist')

         cy.get('[data-cy-callback]').should('contain.text', destroyedText)
      }

      it('onDestroyed callback is called', () => {
         cy.mountApp(App)
         testOnDestroyed()
      })

      it('onDestroyed callback is called if transition is disabled', () => {
         cy.mountApp(App, { transitionDuration: 0 })
         testOnDestroyed()
      })

      it('Previous onDestroyed callback is not available in a new context', () => {
         cy.mountApp(App)

         cy.triggerAppEvent('display-loader')
         cy.getRoot().should('exist')

         cy.triggerAppEvent('destroy-loader')
         cy.getRoot().should('not.exist')

         cy.triggerAppEvent('display-loader-2')
         cy.getRoot().should('exist')

         cy.triggerAppEvent('destroy-loader-2')
         cy.getRoot().should('not.exist')

         cy.get('[data-cy-callback]').should('not.contain.text', destroyedText)
      })
   })

   describe('onDisplayed', () => {
      const App = defineComponent({
         setup() {
            const { displayLoader } = useGlobalLoader()

            const result = ref(0)

            onMounted(() => {
               window.addEventListener('display-loader', async () => {
                  const now = Date.now()
                  await displayLoader()
                  result.value = Date.now() - now
               })
            })

            return () => (
               <>
                  <div data-cy-promise>{result.value}</div>
                  <GlobalLoader data-cy-loader>
                     <CircleSpinner />
                  </GlobalLoader>
               </>
            )
         },
      })

      it('displayLoader returns a promise', () => {
         cy.mountApp(App, { transitionDuration: 1000 })

         cy.triggerAppEvent('display-loader')
         cy.get('[data-cy-promise]').should(($div) => {
            const duration = parseInt($div.text())
            expect(duration).to.be.greaterThan(1000).and.to.be.approximately(1000, 100)
         })
      })

      it('displayLoader resolves if transition is disabled', () => {
         cy.mountApp(App, { transitionDuration: 0 })

         cy.triggerAppEvent('display-loader')
         cy.get('[data-cy-promise]').should(($div) => {
            const duration = parseInt($div.text())
            expect(duration).to.be.greaterThan(0).to.be.approximately(0, 100)
         })
      })
   })
})
