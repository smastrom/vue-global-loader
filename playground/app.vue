<script setup lang="ts">
import { useGlobalLoader } from 'vue-global-loader'

const { displayLoader, destroyLoader, isLoading, options } = useGlobalLoader()

onMounted(() => {
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') destroyLoader()
      if (e.key === 'l') displayLoader()
   })
})

watchEffect(() => {
   console.table(toRaw(options))
   console.log('isLoading', isLoading.value)
})
</script>

<template>
   <button @click="displayLoader">Display Loader</button>
</template>
