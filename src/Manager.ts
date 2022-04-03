import { execSync } from 'child_process';
import { Initializer, SlappeyConfig } from './utils/index';

export class PackageManager implements Initializer {
  private static instance: PackageManager;
  private config: SlappeyConfig | undefined;
  private prefix: string | undefined;
  private filePath: string | undefined;

  async initialize(config: SlappeyConfig, filePath: string): Promise<void> {
    this.config = config;
    this.filePath = filePath;
    this.prefix = `${this.config.manager} add`;
  }

  async setup() {
    if (!this.config) throw new Error('Config Not Initialized.');
    const initialize = {
      npm: this.initializeNPM(),
      yarn: this.initializeYarn(),
      pnpm: this.initializePNPM(),
    }
    return initialize[this.config.manager];
  }

  public initializeNPM() {
    execSync(`${this.config?.manager} init -y`, { cwd: this.filePath });
    return this.installDependencies();
  }

  public initializeYarn() {
    execSync(`${this.config?.manager} init -y`, { cwd: this.filePath });
    return this.installDependencies();
  }

  public initializePNPM() {
    execSync(`${this.config?.manager} init -y`, { cwd: this.filePath });
    return this.installDependencies();
  }

  public createTsconfig() {
    return execSync(
      `${this.config?.manager === 'npm' ? 'npx' : this.config?.manager} tsc --init --resolveJsonModule --target es6`,
      { cwd: this.filePath }
    );
  }

  public installDependencies() {
    this.installDiscordJS();
    this.installNodemon();
    if (this.config?.language === 'typescript') {
      this.installTypes();
      return this.createTsconfig();
    }
  }

  public installTypes() {
    this.installTypescript();
    this.installNodeTypes();
  }

  public installTypescript() {
    return execSync(`${this.prefix} -D typescript`, {
      cwd: this.filePath,
      stdio: 'ignore',
    });
  }

  public installNodeTypes() {
    return execSync(`${this.prefix} -D @types/node`, {
      cwd: this.filePath,
      stdio: 'ignore',
    });
  }

  public installDiscordJS() {
    return execSync(`${this.prefix} discord.js@latest`, {
      cwd: this.filePath,
      stdio: 'ignore',
    });
  }

  public installNodemon() {
    return execSync(`${this.prefix} -D nodemon`, {
      cwd: this.filePath,
      stdio: 'ignore',
    });
  }

  static getPackageManager(): PackageManager {
    if (!PackageManager.instance) {
      PackageManager.instance = new PackageManager();
    }
    return PackageManager.instance;
  }
}
