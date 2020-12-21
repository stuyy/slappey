module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  roots: ["src", "__tests__"],
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts, js}"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "questions.ts", "messages.ts"],
  coverageThreshold: {
    global: {
      branches: 93,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
