import { execSync } from "child_process";
import { Initializer, SlappeyConfig } from "./utils/index";

export class PackageManager implements Initializer {
  private static instance: PackageManager;
  private config: SlappeyConfig | undefined;
  private prefix: string | undefined;
  private filePath: string | undefined;

  async initialize(config: SlappeyConfig, filePath: string): Promise<void> {
    this.config = config;
    this.filePath = filePath;
    this.prefix = this.config.manager === "npm" ? "npm i" : "yarn add";
    return this.config.manager === "npm"
      ? this.initializeNPM()
      : this.initializeYarn();
  }

  private initializeNPM() {
    execSync(`${this.config?.manager} init -y`, { cwd: this.filePath });
    return this.installDependencies();
  }

  private initializeYarn() {
    execSync(`${this.config?.manager} init -y`, { cwd: this.filePath });
    return this.installDependencies();
  }

  private installDependencies() {
    this.installDiscordJS();
    this.installNodemon();
    if (this.config?.language === "typescript") {
      this.installTypes();
    }
  }

  private installTypes() {
    this.installTypescript();
    this.installNodeTypes();
  }

  private installTypescript() {
    return execSync(`${this.prefix} -D typescript`, {
      cwd: this.filePath,
      stdio: "ignore",
    });
  }

  private installNodeTypes() {
    return execSync(`${this.prefix} -D @types/node`, {
      cwd: this.filePath,
      stdio: "ignore",
    });
  }

  private installDiscordJS() {
    return execSync(`${this.prefix} discord.js@latest`, {
      cwd: this.filePath,
      stdio: "ignore",
    });
  }

  private installNodemon() {
    return execSync(`${this.prefix} -D nodemon`, {
      cwd: this.filePath,
      stdio: "ignore",
    });
  }

  private installDotEnv(prefix: string) {}
  static getPackageManager(): PackageManager {
    if (!PackageManager.instance) {
      PackageManager.instance = new PackageManager();
    }
    return PackageManager.instance;
  }
}
