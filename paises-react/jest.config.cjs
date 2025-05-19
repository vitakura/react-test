// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  // transforma TS/TSX e JSX com Babel
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },

  // usa o JSDOM para ter document, window etc.
  testEnvironment: "jsdom",

  // mocks e polyfills após o ambiente ser carregado
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],

  // ignora import de estilos
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // reconhece essas extensões como módulos
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // ativa coleta de cobertura
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",       // inclui todo código TS/TSX
    "!src/**/*.test.{ts,tsx}", // ignora os próprios testes
    "!src/**/__tests__/**",    // ignora pastas __tests__
  ],
  coverageReporters: ["text", "lcov"], 
  coverageDirectory: "coverage",
};

