import type { GlobalLoaderOptions } from './types'

import { reactive, readonly, ref, inject, type InjectionKey } from 'vue'
import { DEFAULT_OPTIONS } from './constants'
import { isSSR, noop } from './utils'

export const injectionKey = Symbol('') as InjectionKey<GlobalLoaderStore>

export class GlobalLoaderStore {
   options: GlobalLoaderOptions

   prevOptions: GlobalLoaderOptions = { ...DEFAULT_OPTIONS }
   isLoading = ref(false)

   onDestroyedCb = noop
   onDisplayedResolve = noop

   constructor(pluginConfig: Partial<GlobalLoaderOptions>) {
      this.options = reactive(Object.assign({ ...DEFAULT_OPTIONS }, pluginConfig))
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
      return new Promise<void>((resolve) => {
         if (this.isLoading.value) {
            resolve()
            return
         }

         this.setPrevOptions(this.options)
         console.log('[global-loader] - Saved global options (prev)!')

         this.setOptions(scopedOptions)
         console.log('[global-loader] - Set scoped options!')

         this.setIsLoading(true)

         this.onDisplayedResolve = resolve
      })
   }

   destroyLoader(extOnDestroyed?: () => void) {
      if (!this.isLoading.value) return

      console.log('[global-loader] - Destroying loader...')

      this.onDestroyedCb = typeof extOnDestroyed === 'function' ? extOnDestroyed : noop

      this.setIsLoading(false)
   }

   onDestroyed() {
      this.onDestroyedCb()
      this.setOptions(this.prevOptions)

      console.log('[global-loader] - Loader destroyed, options restored!')
   }
}

export function useGlobalLoader(scopedOptions: Partial<GlobalLoaderOptions> = {}) {
   if (isSSR) {
      return {
         displayLoader: () => Promise.resolve(),
         destroyLoader: noop,
         updateOptions: noop,
         __onDestroyed: noop,
         __onDisplayed: noop,
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
      /** @internal This method is used internally by the plugin and should not be used by the user. */
      __onDisplayed: () => store.onDisplayedResolve(),
      /** Reactive read-only global loader options. */
      options: readonly(store.options),
      /** Reactive read-only global loader current state. */
      isLoading: readonly(store.isLoading),
   }
}
