<script>
import GlobalLoaderImpl from './GlobalLoaderImpl.vue'
import GlobalLoaderClientOnly from './GlobalLoaderClientOnly.js'

export default {
   components: { GlobalLoaderImpl, GlobalLoaderClientOnly },
}
</script>

<template>
   <GlobalLoaderClientOnly>
      <GlobalLoaderImpl :__attrs="$attrs">
         <slot />
      </GlobalLoaderImpl>
   </GlobalLoaderClientOnly>
</template>
