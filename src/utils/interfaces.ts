import { PromptObject } from "prompts";
import {
  Language,
  PackageManagerType,
  SlappeyConfig,
  StructureType,
} from "./types";

export interface Initializer {
  initialize(...args: any): void;
}

export interface ProjectScaffolder {
  createProject(name: string, language: Language): Promise<void>;
  createStructure(structure: StructureType): Promise<void>;
  createCommand(slappeyFilePath: string): Promise<void>;
  createEvent(slappeyFilePath: string): Promise<void>;
}

export interface ProjectPrompter {
  language(prompt: Array<PromptObject>): Promise<Language>;
  packageManager(prompt: Array<PromptObject>): Promise<PackageManagerType>;
  command(prompt: Array<PromptObject>): Promise<any>;
  event(prompt: Array<PromptObject>): Promise<any>;
  credentials(prompt: Array<PromptObject>): Promise<any>;
}

export interface ProjectTemplateGenerator {
  generateUtilities(filePath: string): void;
  generateCommand(categoryPath: string, name: string, category: string): void;
  generateEvents(events: any[], eventsDir: string): void;
  generateBaseCommand(filePath: string): void;
  generateBaseEvent(filePath: string): void;
  generateRegistry(filePath: string): void;
  generateDirectories(filePath: string): void;
  generateTestCommand(filePath: string): void;
  generateReadyEvent(filePath: string): void;
  generateMessageEvent(filePath: string): void;
  generateClient(filePath: string): void;
}

export interface FileSystemManager {
  createProjectDirectory(name: string): Promise<string>;
  createConfig(config: SlappeyConfig): void;
  createSourceDirectory(name: string): Promise<string>;
  createEntryFile(filePath: string): void;
  createDirectory(dirName: string): Promise<void>;
  createFile(filePath: string, data: string): Promise<void>;
  getFileToJson(filePath: string): Promise<SlappeyConfig>;
  exists(filePath: string): Promise<boolean>;
  findFile(filePath: string): Promise<void>;
  updatePackageJson(filePath: string): void;
}

export interface Logger {
  success(message: string, time: number): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
}
