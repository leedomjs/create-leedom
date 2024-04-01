import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    outDir: "dist",
    declaration: true,
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
])