import * as esbuild from 'esbuild'

import { exec, execSync } from 'child_process'
import { appendFileSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

const internalComponents = ['GlobalLoaderImpl.vue', 'GlobalLoaderClientOnly.js']

const components = await readdir('components').then((files) => {
   let _internalComponents = 0
   const _components = []

   for (const file of files) {
      if (internalComponents.includes(file)) {
         _internalComponents++
         continue
      }
      if (file.endsWith('.vue')) _components.push(file.replace('.vue', ''))
   }

   if (internalComponents.length !== _internalComponents) {
      throw new Error('[build.js] - Internal components array contains misspelled imports!')
   }

   return _components
})

console.log('[build.js] - Vue Components:', components)

/**
 * @param {string[]} names
 * @returns {string}
 */
function getVueExports(names) {
   return names
      .map((name) => `export { default as ${name} } from "../components/${name}.vue";`)
      .join('\n')
}

/**
 * @param {string[]} names
 * @returns {string}
 */
function getVueDeclarations(names) {
   return names
      .map((name) => `export declare const ${name}: import('vue').DefineComponent<{}, {}, any>;`)
      .join('\n')
}

/** @type {import('esbuild').Plugin} */
const timePlugin = {
   name: 'time',
   setup({ onStart, onEnd }) {
      /** @type number */
      let start
      onStart(() => {
         start = Date.now()
      })
      onEnd(() => {
         console.log(`[esbuild] - Bundled in ${Date.now() - start}ms`)
      })
   },
}

/** @type {import('esbuild').Plugin} */
const dtsPlugin = {
   name: 'dts',
   setup({ onEnd }) {
      /** @type {import('child_process').ChildProcess | null} */
      let childProcess = null

      function declare() {
         const start = Date.now()
         console.log('[esbuild-dts] - Bundling declaration...')

         childProcess = exec('tsc && npx api-extractor run --local', (err) => {
            if (err && err.signal !== 'SIGTERM') console.error(err)
         })

         childProcess.on('exit', (code, signal) => {
            if (code === 0) {
               appendFileSync('dist/index.d.ts', getVueDeclarations(components))

               console.log(`[esbuild-dts] - Declaration complete in ${Date.now() - start}ms`)

               if (process.env.IS_BUILD) {
                  execSync('rm -rf dist/core')
                  console.log('[esbuild-dts] - Deleted useless declaration files')
               }
            } else if (signal === 'SIGTERM') {
               console.log('[esbuild-dts] - Declaration aborted, too fast :P')
            }

            childProcess = null
         })
      }

      onEnd(() => {
         if (childProcess) childProcess.kill()
         setTimeout(declare)
      })
   },
}

/**
 * Just to be extra sure in case I forget { drop: ['console'] } in esbuild options
 *
 * @type {import('esbuild').Plugin}
 */
const checkConsolePlugin = {
   name: 'check-console',
   setup({ onEnd }) {
      onEnd(() => {
         if (!process.env.IS_BUILD) return
         const indexJs = readFileSync('dist/index.js', 'utf-8')

         if (indexJs.includes('console.')) {
            throw new Error('[esbuild-check-console] - Console statements present in index.js')
         } else {
            console.log(
               '[esbuild-check-console] - No console statements present in index.js, all good!'
            )
         }
      })
   },
}

/** @type {import('esbuild').BuildOptions} */
export const buildOptions = {
   entryPoints: ['index.ts'],
   bundle: true,
   format: 'esm',
   target: 'es2015',
   minify: false,
   outfile: 'dist/index.js',
   external: ['vue'],
   footer: {
      js: getVueExports(components),
   },
   plugins: [timePlugin, dtsPlugin, checkConsolePlugin],
}

await esbuild.build({ ...buildOptions, drop: ['console'] })
