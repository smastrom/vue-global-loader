import * as esbuild from 'esbuild'

import { exec, execSync } from 'child_process'
import { readFileSync } from 'node:fs'

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

         childProcess = exec(
            'tsc -p tsconfig.build.json && npx api-extractor run --local',
            (err) => {
               if (err && err.signal !== 'SIGTERM') console.error(err)
            }
         )

         childProcess.on('exit', (code, signal) => {
            if (code === 0) {
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
   plugins: [timePlugin, dtsPlugin, checkConsolePlugin],
}

await esbuild.build({ ...buildOptions, drop: ['console'] })
