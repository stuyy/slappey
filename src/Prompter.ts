import prompts, { PromptObject } from "prompts";
import { Language, PackageManagerType } from "./constants";
import {
  eventGenerate,
  getCredentials,
  languageSelect,
  packageManager,
  templateGenerate,
} from "./questions";

export interface IPrompter {
  language(prompt: Array<PromptObject>): Promise<Language>;
  packageManager(prompt: Array<PromptObject>): Promise<PackageManagerType>;
  command(prompt: Array<PromptObject>): Promise<any>;
  event(prompt: Array<PromptObject>): Promise<any>;
  credentials(prompt: Array<PromptObject>): Promise<any>;
}

export class Prompter implements IPrompter {
  private static instance: Prompter;

  async language(): Promise<Language> {
    const { language: answer } = await prompts(languageSelect);
    return <Language>(<unknown>answer);
  }

  async packageManager(): Promise<PackageManagerType> {
    const { packageManager: answer } = await prompts(packageManager);
    return <PackageManagerType>(<unknown>answer);
  }

  async command(): Promise<any> {
    const { name, category } = await prompts(templateGenerate);
    return { name, category };
  }

  async event(): Promise<any> {
    const { name, category } = await prompts(eventGenerate);
    return { name, category };
  }

  async credentials(): Promise<any> {
    const { token, prefix } = await prompts(getCredentials);
    return { token, prefix };
  }

  static getPrompter(): Prompter {
    if (!Prompter.instance) {
      Prompter.instance = new Prompter();
    }
    return Prompter.instance;
  }
}
