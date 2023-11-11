<script setup lang="ts">
import { onMounted } from 'vue'
import { GlobalLoader, CircleSpinner } from 'vue-global-loader'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
   router.push('/')
})
</script>

<template>
   <GlobalLoader>
      <CircleSpinner />
   </GlobalLoader>

   <RouterView />
</template>
