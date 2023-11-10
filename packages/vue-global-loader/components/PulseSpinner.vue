<script>
import { defineComponent } from 'vue'

defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle :class="m.Inner" cx="12" cy="12" r="0" />
   </svg>
</template>

<style module="m">
.Wrap {
   width: 160px;
   fill: var(--v-gl-color);
}
.Inner {
   animation: KF 1.2s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite;
}

@keyframes KF {
   0% {
      r: 0;
      opacity: 1;
   }
   100% {
      r: 11px;
      opacity: 0;
   }
}
</style>
