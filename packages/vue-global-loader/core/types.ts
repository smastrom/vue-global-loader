import type { CSSProperties } from 'vue'
import type { GlobalLoaderStore } from './store'

export interface GlobalLoaderOptions {
   screenReaderMessage: string
   transitionDuration: number
   foregroundColor: string
   backgroundColor: string
   backgroundOpacity: number
   backgroundBlur: number
   zIndex: number
}

export interface GlobalLoaderCSSVars extends CSSProperties {
   '--v-gl-fg-color': string
   '--v-gl-bg-color': string
   '--v-gl-bg-opacity': number
   '--v-gl-bg-blur': string
   '--v-gl-t-dur': string
   '--v-gl-z': number
}

export type { GlobalLoaderStore }
