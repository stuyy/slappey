import { Initializer, Language, SlappeyConfig } from "./constants";
import { promises as fs } from "fs";
import path from "path";
import { getMainFile, getMainFileTS } from "./templates/templates";

export interface IFileSystem {
  createProjectDirectory(name: string): Promise<string>;
  createConfig(config: SlappeyConfig): void;
  createSourceDirectory(name: string): Promise<string>;
  createEntryFile(filePath: string): void;
  createDirectory(dirName: string): Promise<void>;
  createFile(filePath: string, data: string): Promise<void>;
  createTsConfig(basePath: string): Promise<void>;
  updatePackageJson(basePath: string, language: string): Promise<void>;
}

export class FileSystem implements IFileSystem, Initializer {
  private static instance: FileSystem;
  private language: Language | undefined;
  private config: SlappeyConfig | undefined;
  private CURRENT_DIR: string = process.cwd();

  async initialize(language: Language, config: SlappeyConfig) {
    this.language = language;
    this.config = config;
    await this.createProjectDirectory(config.name);
    await this.createConfig(config);
  }

  createConfig(config: SlappeyConfig): Promise<void> {
    return fs.writeFile(
      path.join(this.CURRENT_DIR, config.name, "slappey.json"),
      JSON.stringify(config, null, 2)
    );
  }

  async createProjectDirectory(name: string): Promise<string> {
    const filePath = path.join(this.CURRENT_DIR, name);
    await fs.mkdir(filePath);
    return filePath;
  }

  async createSourceDirectory(name: string): Promise<string> {
    const filePath = path.join(this.CURRENT_DIR, name, "src");
    await fs.mkdir(filePath);
    return filePath;
  }

  async createEntryFile(filePath: string) {
    const extension = this.language === "javascript" ? "js" : "ts";
    const template = extension === "js" ? getMainFile() : getMainFileTS();
    return fs.writeFile(path.join(filePath, `index.${extension}`), template);
  }

  createDirectory(name: string): Promise<void> {
    return fs.mkdir(name);
  }

  createFile(filePath: string, data: string): Promise<void> {
    return fs.writeFile(filePath, data);
  }

  getCurrentDir(): string {
    return this.CURRENT_DIR;
  }

  async updatePackageJson(basePath: string, language: string) {
    const packageJson = path.join(basePath, "package.json");
    const encoding = "utf8";
    const buffer = await fs.readFile(packageJson, encoding);
    const json = JSON.parse(buffer);
    json.scripts = {};
    json.scripts.dev =
      language === "js" ? "nodemon ./src/bot.js" : "nodemon  src/bot.ts";
    json.scripts.start =
      language === "js" ? "node ./src/bot.js" : "node ./build/bot.js";
    if (language === "ts") json.scripts.build = "tsc --build";
    return fs.writeFile(packageJson, JSON.stringify(json, null, 2));
  }

  async createTsConfig(basePath: string): Promise<void> {
    return;
  }

  static getFileSystem(): FileSystem {
    if (!FileSystem.instance) {
      FileSystem.instance = new FileSystem();
    }
    return FileSystem.instance;
  }
}
