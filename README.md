# Vue Global Loader

![npm](https://img.shields.io/npm/v/vue-global-loader?color=46c119) ![dependencies](https://img.shields.io/badge/dependencies-0-success) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/smastrom/vue-global-loader/tests.yml?branch=main&label=tests)

### Global loaders made easy for Vue and Nuxt.

[Live Demo](https://vue-global-loader.pages.dev/) — [Vite Example](https://stackblitz.com/edit/vitejs-vite-umqonc?file=src%2FApp.vue) — [Nuxt Example](https://stackblitz.com/edit/nuxt-starter-rpnobz?file=app.vue)

<br />

> :bulb: Please note that this package only works with [Vite](https://vitejs.dev/) and [Nuxt](https://nuxt.com/) setups. Usage without a build-step is not supported.

<br />

## Intro

I find it useful to display global loaders in single-page apps. For example:

- When redirecting to an external payment page
- When navigating to an internal page after a critical operation such as sign-in/sign-out
- When navigating to an internal page with plenty of data

Since I was re-creating the same logic and markup over and over again, I decided to publish a package for it.

## Features

This package simplifies the usage of a single, top-level global loader by:

- Installing a global store that sits above your routes, so you can control it between pages
- Providing a practical API customizable via few key props (get started in 10 seconds)
- Properly disable user interactions with the rest of the app while the loader is displayed
- Announcing a screen reader message when the loader is displayed
- Dynamically update options from anywhere in the app and apply options only to a specific loader

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
  - [Spinners](#spinners)
  - [Options](#options)
    - [Default Options](#default-options)
    - [Scoped Options](#scoped-options)
    - [Updating default options](#updating-default-options)
  - [Callbacks / Lifecycle](#callbacks--lifecycle)
- [API](#api)
- [Further Notes](#further-notes)
  - [When to use it](#when-to-use-it)
  - [When to not use it](#when-to-not-use-it)
- [SPA Loading Templates](#spa-loading-templates)

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

### Vite

> :bulb: See [↓ below](#nuxt) for **Nuxt**

**main.js**

```js
import { createApp } from 'vue'
import { globalLoader } from 'vue-global-loader'

import App from './App.vue'

const app = createApp(App)

app.use(globalLoader, {
  // Options
})

app.mount('#app')
```

**App.vue**

```vue
<script setup>
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
</script>

<template>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>

  <!-- RouterView -->
</template>
```

### Nuxt

**nuxt.config.ts**

```ts
export default defineNuxtConfig({
  modules: ['vue-global-loader/nuxt'],
  globalLoader: {
    // Options
  }
})
```

**app.vue**

```vue
<template>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>

  <!-- NuxtLayout, NuxtPage... -->
</template>
```

### Usage

`pages/login.vue`

> :bulb: No need to state the imports if using **Nuxt** (everything is auto-imported)

```vue
<script setup>
import { useRouter } from 'vue-router'
import { useGlobalLoader } from 'vue-global-loader'

const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage:
    'Signing-in, redirecting to the dashboard, please wait...'
})

const router = useRouter()

async function signIn() {
  try {
    displayLoader() // Display loader...
    await auth.signIn()
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    destroyLoader()
  }
}
</script>

<template>
  <button :disabled="isLoading" @click="signIn">Sign-in</button>
</template>
```

`pages/dashboard.vue`

> :bulb: No need to state the imports if using **Nuxt** (everything is auto-imported)

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'

const { destroyLoader } = useGlobalLoader()

const data = ref(null)

onMounted(async () => {
  try {
    data.value = await fetchDashboardData()
    destroyLoader() // ...destroy loader, UI is ready
  } catch (err) {
    console.error(err)
    // Handle error
  }
})
</script>

<template>
  <div v-if="data">
    <!-- ... -->
  </div>
</template>
```

## Customization

### Spinners

This package ships with 8 spinners that should cover most use cases:

|                                                     | Import                                                                |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| ![spinner](https://svgur.com/i/zKJ.svg)             | `import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'`     |
| ![ring-spinner](https://svgur.com/i/zJk.svg)        | `import RingSpinner from 'vue-global-loader/RingSpinner.vue'`         |
| ![ring-dot-spinner](https://svgur.com/i/zKc.svg)    | `import RingDotSpinner from 'vue-global-loader/RingDotSpinner.vue'`   |
| ![circle-bars-spinner](https://svgur.com/i/zHt.svg) | `import RingBarsSpinner from 'vue-global-loader/RingBarsSpinner.vue'` |
| ![pulse-spinner](https://svgur.com/i/zKK.svg)       | `import PulseSpinner from 'vue-global-loader/PulseSpinner.vue'`       |
| ![dots-spinner](https://svgur.com/i/zKf.svg)        | `import DotsSpinner from 'vue-global-loader/DotsSpinner.vue'`         |
| ![bars-spinner](https://svgur.com/i/zHu.svg)        | `import BarsSpinner from 'vue-global-loader/BarsSpinner.vue'`         |
| ![wave-spinner](https://svgur.com/i/zJ6.svg)        | `import WaveSpinner from 'vue-global-loader/WaveSpinner.vue'`         |

Import the one you prefer and pass it to the default slot:

> :bulb: No need to state the imports if using **Nuxt** (everything is auto-imported)

```vue
<script setup>
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import PulseSpinner from 'vue-global-loader/PulseSpinner.vue'
</script>

<template>
  <GlobalLoader>
    <PulseSpinner />
  </GlobalLoader>

  <!-- RouterView, NuxtLayout, NuxtPage... -->
</template>
```

Each spinner already has its own CSS and inherits the `foregroundColor` option specified in your config or scoped options.

If you think the spinner size is too big, add a class or inline styles to it and they'll be forwarded to the root `svg` element:

```vue
<template>
  <GlobalLoader>
    <PulseSpinner style="width: 60px" />
  </GlobalLoader>
</template>
```

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
  fill: var(--v-gl-fg-color); /* Value of the 'foregroundColor' prop */
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
| `transitionDuration`  | `number` | Enter/leave fade transition duration in ms. Set `0` to disable it. | `250`        |
| `foregroundColor`     | `string` | Color of the spinner.                                              | `#000`       |
| `backgroundColor`     | `string` | Background color of the loading screen.                            | `#fff`       |
| `backgroundOpacity`   | `number` | Background opacity of the loading screen.                          | `1`          |
| `backgroundBlur`      | `number` | Background blur of the loading screen.                             | `0`          |
| `zIndex`              | `number` | Z-index of the loading screen.                                     | `2147483647` |

#### Default Options

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

> :bulb: No need to state the imports if using **Nuxt** (everything is auto-imported)

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

### Callbacks / Transitions Lifecycle

The `GlobalLoader` lifecycle is handled using Vue's [Transition](https://vuejs.org/guide/built-ins/transition.html) hooks. For convenience, `displayLoader` and `destroyLoader` include some syntactic sugar to make it easier to execute code after the fade transition is completed.

#### `displayLoader`

This function returns a promise that resolves after the enter transition is completed or cancelled.

```ts
const { displayLoader } = useGlobalLoader()
const router = useRouter()

await displayLoader() // Wait for the fade transition to complete...
await signOut() // ...mutate the underlying UI
router.push('/') // ...navigate to the homepage and call 'destroyLoader' there
```

#### `destroyLoader`

This function doesn't return a promise but instead, it accepts a callback that is executed after the loader is destroyed.

```ts
const { destroyLoader } = useGlobalLoader()

destroyLoader(() => {
  console.log('Loader destroyed')
})
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
  displayLoader: () => Promise<void>
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

- To display a loader while your app JS is loading. Use the [SPA Loading Templates](#spa-loading-templates) in plain HTML for that (see below).
- Server-side rendered pages: they are already meant to send the proper content to the client and avoid spinners.
- Non-critical async operations that are quick and obvious, in such case a local loader is better (e.g. spinner in the newsletter form submit button).
- Async operations meant to feed the content of small sub-components, in such case [Suspense](https://vuejs.org/guide/built-ins/suspense.html) is preferred.

## SPA Loading Templates

For convenience, ready-made HTML templates for each spinner shipped with this package are available in [this folder](https://github.com/smastrom/vue-global-loader/tree/main/spa-loading-templates).

They can be used to display a global loader that has the same appearance of the one used in your app to be displayed while the app JS is loading.

### Vite

Copy/paste the file content markup as a direct child of the `body` in the `index.html` file and remove it in a top-level (App.vue) _onMounted_ hook via `document.getElementById('spa_loading_template').remove()`.

### Nuxt

Download the html file you prefer, rename it to `spa-loading-template.html` and place it in `@/app/spa-loading-template.html`.

## Thanks

[@n3r4zzurr0](https://github.com/n3r4zzurr0) for the awesome spinners.

## License

MIT
