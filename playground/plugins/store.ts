type Spinner = keyof typeof pkgSpinners

export default defineNuxtPlugin(() => {
   const router = useRouter()
   const route = useRoute()

   let initialKey: Spinner = Object.keys(pkgSpinners)[0] as Spinner

   if ((route.query.spinner || '').toString() in pkgSpinners) {
      initialKey = route.query.spinner as Spinner
   }

   const activeSpinner = ref<Spinner>(initialKey)

   watch(activeSpinner, (key) => {
      if (key in pkgSpinners) router.replace({ query: { spinner: key } })
   })

   return {
      provide: {
         store: {
            activeSpinner,
         },
      },
   }
})
