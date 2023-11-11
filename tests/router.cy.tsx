import { defineComponent as c, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { GlobalLoader, CircleSpinner, useGlobalLoader } from 'vue-global-loader'

describe('Router', () => {
   const WAIT = 2000

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
            }, WAIT)
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

      cy.get('h1')
         .should('contain.text', 'Home')
         .get('body')
         .trigger('display-loader', { force: true })

      cy.wait(WAIT)

      cy.get('h1')
         .should('contain.text', 'About')
         .getRoot()
         .should('be.visible')
         .get('body')
         .trigger('destroy-loader', { force: true })

      cy.getRoot().should('not.exist')
   })
})
