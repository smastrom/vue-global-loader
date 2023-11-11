import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import tinycolor from 'tinycolor2'

import { globalLoader, type GlobalLoaderOptions } from 'vue-global-loader'

declare global {
   namespace Cypress {
      interface Chainable {
         mountApp(
            app: any,
            config?: Partial<GlobalLoaderOptions>,
            routes?: RouteRecordRaw[]
         ): Chainable<any>
         getRoot(): Chainable<any>
         checkCssVars(config: Omit<GlobalLoaderOptions, 'screenReaderMessage'>): Chainable<any>
         checkComputedStyles(
            config: Omit<GlobalLoaderOptions, 'screenReaderMessage'>
         ): Chainable<any>
         checkDomAttrs(state: 'displayed' | 'destroyed'): Chainable<any>
         triggerAppEvent(eventName: string): Chainable<any>
      }
   }
}

Cypress.Commands.add(
   'mountApp',
   (app: any, config: Partial<GlobalLoaderOptions> = {}, routes = []) => {
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
            stubs: {
               // https://github.com/vuejs/vue-test-utils/issues/890
               transition: false,
            },
         },
      })
   }
)

Cypress.Commands.add('getRoot', () => cy.get('[data-cy-loader]'))

Cypress.Commands.add('checkCssVars', { prevSubject: 'element' }, (subject, config) => {
   cy.wrap(subject)
      .should('have.attr', 'style')
      .and('include', '--v-gl-bg-color: ' + config.backgroundColor)
      .and('include', '--v-gl-bg-opacity: ' + config.backgroundOpacity)
      .and('include', '--v-gl-bg-blur: ' + config.backgroundBlur)
      .and('include', '--v-gl-fg-color: ' + config.foregroundColor)
      .and('include', '--v-gl-t-dur: ' + config.transitionDuration)
      .and('include', '--v-gl-z: ' + config.zIndex)

   return cy.wrap(subject)
})

Cypress.Commands.add('checkComputedStyles', { prevSubject: 'element' }, (subject, config) => {
   let shouldPass = false

   cy.wrap(subject)
      .should('have.css', 'backdropFilter', `blur(${config.backgroundBlur}px)`)
      .and('have.css', 'zIndex', config.zIndex.toString())
      .within(() => {
         cy.get('svg')
            .invoke('css', ['stroke', 'fill'])
            .then(({ stroke, fill }) => {
               const configColor = tinycolor(config.foregroundColor)

               const cssFill = tinycolor(fill as unknown as string)
               const cssStroke = tinycolor(stroke as unknown as string)

               // Maybe there's a more coincise way to do this?
               shouldPass =
                  tinycolor.equals(configColor, cssFill) || tinycolor.equals(cssStroke, configColor)

               if (!shouldPass) throw new Error('Computed SVG styles do not match')
            })

         cy.get('div:not([aria-live])')
            .should('have.css', 'opacity', config.backgroundOpacity.toString())
            .invoke('css', 'backgroundColor')
            .then((backgroundColor) => {
               const configColor = tinycolor(config.backgroundColor)
               const cssColor = tinycolor(backgroundColor as unknown as string)

               expect(tinycolor.equals(configColor, cssColor)).to.be.true
            })
      })

   return cy.wrap(subject)
})

Cypress.Commands.add('checkDomAttrs', (state: 'displayed' | 'destroyed') => {
   if (state === 'displayed') {
      cy.get('body')
         .should('have.attr', 'aria-hidden', 'true')
         .and('have.css', 'pointerEvents', 'none')

      cy.get('html').should('have.css', 'overflow', 'hidden')
   } else {
      cy.get('body')
         .should('not.have.attr', 'aria-hidden', 'true')
         .and('not.have.css', 'pointerEvents', 'none')

      cy.get('html').should('not.have.css', 'overflow', 'hidden')
   }
})

Cypress.Commands.add('triggerAppEvent', (eventName: string) => {
   cy.get('body').trigger(eventName, { force: true })
})
