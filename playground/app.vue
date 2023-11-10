<script setup lang="ts">
const { displayLoader, destroyLoader, isLoading, options } = useGlobalLoader()

const { activeSpinner } = useStore()

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
   if (import.meta.env.DEV) {
      console.table({
         activeSpinner: activeSpinner.value,
         isLoading: isLoading.value,
         ...toRaw(options),
      })
   }
})
</script>

<template>
   <View />

   <LazyGlobalLoader>
      <Component :is="pkgSpinners[activeSpinner]" />
   </LazyGlobalLoader>
</template>
