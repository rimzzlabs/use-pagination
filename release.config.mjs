/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  repositoryUrl: 'https://github.com/rimzzlabs/use-pagination.git',
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
}
