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
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
