<script>
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle :class="m.Anim_1" cx="4" cy="12" r="3" />
      <circle :class="[m.Anim_1, m.Anim_2]" cx="12" cy="12" r="3" />
      <circle :class="[m.Anim_1, m.Anim_3]" cx="20" cy="12" r="3" />
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
.Anim_1 {
   animation: KF 1.2s linear infinite;
}
.Anim_2 {
   animation-delay: -0.65s;
}
.Anim_3 {
   animation-delay: -0.5s;
}
@keyframes KF {
   93.75%,
   100% {
      r: 3px;
   }
   46.875% {
      r: 0.2px;
   }
}

@media (prefers-reduced-motion: reduce) {
   .Anim_1 {
      animation: none;
   }
   .Anim_2 {
      animation: none;
   }
   .Anim_3 {
      animation: none;
   }
}
</style>
