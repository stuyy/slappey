import { FileSystem } from "./FileSystem";
import path from "path";
import { FileExtension, Initializer, Language } from "./constants";
import {
  getBaseCommand,
  getBaseCommandTS,
  getBaseEvent,
  getBaseEventTS,
  getMessageEvent,
  getMessageEventTS,
  getReadyEvent,
  getReadyEventTS,
  getRegistryFile,
  getRegistryFileTS,
  getTestCommand,
  getTestCommandTS,
  getTypescriptBotFile,
} from "./templates/templates";
import { SimpleLogger } from "./Logger";

export interface ITemplateGenerator {
  generateUtilities(filePath: string): void;
  generateBaseCommand(filePath: string): void;
  generateBaseEvent(filePath: string): void;
  generateRegistry(filePath: string): void;
  generateDirectories(filePath: string): void;
  generateTestCommand(filePath: string): void;
  generateReadyEvent(filePath: string): void;
  generateMessageEvent(filePath: string): void;
  generateClient(filePath: string): void;
}

export class TemplateGenerator implements ITemplateGenerator, Initializer {
  private fileSystem: FileSystem = FileSystem.getFileSystem();
  private logger: SimpleLogger = SimpleLogger.getSimpleLogger();

  private static instance: TemplateGenerator;
  private language: Language | undefined;

  async initialize(language: Language) {
    this.language = language;
  }

  async generateUtilities(srcPath: string) {
    const { utils, structures, test, ready, message, client } = this.getPaths(
      srcPath
    );
    await this.generateDirectories(srcPath);
    await this.generateRegistry(utils);
    if (this.language === "typescript") await this.generateClient(client);
    await this.generateBaseCommand(structures);
    await this.generateBaseEvent(structures);
    await this.generateTestCommand(test);
    await this.generateReadyEvent(ready);
    await this.generateMessageEvent(message);
  }

  getPaths(srcPath: string) {
    const utils = path.join(srcPath, "utils");
    const structures = path.join(utils, "structures");
    const commands = path.join(srcPath, "commands");
    const events = path.join(srcPath, "events");
    const client = path.join(srcPath, "client");
    const test = path.join(commands, "test");
    const ready = path.join(events, "ready");
    const message = path.join(events, "message");
    return {
      commands,
      utils,
      structures,
      test,
      ready,
      message,
      events,
      client,
    };
  }

  async generateClient(filePath: string) {
    const template = getTypescriptBotFile();
    const file = path.join(filePath, `client.ts`);
    await this.fileSystem.createFile(file, template);
  }

  async generateDirectories(basePath: string) {
    const {
      utils,
      structures,
      commands,
      events,
      test,
      ready,
      client,
      message,
    } = this.getPaths(basePath);
    this.logger.info("Generating Directories...");
    await this.fileSystem.createDirectory(utils);
    this.logger.success("Created Utilities Directory");
    await this.fileSystem.createDirectory(structures);
    this.logger.success("Created Structures Directory");
    if (this.language === "typescript") {
      await this.fileSystem.createDirectory(client);
      this.logger.success("Created Client Directory");
    }
    await this.fileSystem.createDirectory(commands);
    this.logger.success("Created Commands Directory");
    await this.fileSystem.createDirectory(events);
    this.logger.success("Created Events Directory");
    await this.fileSystem.createDirectory(test);
    this.logger.success("Created TestCommand Directory");
    await this.fileSystem.createDirectory(ready);
    this.logger.success("Created ReadyEvent Directory");
    await this.fileSystem.createDirectory(message);
    this.logger.success("Created MessageEvent Directory");
  }

  async generateRegistry(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getRegistryFile() : getRegistryFileTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `registry.${extension}`);
    return this.fileSystem.createFile(file, template);
  }

  async generateBaseCommand(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getBaseCommand() : getBaseCommandTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `BaseCommand.${extension}`);
    await this.fileSystem.createFile(file, template);
  }

  async generateBaseEvent(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getBaseEvent() : getBaseEventTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `BaseEvent.${extension}`);
    await this.fileSystem.createFile(file, template);
  }

  async generateTestCommand(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getTestCommand() : getTestCommandTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `TestCommand.${extension}`);
    await this.fileSystem.createFile(file, template);
  }
  async generateReadyEvent(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getReadyEvent() : getReadyEventTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `ReadyEvent.${extension}`);
    await this.fileSystem.createFile(file, template);
  }
  async generateMessageEvent(filePath: string) {
    const isJs = this.language === "javascript";
    const template = isJs ? getMessageEvent() : getMessageEventTS();
    const extension: FileExtension = isJs ? "js" : "ts";
    const file = path.join(filePath, `MessageEvent.${extension}`);
    await this.fileSystem.createFile(file, template);
  }

  public static getTemplateGenerator(): TemplateGenerator {
    if (!TemplateGenerator.instance) {
      TemplateGenerator.instance = new TemplateGenerator();
    }
    return TemplateGenerator.instance;
  }
}
