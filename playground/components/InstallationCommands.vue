<script setup lang="ts">
const commands = {
   npm: 'npm install vue-global-loader',
   yarn: 'yarn add vue-global-loader',
   pnpm: 'pnpm add vue-global-loader',
   bun: 'bun add vue-global-loader',
   ni: 'ni vue-global-loader',
}

const defaultLabel = 'Copy installation command'
const labelRef = ref(defaultLabel)

let copyTimeout = -1

function onCopy(text: string) {
   clearTimeout(copyTimeout)

   window.navigator.clipboard.writeText(text)
   labelRef.value = '✓ ' + text.split(' ')[0].toUpperCase() + ' command copied to clipboard!'

   copyTimeout = window.setTimeout(() => {
      labelRef.value = defaultLabel
   }, 1500)
}
</script>

<template>
   <section :class="m.Wrapper">
      <h3 aria-hidden="true">{{ labelRef }}</h3>
      <nav :aria-label="defaultLabel">
         <button
            v-for="(command, name) in commands"
            :key="name"
            type="button"
            @click="onCopy(command)"
         >
            {{ name }}
         </button>
      </nav>
   </section>
</template>

<style module="m">
.Wrapper {
   display: flex;
   flex-direction: column;

   & h3 {
      color: var(--dark-1);
      font-size: var(--size-1);
      margin-bottom: var(--size-07);
   }

   & nav {
      display: flex;
      flex-wrap: wrap;
      gap: var(--size-07);
   }

   & button {
      border-radius: var(--size-07);
      padding: var(--size-02) var(--size-05);
      text-transform: uppercase;
      border: 2px solid var(--dark-0);
      display: flex;
      color: var(--dark-0);
      flex-direction: column;
      font-weight: 700;
      background-color: var(--light-3);
      cursor: pointer;
      transition:
         background-color 150ms ease-out,
         color 150ms ease-out;

      @media (hover: hover) {
         &:hover {
            background-color: var(--dark-1);
            color: var(--light-1);
         }
      }
   }
}
</style>
