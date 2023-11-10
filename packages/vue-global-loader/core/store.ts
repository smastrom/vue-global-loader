import type { GlobalLoaderOptions } from './types'

import { reactive, readonly, ref, inject, type InjectionKey } from 'vue'
import { DEFAULT_OPTIONS } from './constants'
import { isSSR, noop } from './utils'

export const injectionKey = Symbol('') as InjectionKey<GlobalLoaderStore>

export class GlobalLoaderStore {
   options: GlobalLoaderOptions

   prevOptions: GlobalLoaderOptions = { ...DEFAULT_OPTIONS }
   isLoading = ref(false)

   __onDestroyedCb = noop

   constructor(config: Partial<GlobalLoaderOptions>) {
      this.options = reactive(Object.assign({ ...DEFAULT_OPTIONS }, config))
   }

   setOptions(newOptions: Partial<GlobalLoaderOptions>) {
      Object.assign(this.options, newOptions)
   }

   setPrevOptions(_prevOptions: Partial<GlobalLoaderOptions>) {
      Object.assign(this.prevOptions, _prevOptions)
   }

   setIsLoading(value: boolean) {
      this.isLoading.value = value
   }

   displayLoader(scopedOptions: Partial<GlobalLoaderOptions> = {}) {
      if (this.isLoading.value) return

      console.log('[global-loader] - Saved global options (prev)!')
      this.setPrevOptions(this.options)

      console.log('[global-loader] - Set scoped options!')
      this.setOptions(scopedOptions)

      this.setIsLoading(true)
   }

   destroyLoader(onDestroyed?: () => void) {
      if (!this.isLoading.value) return

      console.log('[global-loader] - Destroying loader...')
      this.__onDestroyedCb = onDestroyed || noop
      this.setIsLoading(false)
   }

   onDestroyed() {
      console.log('[global-loader] - Loader destroyed, options restored!')
      this.__onDestroyedCb()
      this.setOptions(this.prevOptions)
   }
}

export function useStore() {
   return inject(injectionKey)!
}

export function useGlobalLoader(scopedOptions: Partial<GlobalLoaderOptions> = {}) {
   if (isSSR) {
      return {
         displayLoader: noop,
         destroyLoader: noop,
         updateOptions: noop,
         __onDestroyed: noop,
         options: readonly(DEFAULT_OPTIONS),
         isLoading: readonly(ref(false)),
      }
   }

   const store = inject(injectionKey)!

   return {
      /** Display the global loader with any scoped option set in `useGlobalLoader` parameter. */
      displayLoader: () => store.displayLoader(scopedOptions),
      /** Destroy any active loader and restore global loader options. */
      destroyLoader: (onDestroy?: () => void) => store.destroyLoader(onDestroy),
      /** Update the global loader default options. */
      updateOptions: (options: Partial<GlobalLoaderOptions>) => store.setOptions(options),
      /** @internal This method is used internally by the plugin and should not be used by the user. */
      __onDestroyed: () => store.onDestroyed(),
      /** Reactive read-only global loader options. */
      options: readonly(store.options),
      /** Reactive read-only global loader current state. */
      isLoading: readonly(store.isLoading),
   }
}
