<script>
import {
   defineComponent,
   ref,
   computed,
   reactive,
   nextTick,
   useCssModule,
   onBeforeUnmount,
} from 'vue'
import { useGlobalLoader } from 'vue-global-loader'

export default defineComponent({
   props: {
      __attrs: Object,
   },
   setup() {
      const m = useCssModule('m')

      const { isLoading, options, __onDisplayed, __onDestroyed } = useGlobalLoader()

      /** @type {import('vue').Ref<HTMLElement | null>} */
      const rootRef = ref(null)

      const prev = reactive({
         /** @type {Element | HTMLElement | null} */
         activeEl: null,
         overflow: '',
         pointerEvts: '',
      })

      /** @type {import('vue').ComputedRef<import('vue-global-loader').GlobalLoaderCSSVars>} */
      const style = computed(() => ({
         '--v-gl-fg-color': options.foregroundColor,
         '--v-gl-bg-color': options.backgroundColor,
         '--v-gl-bg-opacity': options.backgroundOpacity,
         '--v-gl-bg-blur': options.backgroundBlur + 'px',
         '--v-gl-t-dur': options.transitionDuration + 'ms',
         '--v-gl-z': options.zIndex,
      }))

      /** @type {import('vue').ComputedRef<import('vue').TransitionProps>} */
      const transitionStyles = computed(() => {
         if (options.transitionDuration > 0) {
            return {
               enterActiveClass: m['Fade-enter-active'],
               leaveActiveClass: m['Fade-leave-active'],
               enterFromClass: m['Fade-enter-from'],
               leaveToClass: m['Fade-leave-to'],
            }
         }

         return { name: '' }
      })

      /**
       * @param {Element | null} el - The element.
       * @param {'focus' | 'blur'} method - The method to invoke.
       */
      function invokeEvent(el, method) {
         if (el instanceof HTMLElement) el[method]()
      }

      // Both functions are called whether Transition is enabled or not (and also when canceled)

      function onEnter() {
         const { body, documentElement: html } = document
         if (!html || !body || !rootRef.value) return

         prev.activeEl = document.activeElement

         // Better than aria-busy: https://www.tpgi.com/short-note-on-being-busy/
         body.ariaHidden = 'true'

         // Check if some styles are applied so we can restore previous values
         if (html.hasAttribute('style') && html.style.overflow) {
            prev.overflow = html.style.overflow
         }

         if (body.hasAttribute('style') && body.style.pointerEvents) {
            prev.pointerEvts = body.style.pointerEvents
         }

         html.style.overflow = 'hidden'
         body.style.pointerEvents = 'none'

         invokeEvent(prev.activeEl, 'blur')
      }

      function onAfterEnter() {
         __onDisplayed()
         invokeEvent(rootRef.value, 'focus')
      }

      function onEnterCancelled() {
         __onDisplayed()
         onAfterLeave()
      }

      function onAfterLeave() {
         __onDestroyed()

         const { body, documentElement: html } = document
         if (!html || !body) return

         body.removeAttribute('aria-hidden')

         if (prev.overflow) {
            html.style.overflow = prev.overflow
            prev.overflow = ''
         } else {
            html.removeAttribute('style')
         }

         if (prev.pointerEvts) {
            body.style.pointerEvents = prev.pointerEvts
            prev.pointerEvts = ''
         } else {
            body.removeAttribute('style')
         }

         // Page could have changed and element been removed
         nextTick(() => {
            if (html.contains(prev.activeEl)) invokeEvent(prev.activeEl, 'focus')
         })
      }

      onBeforeUnmount(onAfterLeave)

      return {
         transitionStyles,
         isLoading,
         options,
         rootRef,
         style,
         onEnter,
         onAfterLeave,
         onAfterEnter,
         onEnterCancelled,
      }
   },
})
</script>

<template>
   <Teleport to="html">
      <Transition
         ref="rootRef"
         v-bind="transitionStyles"
         @enter="onEnter"
         @afterEnter="onAfterEnter"
         @afterLeave="onAfterLeave"
         @enterCancelled="onEnterCancelled"
         @leaveCancelled="onAfterLeave"
      >
         <div v-bind="$props.__attrs" :class="m.Bg" v-if="isLoading" :style="style" tabindex="0">
            <slot />

            <div :class="m.Bg_Overlay" />
            <div :class="m.SR" aria-live="assertive" role="alert">
               {{ options.screenReaderMessage }}
            </div>
         </div>
      </Transition>
   </Teleport>
</template>

<style module="m">
.Bg {
   inset: 0;
   position: fixed;
   height: 100vh;
   height: 100svh;
   z-index: var(--v-gl-z);
   display: flex;
   justify-content: center;
   align-items: center;
   backdrop-filter: blur(var(--v-gl-bg-blur));
   pointer-events: all;
}

.Bg_Overlay {
   width: 100%;
   height: 100%;
   position: absolute;
   inset: 0;
   z-index: -1;
   background-color: var(--v-gl-bg-color);
   opacity: var(--v-gl-bg-opacity);
   pointer-events: none;
}

.SR {
   clip: rect(0 0 0 0);
   clip-path: inset(50%);
   height: 1px;
   overflow: hidden;
   position: absolute;
   white-space: nowrap;
   width: 1px;
}

.Fade-enter-active,
.Fade-leave-active {
   transition: opacity var(--v-gl-t-dur) cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.Fade-enter-from,
.Fade-leave-to {
   opacity: 0;
}
</style>
