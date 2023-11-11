# Vue Global Loader

### Global loaders made easy for Vue and Nuxt.

[Live Demo](https://vue-global-loader.pages.dev/) — [Vite Example](https://stackblitz.com/edit/vitejs-vite-umqonc?file=src%2FApp.vue) — [Nuxt Example](https://stackblitz.com/edit/nuxt-starter-rpnobz?file=app.vue)

<br />

## Intro

I find it useful to display global loaders in single-page apps. For example:

- When redirecting to an external payment page
- When navigating to an internal page after a critical operation such as sign-in/sign-out
- When navigating to an internal page with plenty of data

Since I was creating and re-creating the same logic and markup over and over again, I decided to publish a package for it.

## Features

This package simplifies the usage of a single, top-level global loader by:

- Installing a global store that sits above your routes, so you can control it between pages
- Providing a practical API customizable via few key props (get started in 10 seconds)
- Properly disable user interactions with the rest of the app while the loader is displayed
- Announcing a screen reader message when the loader is displayed
- Dynamically update global options from anywhere in the Vue app and set scoped options for the current loader

## Installation

```bash
pnpm add vue-global-loader
```

```bash
yarn add vue-global-loader
```

```bash
npm i vue-global-loader
```

## Usage

> :bulb: No need to state the imports if using **Nuxt**.

**1. main.js (Single-page app with Vite, Webpack, etc)**

```js
import { createApp } from 'vue'
import { globalLoader } from 'vue-global-loader'

import App from './App.vue'

const app = createApp(App)

app.use(globalLoader)

// other app.use() calls...

app.mount('#app')
```

**1. or nuxt.config.ts (if using Nuxt)**

```ts
export default defineNuxtConfig({
  modules: ['vue-global-loader/nuxt']
})
```

**2. App.vue (Vite) / app.vue (Nuxt)**

> :bulb: No need to state the imports if using **Nuxt**.

```vue
<script setup>
import { GlobalLoader, RingSpinner } from 'vue-global-loader'
</script>

<template>
  <GlobalLoader>
    <RingSpinner />
  </GlobalLoader>

  <!-- RouterView, NuxtLayout, NuxtPage... -->
</template>
```

**Component.vue**

```vue
<script setup>
import { useGlobalLoader } from 'vue-global-loader'

const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage: 'Redirecting to payment page, please wait...'
})

async function createCheckout() {
  try {
    displayLoader()
    const { checkoutUrl } = await fetch('/api/create-checkout').then((res) =>
      res.json()
    )
    window.location.href = checkoutUrl
    // No need to call destroyLoader() on success, state is lost when leaving the page
  } catch (err) {
    console.error(err)
    destroyLoader(() => {
      // Logged when the loader is removed from the DOM
      console.log('Loader destroyed')
    })
  }
}
</script>

<template>
  <button :disabled="isLoading" @click="createCheckout">Go to Payment</button>
</template>
```

<details><summary><strong>Options API</strong></summary>

```vue
<script>
import { useGlobalLoader } from 'vue-global-loader'

export default {
  setup() {
    const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
      screenReaderMessage: 'Redirecting to payment page, please wait...'
    })

    return { displayLoader, destroyLoader, isLoading }
  },
  methods: {
    async createCheckout() {
      try {
        this.displayLoader()
        const { checkoutUrl } = await fetch('/api/create-checkout').then(
          (res) => res.json()
        )
        window.location.href = checkoutUrl
      } catch (err) {
        console.error(err)
        this.destroyLoader()
      }
    }
  }
}
</script>

<template>
  <button :disabled="isLoading" @click="createCheckout">Go to Payment</button>
</template>
```

</details>

## Customization

### Spinners

This package ships with 8 spinners that should cover most use cases:

|                                                     | Import                                                |
| --------------------------------------------------- | ----------------------------------------------------- |
| ![spinner](https://svgur.com/i/zKJ.svg)             | `import { Spinner } from 'vue-global-loader'`         |
| ![ring-spinner](https://svgur.com/i/zJk.svg)        | `import { RingSpinner } from 'vue-global-loader'`     |
| ![ring-dot-spinner](https://svgur.com/i/zKc.svg)    | `import { RingDotSpinner } from 'vue-global-loader'`  |
| ![circle-bars-spinner](https://svgur.com/i/zHt.svg) | `import { RingBarsSpinner } from 'vue-global-loader'` |
| ![pulse-spinner](https://svgur.com/i/zKK.svg)       | `import { PulseSpinner } from 'vue-global-loader'`    |
| ![dots-spinner](https://svgur.com/i/zKf.svg)        | `import { DotsSpinner } from 'vue-global-loader'`     |
| ![bars-spinner](https://svgur.com/i/zHu.svg)        | `import { BarsSpinner } from 'vue-global-loader'`     |
| ![wave-spinner](https://svgur.com/i/zJ6.svg)        | `import { WaveSpinner } from 'vue-global-loader'`     |

Import the one you prefer and pass it to the default slot:

> :bulb: No need to state the imports if using Nuxt.

```vue
<script setup>
import { GlobalLoader, PulseSpinner } from 'vue-global-loader'
</script>

<template>
  <GlobalLoader>
    <PulseSpinner />
  </GlobalLoader>

  <!-- RouterView, NuxtLayout, NuxtPage... -->
</template>
```

There's no need to style the spinners (e.g. the spinner should be 300px wide on desktop, 160px wide on low-res mobile devices, etc). This is already taken care for you.

Each spinner already has its own CSS and inherits the `foreground` option specified in your config. You can append a class to override its styles, but it's not recommended and it's better to use a custom spinner.

#### Custom Spinners

To use your own spinner, pass a custom SVG (or whatever) to the default slot:

```vue
<template>
  <GlobalLoader>
    <svg
      class="MySpinner"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Inner markup -->
    </svg>
  </GlobalLoader>

  <!-- RouterView, NuxtLayout, NuxtPage... -->
</template>

<style>
.MySpinner {
  fill: var(--v-gl-fg-color); /* Value of the 'foreground' prop */
  width: 100px;
  height: 100px;

  @media (min-width: 768px) {
    width: 160px;
    height: 100px;
  }
}
</style>
```

### Options

| Prop                  | Type     | Description                                                        | Default      |
| --------------------- | -------- | ------------------------------------------------------------------ | ------------ |
| `screenReaderMessage` | `string` | Message to announce when displaying the loader.                    | `Loading`    |
| `transitionDuration`  | `number` | Enter/leave fade transition duration in ms. Set `0` to disable it. | `300`        |
| `foregroundColor`     | `string` | Color of the spinner.                                              | `#000`       |
| `backgroundColor`     | `string` | Background color of the loading screen.                            | `#fff`       |
| `backgroundOpacity`   | `number` | Background opacity of the loading screen.                          | `1`          |
| `backgroundBlur`      | `number` | Background blur of the loading screen.                             | `0`          |
| `zIndex`              | `number` | Z-index of the loading screen.                                     | `2147483647` |

#### Plugin Options (Default

To customize defaults, pass the options to the `globalLoader` plugin (if using Vite):

**main.js**

```js
app.use(globalLoader, {
  background: '#000',
  foreground: '#fff',
  screenReaderMessage: 'Loading, please wait...'
})
```

Or to the `globalLoader` config key (if using Nuxt):

**nuxt.config.ts**

```ts
export default defineNuxtConfig({
  modules: ['vue-global-loader/nuxt']
  globalLoader: {
    background: '#000',
    foreground: '#fff',
    screenReaderMessage: 'Loading, please wait...'
  }
})
```

#### Scoped Options

You can define options for a specific loader via `useGlobalLoader` options, only the loader triggered here (when calling `displayLoader`) will have a different `backgroundOpacity` and `screenReaderMessage`):

```ts
const { displayLoader, destroyLoader } = useGlobalLoader({
  backgroundOpacity: 0.5,
  screenReaderMessage: 'Redirecting to payment page, please wait...'
})
```

#### Updating default options

For convenience, you can set new defaults from anywhere in your Vue app using `updateOptions`:

```vue
<script setup>
import { watch } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'
import { useStore } from '@/stores/my-store'
import messages from '@/locales/messages.json'

const store = useStore()

const { updateOptions } = useGlobalLoader()

// Kept in sync with an hypotetical store
watch(
  () => store.locale,
  (newLocale) => {
    updateOptions({
      screenReaderMessage: messages[newLocale].loading
    })
  },
  { immediate: true }
)
</script>
```

## API

```ts
interface GlobalLoaderOptions {
  screenReaderMessage: string
  transitionDuration: number
  foregroundColor: string
  backgroundColor: string
  backgroundOpacity: number
  backgroundBlur: number
  zIndex: number
}

declare function useGlobalLoader(
  scopedOptions?: Partial<GlobalLoaderOptions>
): {
  displayLoader: () => void
  destroyLoader: (onDestroyed?: () => void) => void
  updateOptions: (newOptions: Partial<GlobalLoaderOptions>) => void
  options: Readonly<Reactive<GlobalLoaderOptions>>
  isLoading: Readonly<Ref<boolean>>
}
```

## Further Notes

### When to use it

Use it when you think it's better for the user to not interact with the rest of the app or to not see what's happening in the UI while an expensive async operation **initiated by the user** is taking place.

### When to not use it

- Server-side rendered pages: they are already meant to send the proper content to the client and avoid spinners.
- Non-critical async operations that are quick and obvious, in such case a local loader is better (e.g. spinner in the newsletter form submit button).
- Async operations meant to feed the content of small sub-components, in such case [Suspense](https://vuejs.org/guide/built-ins/suspense.html) is the way to go.
- To display a loader while your app JS is loading. In this case:
  - **Vite SPA** - Add the loader markup directly to the `index.html` file (e.g. `<div id="spa-loader">`) and remove it in a top-level (App.vue) _onMounted_ hook via `document.getElementById('spa-loader').remove()`.
  - **Nuxt** - Use the built-in [SPA loading indicator](https://nuxt.com/blog/v3-6#spa-loading-indicator).

## Thanks

[@n3r4zzurr0](https://github.com/n3r4zzurr0) for the awesome spinners.

## License

MIT Licensed - Simone Mastromattei © 2023
