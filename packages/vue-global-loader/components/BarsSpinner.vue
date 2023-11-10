<script>
import { defineComponent } from 'vue'

defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect :class="m.Anim_1" x="1" y="1" width="6" height="22" />
      <rect :class="[m.Anim_1, m.Anim_2]" x="9" y="1" width="6" height="22" />
      <rect :class="[m.Anim_1, m.Anim_3]" x="17" y="1" width="6" height="22" />
   </svg>
</template>

<style module="m">
.Wrap {
   width: 160px;
   fill: var(--v-gl-color);
}
.Anim_1 {
   animation: KF 0.8s linear infinite;
   animation-delay: -0.8s;
}
.Anim_2 {
   animation-delay: -0.65s;
}
.Anim_3 {
   animation-delay: -0.5s;
}
@keyframes KF {
   0% {
      y: 1px;
      height: 22px;
   }
   93.75% {
      y: 5px;
      height: 14px;
      opacity: 0.2;
   }
}
</style>
