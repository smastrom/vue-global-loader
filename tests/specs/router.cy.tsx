import { defineComponent as c, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useGlobalLoader } from 'vue-global-loader'

import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'

describe('Router', () => {
   const NAVIGATION_DELAY = 2000

   const App = c({
      setup() {
         return () => (
            <>
               <GlobalLoader data-cy-loader>
                  <CircleSpinner />
               </GlobalLoader>
               <RouterView />
            </>
         )
      },
   })

   const Home = c({
      setup() {
         const { displayLoader } = useGlobalLoader()
         const onDisplay = () => displayLoader()

         const router = useRouter()

         onMounted(() => {
            window.addEventListener('display-loader', onDisplay)

            setTimeout(() => {
               router.push('/about')
            }, NAVIGATION_DELAY)
         })

         return () => <h1>Home</h1>
      },
   })

   const About = c({
      setup() {
         const { destroyLoader } = useGlobalLoader()
         const onDestroy = () => destroyLoader()

         onMounted(() => window.addEventListener('destroy-loader', onDestroy))

         return () => <h1>About</h1>
      },
   })

   it('Loader persists and can be destroyed after navigation', () => {
      cy.mountApp(App, {}, [
         { path: '/', component: Home },
         { path: '/about', component: About },
      ])

      cy.triggerAppEvent('display-loader')

      cy.wait(NAVIGATION_DELAY)

      cy.get('h1')
         .should('contain.text', 'About')
         .getRoot()
         .should('be.visible')
         .triggerAppEvent('destroy-loader')

      cy.getRoot().should('not.exist')
   })
})
