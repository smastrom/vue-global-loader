import { ModuleOptions } from './module'

interface GlobalLoaderNuxtOptions {
   ['globalLoader']?: ModuleOptions
}

declare module '@nuxt/schema' {
   interface NuxtConfig extends GlobalLoaderNuxtOptions {}
   interface NuxtOptions extends GlobalLoaderNuxtOptions {}
}

declare module 'nuxt/schema' {
   interface NuxtConfig extends GlobalLoaderNuxtOptions {}
   interface NuxtOptions extends GlobalLoaderNuxtOptions {}
}

export { ModuleOptions, default } from './module'
