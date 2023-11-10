import {
   CircleSpinner,
   RingSpinner,
   RingDotSpinner,
   RingBarsSpinner,
   PulseSpinner,
   BarsSpinner,
   DotsSpinner,
   WaveSpinner,
} from 'vue-global-loader'

export const pkgSpinners = {
   CircleSpinner,
   RingSpinner,
   RingDotSpinner,
   RingBarsSpinner,
   PulseSpinner,
   BarsSpinner,
   DotsSpinner,
   WaveSpinner,
}

export function useStore() {
   return useNuxtApp().$store
}
