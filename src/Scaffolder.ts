import path from "path";
import { PackageManager } from "./Manager";
import { Prompter } from "./Prompter";
import { TemplateGenerator } from "./TemplateGenerator";
import { StructureType } from "./utils";
import { ProjectScaffolder } from "./utils/interfaces";
import { FileSystem } from "./FileSystem";

export class Scaffolder implements ProjectScaffolder {
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

    await this.fileSystem.initialize(config);
    await this.fileSystem.createProjectDirectory(name);
    await this.fileSystem.createConfig(config);
    await this.manager.initialize(config, basePath);
    await this.manager.setup();
    await this.generator.initialize(language);

    const srcPath = await this.fileSystem.createSourceDirectory(name);
    await this.fileSystem.createEntryFile(srcPath);
    await this.generator.generateUtilities(srcPath);
    await this.fileSystem.updatePackageJson(basePath);
  }

  async createStructure(structure: StructureType) {
    const dir = this.fileSystem.getCurrentDir();
    const file = path.join(dir, "slappey.json");
    await this.fileSystem.findFile(file);
    return structure === "command"
      ? this.createCommand(file)
      : this.createEvent(file);
  }

  async createCommand(file: string): Promise<void> {
    const dir = this.fileSystem.getCurrentDir();
    const { name, category } = await this.prompter.command();
    const categoryDir = path.join(dir, "src", "commands", category);
    const { language } = await this.fileSystem.getFileToJson(file);
    await this.generator.initialize(language);
    const exists = await this.fileSystem.exists(categoryDir);
    if (exists) {
      await this.generator.generateCommand(categoryDir, name, category);
    } else {
      // Create Directory
      await this.fileSystem.createDirectory(categoryDir);
      // Create Command
      await this.generator.generateCommand(categoryDir, name, category);
    }
  }

  async createEvent(slappeyFile: string): Promise<void> {
    const dir = this.fileSystem.getCurrentDir();
    const events = await this.prompter.event();
    const eventsDir = path.join(dir, "src", "events");
    const { language } = await this.fileSystem.getFileToJson(slappeyFile);
    await this.generator.initialize(language);
    const exists = await this.fileSystem.exists(eventsDir);
    if (!exists) await this.fileSystem.createDirectory(eventsDir);
    return this.generator.generateEvents(events, eventsDir);
  }

  public getPrompter(): Prompter {
    return this.prompter;
  }

  public getFileSystem(): FileSystem {
    return this.fileSystem;
  }

  public getManager(): PackageManager {
    return this.manager;
  }

  public getGenerator(): TemplateGenerator {
    return this.generator;
  }
}
