import { createElementBlock, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
   name: 'GlobalLoaderClientOnly',
   setup(_, { slots, attrs }) {
      const isMounted = ref(false)

      onMounted(() => (isMounted.value = true))

      return () => {
         if (isMounted.value) return slots.default?.()

         return createElementBlock('span', attrs, '')
      }
   },
})
