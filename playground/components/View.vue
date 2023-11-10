<template>
   <div :class="m.Wrapper">
      <!-- Header -->
      <header :class="m.Header">
         <h1>vue-global-loader</h1>
         <p>Global loaders made easy for Vue and Nuxt.</p>
      </header>

      <!-- Content -->
      <main>
         <SpinnerSelect />
         <div :class="m.Divider" />
         <InstallationCommands />
         <div :class="m.Divider" />
      </main>

      <!-- Footer -->
      <footer :class="m.Footer">
         <small>Made by <a target="_blank" href="https://github.com/smastrom">@smastrom</a></small>
         <small>
            View on
            <a target="_blank" href="https://github.com/smastrom/vue-global-loader"> GitHub </a>
         </small>
      </footer>
   </div>
</template>

<style module="m">
.Wrapper {
   border-radius: var(--size-4);
   background-color: var(--light-1);
   padding: var(--size-8);
   display: flex;
   flex-direction: column;
   max-width: 500px;
   border: 2px solid #9a8a6e5c;
   box-shadow: 0px 0px var(--size-4) #dad4bf;

   @media (max-width: 475px) {
      padding: var(--size-4);
      border-radius: var(--size-1);
      margin: var(--size-1);
   }

   @media (max-width: 375px) {
      padding: var(--size-1);
   }
}
.Header {
   display: flex;
   flex-direction: column;
   gap: var(--size-05);
   font-weight: 700;
   margin-bottom: var(--size-6);

   & h1 {
      margin-top: -0.25em;
      color: var(--dark-0);
      font-size: var(--size-7);
   }

   & p {
      color: var(--dark-1);
      font-size: var(--size-2);
   }

   @media (max-width: 475px) {
      margin-bottom: var(--size-4);

      & h1 {
         font-size: var(--size-4);
      }

      & p {
         font-size: var(--size-1);
      }
   }
}

.Divider {
   border-bottom: 1px solid var(--light-5);
   margin: var(--size-4) 0;

   @media (max-width: 475px) {
      margin: var(--size-2) 0;
   }
}

.Footer {
   display: flex;
   gap: var(--size-1);
   width: 100%;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   font-size: var(--size-1);
   color: var(--dark-1);
   font-weight: 700;

   & a {
      color: var(--dark-0);
      text-decoration: none;

      &:hover {
         text-decoration: underline;
      }
   }
}
</style>
