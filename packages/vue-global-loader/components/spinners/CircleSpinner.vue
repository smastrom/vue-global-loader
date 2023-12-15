<script>
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle :class="m.Inner" cx="12" cy="12" r="9.5" fill="none" stroke-width="3" />
   </svg>
</template>

<style module="m">
.Wrap {
   width: 100px;
   stroke: var(--v-gl-fg-color);
   transform-origin: center;
   animation: KF 2s linear infinite;
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
   stroke-linecap: round;
   animation: KF_Inner 1.5s ease-in-out infinite;
}

@keyframes KF {
   100% {
      transform: rotate(360deg);
   }
}

@keyframes KF_Inner {
   0% {
      stroke-dasharray: 0 150;
      stroke-dashoffset: 0;
   }
   47.5% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -16;
   }
   95%,
   100% {
      stroke-dasharray: 42 150;
      stroke-dashoffset: -59;
   }
}

@media (prefers-reduced-motion: reduce) {
   .Wrap {
      animation: none;
   }
   .Inner {
      animation: none;
   }
}
</style>
