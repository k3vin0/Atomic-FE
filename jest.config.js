// jest.config.js
export default {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files using ts-jest
      '^.+\\.jsx?$': 'babel-jest' // Transform JavaScript files using babel-jest
    },
    testEnvironment: 'jsdom', // Use jsdom for DOM-related tests
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // File extensions for imports
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // Adjust path aliases if using them in Vite
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
    globals: {
      'ts-jest': {
        useESM: true, // Enable ESM support for ts-jest
      }
    }
  };