import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'es2020',
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  dts: true,
})
