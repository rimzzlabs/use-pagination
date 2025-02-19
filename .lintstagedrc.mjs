import process from 'node:process'
import path from 'path'

function buildEslintCommand(filenames) {
  return `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`
}

function buildPrettier(filenames) {
  return `prettier -w ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`
}

const config = {
  '*.{js,ts,tsx}': [buildPrettier, buildEslintCommand],
  '*.{md,json,mjs}': [buildPrettier],
}

export default config
