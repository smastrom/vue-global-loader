<script setup lang="ts">
import type { GlobalLoaderOptions } from 'vue-global-loader'

const { displayLoader, destroyLoader, isLoading, options } = useGlobalLoader()

function onKeyDown(e: KeyboardEvent) {
   if (e.key === 'Escape') destroyLoader()
   if (e.key === 'l') displayLoader()
}

onMounted(() => {
   document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
   document.removeEventListener('keydown', onKeyDown)
})

watchEffect(() => {
   console.table({ isLoading: isLoading.value, ...toRaw(options) })
})
</script>

<template>
   <button @click="displayLoader">Display Loader</button>

   <LazyGlobalLoader>
      <PulseSpinner />
   </LazyGlobalLoader>
</template>
