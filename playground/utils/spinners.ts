import {
   CircleSpinner,
   RingSpinner,
   RingDotSpinner,
   RingBarsSpinner,
   PulseSpinner,
   BarsSpinner,
   DotsSpinner,
   WaveSpinner,
} from '#components'

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
