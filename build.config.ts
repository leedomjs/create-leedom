import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['index'],
    outDir: 'dist',
    declaration: true,
    rollup: {
      emitCJS: true,
      esbuild: {
        minify: true,
      },
    },
  },
])
