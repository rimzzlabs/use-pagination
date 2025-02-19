/**
 * Prettier base config
 * @type {import('@trivago/prettier-plugin-sort-imports').PluginConfig & import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: ['^@/hooks/(.*)$', '^@/lib/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
