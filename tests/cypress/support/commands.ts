import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import { globalLoader, type GlobalLoaderOptions } from 'vue-global-loader'

declare global {
   namespace Cypress {
      interface Chainable {
         mountApp(
            app: any,
            config?: Partial<GlobalLoaderOptions>,
            routes?: RouteRecordRaw[]
         ): Chainable<any>
         getTransition(): Chainable<any>
         getRoot(): Chainable<any>
         checkCssVars(config: Omit<GlobalLoaderOptions, 'screenReaderMessage'>): Chainable<any>
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
   (app: any, config: Partial<GlobalLoaderOptions> = {}, routes = [defaultRoute]) => {
      const router = createRouter({
         history: createMemoryHistory(),
         routes,
      })

      return mount(app, {
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

Cypress.Commands.add('checkCssVars', { prevSubject: 'element' }, (subject, config) => {
   cy.wrap(subject)
      .should('have.attr', 'style')
      .and('include', '--v-gl-bg-color: ' + config.backgroundColor)
      .and('include', '--v-gl-bg-opacity: ' + config.backgroundOpacity)
      .and('include', '--v-gl-bg-blur: ' + config.backgroundBlur)
      .and('include', '--v-gl-color: ' + config.foregroundColor)
      .and('include', '--v-gl-t-dur: ' + config.transitionDuration)
})
