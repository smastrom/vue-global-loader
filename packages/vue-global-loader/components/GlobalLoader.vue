<script>
import GlobalLoaderImpl from './GlobalLoaderImpl.vue'
import ClientOnly from './ClientOnly'

// TODO: Consider if would be ok to forward attrs to the root

export default {
   components: { GlobalLoaderImpl, ClientOnly },
}
</script>

<template>
   <ClientOnly>
      <GlobalLoaderImpl>
         <slot />
      </GlobalLoaderImpl>
   </ClientOnly>
</template>
