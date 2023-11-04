import * as esbuild from 'esbuild'

import { buildOptions } from './build.js'

await esbuild.context(buildOptions).then((ctx) => ctx.watch())
