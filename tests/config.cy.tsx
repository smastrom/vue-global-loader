import { defineComponent as c, onMounted } from 'vue'
import { useGlobalLoader, DEFAULT_OPTIONS as DEF } from 'vue-global-loader'

describe('Config', () => {
   const Home = c({
      setup() {
         const { displayLoader } = useGlobalLoader()
         onMounted(displayLoader)

         return null
      },
   })

   it('Default config is injected', () => {
      cy.mountApp({}, [
         {
            path: '/',
            component: Home,
         },
      ])

      cy.getRoot()

         .should('have.attr', 'style')
         .and('include', '--v-gl-bg-color: ' + DEF.backgroundColor)
         .and('include', '--v-gl-bg-opacity: ' + DEF.backgroundOpacity)
         .and('include', '--v-gl-bg-blur: ' + DEF.backgroundBlur)
         .and('include', '--v-gl-color: ' + DEF.foregroundColor)
         .and('include', '--v-gl-t-dur: ' + DEF.transitionDuration)

         .get('[aria-live]')
         .should('contain.text', DEF.screenReaderMessage)
   })
})
