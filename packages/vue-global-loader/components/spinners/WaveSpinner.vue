<script>
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect :class="m.Anim_1" x="1" y="1" width="7.33" height="7.33" />
      <rect :class="m.Anim_2" x="8.33" y="1" width="7.33" height="7.33" />
      <rect :class="m.Anim_3" x="1" y="8.33" width="7.33" height="7.33" />
      <rect :class="m.Anim_4" x="15.66" y="1" width="7.33" height="7.33" />
      <rect :class="m.Anim_5" x="8.33" y="8.33" width="7.33" height="7.33" />
      <rect :class="m.Anim_6" x="1" y="15.66" width="7.33" height="7.33" />
      <rect :class="m.Anim_7" x="15.66" y="8.33" width="7.33" height="7.33" />
      <rect :class="m.Anim_8" x="8.33" y="15.66" width="7.33" height="7.33" />
      <rect :class="m.Anim_9" x="15.66" y="15.66" width="7.33" height="7.33" />
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
   animation:
      KF_Root 1.2s linear infinite,
      KF_1 1.2s linear infinite;
}
.Anim_2 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_2 1.2s linear infinite;
   animation-delay: 0.1s;
}
.Anim_3 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_3 1.2s linear infinite;
   animation-delay: 0.1s;
}
.Anim_4 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_4 1.2s linear infinite;
   animation-delay: 0.2s;
}
.Anim_5 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_5 1.2s linear infinite;
   animation-delay: 0.2s;
}
.Anim_6 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_6 1.2s linear infinite;
   animation-delay: 0.2s;
}
.Anim_7 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_7 1.2s linear infinite;
   animation-delay: 0.3s;
}
.Anim_8 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_8 1.2s linear infinite;
   animation-delay: 0.3s;
}
.Anim_9 {
   animation:
      KF_Root 1.2s linear infinite,
      KF_9 1.2s linear infinite;
   animation-delay: 0.4s;
}

@keyframes KF_Root {
   0%,
   50% {
      width: 7.33px;
      height: 7.33px;
   }
   25% {
      width: 1.33px;
      height: 1.33px;
   }
}
@keyframes KF_1 {
   0%,
   50% {
      x: 1px;
      y: 1px;
   }
   25% {
      x: 4px;
      y: 4px;
   }
}
@keyframes KF_2 {
   0%,
   50% {
      x: 8.33px;
      y: 1px;
   }
   25% {
      x: 11.33px;
      y: 4px;
   }
}
@keyframes KF_3 {
   0%,
   50% {
      x: 1px;
      y: 8.33px;
   }
   25% {
      x: 4px;
      y: 11.33px;
   }
}
@keyframes KF_4 {
   0%,
   50% {
      x: 15.66px;
      y: 1px;
   }
   25% {
      x: 18.66px;
      y: 4px;
   }
}
@keyframes KF_5 {
   0%,
   50% {
      x: 8.33px;
      y: 8.33px;
   }
   25% {
      x: 11.33px;
      y: 11.33px;
   }
}
@keyframes KF_6 {
   0%,
   50% {
      x: 1px;
      y: 15.66px;
   }
   25% {
      x: 4px;
      y: 18.66px;
   }
}
@keyframes KF_7 {
   0%,
   50% {
      x: 15.66px;
      y: 8.33px;
   }
   25% {
      x: 18.66px;
      y: 11.33px;
   }
}
@keyframes KF_8 {
   0%,
   50% {
      x: 8.33px;
      y: 15.66px;
   }
   25% {
      x: 11.33px;
      y: 18.66px;
   }
}
@keyframes KF_9 {
   0%,
   50% {
      x: 15.66px;
      y: 15.66px;
   }
   25% {
      x: 18.66px;
      y: 18.66px;
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
   .Anim_4 {
      animation: none;
   }
   .Anim_5 {
      animation: none;
   }
   .Anim_6 {
      animation: none;
   }
   .Anim_7 {
      animation: none;
   }
   .Anim_8 {
      animation: none;
   }
   .Anim_9 {
      animation: none;
   }
}
</style>
