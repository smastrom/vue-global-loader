<script>
import GlobalLoaderImpl from './GlobalLoaderImpl.vue'
import GlobalLoaderClientOnly from './GlobalLoaderClientOnly.js'

// TODO: Consider if would be ok to forward attrs to the root

export default {
   components: { GlobalLoaderImpl, GlobalLoaderClientOnly },
}
</script>

<template>
   <GlobalLoaderClientOnly>
      <GlobalLoaderImpl>
         <slot />
      </GlobalLoaderImpl>
   </GlobalLoaderClientOnly>
</template>
