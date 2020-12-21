import path from "path";
import { FileSystem } from "./FileSystem";
import {
  FileExtension,
  getCommandName,
  Initializer,
  Language,
  getEventName,
} from "./utils/index";
import {
  getBaseCommand,
  getBaseCommandTS,
  getBaseEvent,
  getBaseEventTS,
  getCommandTemplate,
  getCommandTemplateTS,
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
import { Logger, ProjectTemplateGenerator } from "./utils/interfaces";
import eventTemplates from "./templates/events";
import eventTemplatesTS from "./templates/tsevents";

const eventsJS: any = eventTemplates;
const eventsTS: any = eventTemplatesTS;

export class TemplateGenerator
  implements ProjectTemplateGenerator, Initializer {
  private static instance: TemplateGenerator;

  private fileSystem: FileSystem = FileSystem.getFileSystem();

  private logger: SimpleLogger = SimpleLogger.getSimpleLogger();

  private language: Language | undefined;

  async initialize(language?: Language) {
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
    const file = path.join(filePath, "client.ts");
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

  async generateCommand(categoryPath: string, name: string, category: string) {
    if (!this.language) throw new Error("Language was not set");
    const fileName = getCommandName(name, this.language);
    const filePath = path.join(categoryPath, fileName);
    const exists = await this.fileSystem.exists(filePath);
    if (!exists) {
      const isJs = this.language === "javascript";
      const template = isJs
        ? getCommandTemplate(name, category)
        : getCommandTemplateTS(name, category);
      return this.fileSystem.createFile(filePath, template);
    }
    throw new Error(`${filePath} already exists.`);
  }

  async generateEvents(events: any[], eventsDir: string) {
    if (!this.language) throw new Error("Language was not set");
    for (const event of events) {
      const fileName = getEventName(event, this.language);
      const filePath = path.join(eventsDir, fileName);
      const exists = await this.fileSystem.exists(filePath);
      const template = this.getTemplate(event);
      if (!exists) {
        await this.fileSystem.createFile(filePath, template);
      }
    }
  }

  getTemplate(event: string) {
    return this.language === "javascript" ? eventsJS[event] : eventsTS[event];
  }

  static getTemplateGenerator(): TemplateGenerator {
    if (!TemplateGenerator.instance) {
      TemplateGenerator.instance = new TemplateGenerator();
    }
    return TemplateGenerator.instance;
  }

  public getFileSystem(): FileSystem {
    return this.fileSystem;
  }

  public getLogger(): Logger {
    return this.logger;
  }

  public getLanguage(): Language | undefined {
    return this.language;
  }
}
