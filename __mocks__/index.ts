import {
  CommandAnswer,
  Credentials,
  Language,
  PackageManagerType,
  SlappeyConfig,
} from "../src/utils";

export const getSlappeyConfig = (): SlappeyConfig => ({
  name: "app",
  token: "123",
  prefix: "!",
  language: "typescript",
  manager: "yarn",
});

export const getMockFileSystem = () => ({
  initialize: jest.fn(),
  createProjectDirectory: jest.fn(),
  createConfig: jest.fn(),
  createDirectory: jest.fn(),
  createSourceDirectory: jest.fn(),
  createEntryFile: jest.fn(),
  createFile: jest.fn(),
  exists: jest.fn(),
  findFile: jest.fn(),
  getCurrentDir: jest.fn(() => "C:\\Fake\\Directory"),
  getFileToJson: jest.fn((): SlappeyConfig => getSlappeyConfig()),
  updatePackageJson: jest.fn(),
});

export const getMockTemplateGenerator = () => ({
  initialize: jest.fn(),
  generateUtilities: jest.fn(),
  generateCommand: jest.fn(),
  generateEvents: jest.fn(),
  generateClient: jest.fn(),
});

export const getMockPackageManager = () => ({
  initialize: jest.fn(),
  setup: jest.fn(),
});

export const getMockPrompter = () => ({
  command: jest.fn((): CommandAnswer => ({ name: "kick", category: "mod" })),
  credentials: jest.fn((): Credentials => ({ token: "123", prefix: "!" })),
  event: jest.fn(() => ["message", "ready"]),
  language: jest.fn((): Language => "typescript"),
  packageManager: jest.fn((): PackageManagerType => "yarn"),
});

export const getMockPaths = (srcPath: string) => ({
  commands: `${srcPath}\\commands`,
  utils: `${srcPath}\\utils`,
  structures: `${srcPath}\\utils\\structures`,
  test: `${srcPath}\\commands\\test`,
  ready: `${srcPath}\\events\\ready`,
  message: `${srcPath}\\events\\message`,
  events: `${srcPath}\\events`,
  client: `${srcPath}\\client`,
});

export const getMockScripts = (language: Language) => ({
  dev:
    language === "javascript"
      ? "nodemon ./src/index.js"
      : "nodemon ./src/index.ts",
  start:
    language === "javascript" ? "node ./src/index.js" : "node ./build/index.js",
  build: language === "javascript" ? "" : "tsc",
});
