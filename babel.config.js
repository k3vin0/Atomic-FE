// babel.config.js
export default {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }], // Use the current node version
      '@babel/preset-typescript' // Support TypeScript
    ],
  };