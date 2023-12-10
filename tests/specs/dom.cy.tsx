import { defineComponent as c, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useGlobalLoader } from 'vue-global-loader'

import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'

describe('DOM Mutations', () => {
   const App = c({
      setup() {
         const { displayLoader, destroyLoader } = useGlobalLoader()
         const isMounted = ref(true)

         onMounted(() => {
            window.addEventListener('display-loader', () => displayLoader())
            window.addEventListener('destroy-loader', () => destroyLoader())
            window.addEventListener('destroy-global-loader', () => (isMounted.value = false))
         })

         return () =>
            isMounted.value && (
               <GlobalLoader data-cy-loader>
                  <CircleSpinner />
               </GlobalLoader>
            )
      },
   })

   it('Teleports to HTML', () => {
      cy.mountApp(App)

         .get('body')
         .triggerAppEvent('display-loader')

      cy.get('body').siblings('[data-cy-loader]').should('exist')
   })

   function checkDom() {
      for (let i = 0; i < 20; i++) {
         cy.triggerAppEvent('display-loader')
         cy.getRoot().should('exist')
         cy.checkDomAttrs('displayed')

         cy.triggerAppEvent('destroy-loader')
         cy.getRoot().should('not.exist')
         cy.checkDomAttrs('destroyed')
      }
   }

   it('DOM mutations are toggled properly', () => {
      cy.mountApp(App)

      checkDom()
   })

   it('DOM mutations are toggled properly if transition is disabled', () => {
      cy.mountApp(App, { transitionDuration: 0 })

      checkDom()
   })

   it('DOM mutations are restored if GlobalLoader is removed from the DOM', () => {
      cy.mountApp(App)

      cy.triggerAppEvent('display-loader')
      cy.getRoot().should('exist')
      cy.checkDomAttrs('displayed')

      cy.triggerAppEvent('destroy-global-loader')
      cy.getRoot().should('not.exist')
      cy.checkDomAttrs('destroyed')
   })
})

describe('Focus', () => {
   const App = c({
      setup() {
         const router = useRouter()
         const { displayLoader, destroyLoader } = useGlobalLoader()

         onMounted(() => {
            window.addEventListener('display-loader', () => displayLoader())
            window.addEventListener('destroy-loader', () => destroyLoader())
            window.addEventListener('go-to-about', () => router.push('/about'))
         })

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
         return () => (
            <>
               <h1>Home</h1>
               <button data-cy-submit>Submit</button>
            </>
         )
      },
   })

   const About = c({
      setup() {
         return () => <h1>About</h1>
      },
   })

   it('Focuses back to prev focused element', () => {
      cy.mountApp(App, {}, [
         {
            path: '/',
            component: Home,
         },
      ])
         .get('[data-cy-submit]')
         .focus()

      cy.focused().should('exist').and('have.attr', 'data-cy-submit')

      cy.triggerAppEvent('display-loader')

      cy.focused().should('not.exist')

      cy.triggerAppEvent('destroy-loader')

      cy.focused().should('exist').and('have.attr', 'data-cy-submit')
   })

   it("Doesn't throw if after navigation, prev focused element is not available", () => {
      cy.mountApp(App, {}, [
         { path: '/', component: Home },
         { path: '/about', component: About },
      ])
         .get('[data-cy-submit]')
         .focus()

      cy.focused().should('exist').and('have.attr', 'data-cy-submit')

      cy.triggerAppEvent('display-loader')
      cy.triggerAppEvent('go-to-about')
      cy.triggerAppEvent('destroy-loader')

      cy.get('h1').should('contain.text', 'About')

      cy.focused().should('not.exist')
   })
})
