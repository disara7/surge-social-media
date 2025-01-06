// Import necessary testing libraries and utilities
import '@testing-library/jest-dom'; // Provides custom jest matchers for DOM elements

// Mock `matchMedia` for tests (if using any CSS media queries or responsive features)
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

// Mock `console.error` to fail tests on React-specific errors
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && args[0].includes('React')) {
    throw new Error(args[0]);
  }
  originalConsoleError(...args);
};

// Silence other unwanted console warnings/errors in test output
global.console = {
  ...console,
  warn: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
};

// Extend Jest if necessary (e.g., add global utilities, custom matchers, etc.)
