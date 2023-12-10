<script setup lang="ts">
const { activeSpinner } = useStore()

const { displayLoader } = useGlobalLoader()

const selectId = 'spinner_select'
</script>

<template>
   <form :class="m.Wrapper" @submit.prevent="displayLoader">
      <div :class="m.Select">
         <label :for="selectId">Spinner</label>
         <select :id="selectId" v-model="activeSpinner" aria-label="Spinner">
            <option v-for="(_, name) in pkgSpinners" :key="name">
               {{ name }}
            </option>
         </select>

         <ChevronIcon aria-hidden="true" />
      </div>

      <button :class="m.Submit">
         <span>Display Global Loader</span>
         <span>...then press ESC or refresh to close.</span>
      </button>
   </form>
</template>

<style module="m">
.Wrapper {
   display: flex;
   flex-direction: column;
   gap: var(--size-1);
}

.Select {
   --diff: var(--size-4);

   position: relative;
   width: 100%;
   padding: var(--size-05) var(--size-1);
   border-radius: var(--size-07);
   border: 2px solid var(--light-5);
   display: flex;
   flex-direction: column;
   background-color: var(--light-0);
   transition: border-color 150ms ease-out;

   @media (hover: hover) {
      &:hover {
         border-color: var(--dark-1);
      }
   }

   & label {
      font-size: var(--size-09);
      color: var(--dark-1);
      font-weight: 700;
      user-select: none;
      margin-bottom: calc(-1 * var(--diff));
      height: var(--diff);
      display: flex;
      align-items: center;
   }

   & select {
      margin: 0;
      padding: var(--diff) 0 0;
      color: var(--dark-0);
      font-size: var(--size-3);
      font-weight: 700;
      width: 100%;
      border: none;
      cursor: pointer;
      background-color: transparent;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
   }

   & svg {
      position: absolute;
      right: var(--size-1);
      width: 30px;
      height: 30px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      stroke: var(--dark-1);
   }

   @media (max-width: 475px) {
      & label {
         font-size: var(--size-08);
      }

      & select {
         font-size: var(--size-1);
      }
   }
}

.Submit {
   border-radius: var(--size-07);
   padding: var(--size-07) var(--size-1);
   border: 2px solid var(--dark-0);
   display: flex;
   flex-direction: column;
   font-weight: 700;
   background-color: var(--dark-1);
   color: var(--light-1);
   cursor: pointer;
   transition: background-color 150ms ease-out;
   text-align: center;
   align-items: center;

   @media (hover: hover) {
      &:hover {
         background-color: var(--dark-0);
      }
   }

   & span:first-of-type {
      font-size: var(--size-3);
      margin-bottom: var(--size-02);
   }

   @media (max-width: 475px) {
      padding: var(--size-05) var(--size-07);

      & span:first-of-type {
         font-size: var(--size-1);
      }
   }
}
</style>
