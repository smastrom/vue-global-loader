import { ModuleOptions } from './module'

interface ModuleField {
   ['globalLoader']?: ModuleOptions
}

declare module '@nuxt/schema' {
   interface NuxtConfig extends ModuleField {}
   interface NuxtOptions extends ModuleField {}
   interface PublicRuntimeConfig extends ModuleField {}
}

declare module 'nuxt/schema' {
   interface NuxtConfig extends ModuleField {}
   interface NuxtOptions extends ModuleField {}
   interface PublicRuntimeConfig extends ModuleField {}
}

export { ModuleOptions, default } from './module'
