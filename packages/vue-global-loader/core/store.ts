import type { GlobalLoaderOptions } from './types'

import { reactive, readonly, ref, inject, nextTick, type InjectionKey } from 'vue'
import { DEFAULT_OPTIONS } from './constants'
import { isSSR, noop } from './utils'

export const injectionKey = Symbol('') as InjectionKey<GlobalLoaderStore>

export class GlobalLoaderStore {
   defaults: GlobalLoaderOptions

   prevOptions: GlobalLoaderOptions = { ...DEFAULT_OPTIONS }
   options: GlobalLoaderOptions = reactive(DEFAULT_OPTIONS)
   isLoading = ref(false)

   constructor(config: Partial<GlobalLoaderOptions>) {
      this.defaults = Object.assign({ ...DEFAULT_OPTIONS }, config)
   }

   updateOptions(newOptions: Partial<GlobalLoaderOptions>) {
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
      this.updateOptions(scopedOptions)

      nextTick(() => {
         this.setIsLoading(true)
      })
   }

   destroyLoader() {
      if (!this.isLoading.value) return

      console.log('[global-loader] - Removing loader...')
      this.setIsLoading(false)
   }

   restoreOptions() {
      nextTick(() => {
         console.log('[global-loader] - Options restored!')
         this.updateOptions(this.prevOptions)
      })
   }
}

export function useGlobalLoader(scopedOptions: Partial<GlobalLoaderOptions> = {}) {
   if (isSSR) {
      return {
         displayLoader: noop,
         destroyLoader: noop,
         updateOptions: noop,
         __restoreOptions: noop,
         options: readonly(DEFAULT_OPTIONS),
         isLoading: readonly(ref(false)),
      }
   }

   const store = inject(injectionKey)!

   return {
      /** Display the global loader with any scoped option set in `useGlobalLoader` parameter. */
      displayLoader: () => store.displayLoader(scopedOptions),
      /** Destroy any active loader and restore global loader options. */
      destroyLoader: () => store.destroyLoader(),
      /** Update the global loader default options. */
      updateOptions: (options: Partial<GlobalLoaderOptions>) => store.updateOptions(options),
      /** @internal This method is used internally by the plugin and should not be used by the user. */
      __restoreOptions: () => store.restoreOptions(),
      /** Reactive read-only global loader options. */
      options: readonly(store.options),
      /** Reactive read-only global loader current state. */
      isLoading: readonly(store.isLoading),
   }
}
