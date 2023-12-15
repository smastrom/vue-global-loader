<script>
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
         d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
         opacity=".25"
      />
      <circle :class="m.Inner" cx="12" cy="2.5" r="1.5" />
   </svg>
</template>

<style module="m">
.Wrap {
   width: 100px;
   fill: var(--v-gl-fg-color);
}

@media (max-width: 475px) {
   .Wrap {
      width: 80px;
   }
}

@media (max-width: 375px) {
   .Wrap {
      width: 70px;
   }
}

.Inner {
   transform-origin: center;
   animation: KF 0.75s linear infinite;
}

@keyframes KF {
   100% {
      transform: rotate(360deg);
   }
}

@media (prefers-reduced-motion: reduce) {
   .Inner {
      animation: none;
   }
}
</style>
