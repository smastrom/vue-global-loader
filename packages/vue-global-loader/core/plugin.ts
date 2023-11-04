import type { App } from 'vue'
import type { GlobalLoaderOptions } from './types'

import { GlobalLoaderStore, injectionKey } from './store'

export const globalLoader = {
   install(app: App, options: Partial<GlobalLoaderOptions> = {}) {
      app.provide(injectionKey, new GlobalLoaderStore(options))
   },
}
