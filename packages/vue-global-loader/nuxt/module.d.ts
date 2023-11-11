import * as _nuxt_schema from '@nuxt/schema'

// Somehow types if imported from the package are not recognized so they must be hardcoded. TODO: investigate
interface ModuleOptions {
   /**
    * Whether to create and inject the global loader store in the Vue app. Equivalent of calling
    * `app.use(globalLoader)` in the main.js of a non-Nuxt app.
    */
   addPlugin: boolean
   screenReaderMessage: string
   transitionDuration: number
   foregroundColor: string
   backgroundColor: string
   backgroundOpacity: number
   backgroundBlur: number
   zIndex: number
}

declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>

export { ModuleOptions, _default as default }
