<script>
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: true })
</script>

<template>
   <svg :class="m.Wrap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="11" y="1" width="2" height="5" opacity=".14" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
      <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
   </svg>
</template>

<style module="m">
.Wrap {
   width: 100px;
   fill: var(--v-gl-fg-color);
   transform-origin: center;
   animation: KF 0.75s step-end infinite;
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

@keyframes KF {
   8.3% {
      transform: rotate(30deg);
   }
   16.6% {
      transform: rotate(60deg);
   }
   25% {
      transform: rotate(90deg);
   }
   33.3% {
      transform: rotate(120deg);
   }
   41.6% {
      transform: rotate(150deg);
   }
   50% {
      transform: rotate(180deg);
   }
   58.3% {
      transform: rotate(210deg);
   }
   66.6% {
      transform: rotate(240deg);
   }
   75% {
      transform: rotate(270deg);
   }
   83.3% {
      transform: rotate(300deg);
   }
   91.6% {
      transform: rotate(330deg);
   }
   100% {
      transform: rotate(360deg);
   }
}

@media (prefers-reduced-motion: reduce) {
   .Wrap {
      animation: none;
   }
}
</style>
