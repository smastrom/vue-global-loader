import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import App from '@/App.vue'

import { globalLoader, type GlobalLoaderOptions } from 'vue-global-loader'

declare global {
   namespace Cypress {
      interface Chainable {
         mountApp(config: Partial<GlobalLoaderOptions>, routes: RouteRecordRaw[]): Chainable<any>
         getTransition(): Chainable<any>
         getRoot(): Chainable<any>
      }
   }
}

const defaultRoute = {
   path: '/',
   name: 'Home',
   component: {
      template: '<h1>Home</h1>',
   },
}

Cypress.Commands.add(
   'mountApp',
   (config: Partial<GlobalLoaderOptions> = {}, routes = [defaultRoute]) => {
      const router = createRouter({
         history: createMemoryHistory(),
         routes,
      })

      return mount(App, {
         global: {
            plugins: [
               {
                  install(app) {
                     app.use(globalLoader, config)
                     app.use(router)
                  },
               },
            ],
         },
      })
   }
)

Cypress.Commands.add('getTransition', () => cy.get('transition-stub'))
Cypress.Commands.add('getRoot', () => cy.getTransition().children())
