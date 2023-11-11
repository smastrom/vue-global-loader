import { defineComponent as c, onMounted } from 'vue'
import {
   GlobalLoader,
   useGlobalLoader,
   // Spinners
   CircleSpinner,
   RingSpinner,
   RingDotSpinner,
   RingBarsSpinner,
   PulseSpinner,
   BarsSpinner,
   DotsSpinner,
   WaveSpinner,
} from 'vue-global-loader'

describe('Spinners', () => {
   it('All spinners are imported and rendered', () => {
      ;[
         CircleSpinner,
         RingSpinner,
         RingDotSpinner,
         RingBarsSpinner,
         PulseSpinner,
         BarsSpinner,
         DotsSpinner,
         WaveSpinner,
      ].forEach((Spinner) => {
         const app = c({
            setup() {
               const { displayLoader } = useGlobalLoader()
               onMounted(displayLoader)

               return () => (
                  <GlobalLoader>
                     <Spinner />
                  </GlobalLoader>
               )
            },
         })

         cy.mountApp(app)
            .getRoot()
            .within(() => {
               cy.get('svg').should('exist')
            })
      })
   })
})
