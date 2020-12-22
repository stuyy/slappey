import { promises as fs } from "fs";
import path from "path";
import {
  Initializer,
  Language,
  SlappeyConfig,
  FileSystemManager,
  getPackageScripts,
} from "./utils/index";
import { getMainFile, getMainFileTS } from "./templates/templates";

export class FileSystem implements FileSystemManager, Initializer {
  private static instance: FileSystem;

  private language: Language | undefined;

  private config: SlappeyConfig | undefined;

  private CURRENT_DIR: string = process.cwd();

  async initialize(config?: SlappeyConfig) {
    this.language = config?.language;
    this.config = config;
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

  async findFile(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
    } catch (err) {
      throw new Error(
        `${filePath} was not found. Please make sure you're inside a Slappey project.`
      );
    }
  }

  async getFileToJson(filePath: string): Promise<SlappeyConfig> {
    const text = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(text);
    return json;
  }

  getCurrentDir(): string {
    return this.CURRENT_DIR;
  }

  async updatePackageJson(basePath: string) {
    if (!this.config || !this.language)
      throw new Error("Config not initialized.");
    const packageJson = path.join(basePath, "package.json");
    const encoding = "utf8";
    const buffer = await fs.readFile(packageJson, encoding);
    const json = JSON.parse(buffer);
    json.scripts = getPackageScripts(this.language);
    return fs.writeFile(packageJson, JSON.stringify(json, null, 2));
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (err) {
      return false;
    }
  }

  static getFileSystem(): FileSystem {
    if (!FileSystem.instance) {
      FileSystem.instance = new FileSystem();
    }
    return FileSystem.instance;
  }
}
