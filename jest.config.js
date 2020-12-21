module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  roots: ["src", "__tests__"],
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts, js}"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
