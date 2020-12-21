import prompts from "prompts";
import {
  CommandAnswer,
  Credentials,
  Language,
  PackageManagerType,
  ProjectPrompter,
} from "./utils/index";
import {
  eventGenerate,
  getCredentials,
  languageSelect,
  packageManager,
  getCommandPrompt,
} from "./utils/questions";

export class Prompter implements ProjectPrompter {
  private static instance: Prompter;

  async language(): Promise<Language> {
    const { language: answer } = await prompts(languageSelect);
    return <Language>(<unknown>answer);
  }

  async packageManager(): Promise<PackageManagerType> {
    const { packageManager: answer } = await prompts(packageManager);
    return <PackageManagerType>(<unknown>answer);
  }

  async command(): Promise<CommandAnswer> {
    const { name, category } = await prompts(getCommandPrompt);
    return { name, category };
  }

  async event(): Promise<[]> {
    const { events } = await prompts(eventGenerate);
    return events;
  }

  async credentials(): Promise<Credentials> {
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
