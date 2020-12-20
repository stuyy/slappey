import path from "path";
import { Language } from "./constants";
import { FileSystem } from "./FileSystem";
import { PackageManager } from "./Manager";
import { Prompter } from "./Prompter";
import { TemplateGenerator } from "./TemplateGenerator";

export interface IScaffolder {
  createProject(name: string, language: Language): Promise<void>;
  createCommand(): Promise<void>;
  createEvent(): Promise<void>;
}

export class Scaffolder implements IScaffolder {
  private prompter: Prompter = Prompter.getPrompter();
  private fileSystem: FileSystem = FileSystem.getFileSystem();
  private manager: PackageManager = PackageManager.getPackageManager();
  private generator: TemplateGenerator = TemplateGenerator.getTemplateGenerator();

  async createProject(name: string): Promise<void> {
    const language = await this.prompter.language();
    const manager = await this.prompter.packageManager();
    const { token, prefix } = await this.prompter.credentials();
    const config = { name, language, manager, token, prefix };
    const basePath = path.join(this.fileSystem.getCurrentDir(), name);

    await this.fileSystem.initialize(language, config);
    await this.manager.initialize(config, basePath);
    await this.generator.initialize(language);

    const srcPath = await this.fileSystem.createSourceDirectory(name);
    await this.fileSystem.createEntryFile(srcPath);
    await this.generator.generateUtilities(srcPath);
    await this.fileSystem.updatePackageJson(basePath, language);
  }

  async createCommand(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createEvent(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
