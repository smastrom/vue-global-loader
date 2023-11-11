import { defineComponent, onMounted } from 'vue'
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
         const app = defineComponent({
            setup() {
               const { displayLoader } = useGlobalLoader()
               onMounted(displayLoader)

               return () => (
                  <GlobalLoader data-cy-loader>
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
