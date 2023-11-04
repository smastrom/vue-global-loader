import * as _nuxt_schema from '@nuxt/schema'

import { GlobalLoaderOptions } from 'vue-global-loader'

type ModuleOptions = GlobalLoaderOptions & {
   /**
    * Whether to create and inject the global loader store in the Vue app. Equivalent of calling
    * `app.use(globalLoader)` in the main.js of a non-Nuxt app.
    */
   addPlugin?: boolean
}

declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>

export { type ModuleOptions, _default as default }
