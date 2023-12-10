import { defineComponent, onMounted } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'

import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
import RingSpinner from 'vue-global-loader/RingSpinner.vue'
import RingDotSpinner from 'vue-global-loader/RingDotSpinner.vue'
import RingBarsSpinner from 'vue-global-loader/RingBarsSpinner.vue'
import PulseSpinner from 'vue-global-loader/PulseSpinner.vue'
import BarsSpinner from 'vue-global-loader/BarsSpinner.vue'
import DotsSpinner from 'vue-global-loader/DotsSpinner.vue'
import WaveSpinner from 'vue-global-loader/WaveSpinner.vue'

describe('Spinners', () => {
   it('All spinners are rendered', () => {
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
