import type { CSSProperties } from 'vue'
import type { GlobalLoaderStore } from './store'

export interface GlobalLoaderOptions {
   screenReaderMessage: string
   playTransition: boolean
   foregroundColor: string
   backgroundColor: string
   backgroundOpacity: number
   backgroundBlur: number
}

export interface GlobalLoaderCSSVars extends CSSProperties {
   '--v-gl-color': string
   '--v-gl-bg-color': string
   '--v-gl-bg-opacity': number
   '--v-gl-bg-blur': string
}

export type { GlobalLoaderStore }
