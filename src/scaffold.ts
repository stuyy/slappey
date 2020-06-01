/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import prompts from 'prompts';
import path from 'path';
import chalk from 'chalk';
import symbols from 'log-symbols';
import {
  getCredentials,
} from './questions';
import {
  exists,
  createDirectory,
  initializeNPM,
  installDiscordJS,
  installDotenv,
  createSrcFolder,
  createEnvironmentFile,
  createMainFile,
  deleteDirectory,
  generateTemplates,
  generateTSTemplates,
  modifyPackageJSONFile,
  createCommandFile,
  createEventFile,
} from './filesystem';
import { getEnvTemplate, getMainFile, getMainFileTS } from './templates/templates';
import { capitalize } from './utils';
import eventTemplates from './templates/events';

const events: any = eventTemplates;

const dir = process.cwd();

export async function createNewProject(name: string, language: string) {
  const filePath = path.join(dir, name);
  const dirExists = await exists(filePath);
  if (!dirExists) {
    try {
      await createDirectory(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Generated ${filePath}`));
      // await createProjectDetailsFile(filePath, name);
      await initializeNPM(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Initialized NPM`));
      await installDiscordJS(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Installed Discord.JS`));
      await installDotenv(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Installed dotenv.`));
      await createSrcFolder(filePath);
      // Need to copy templates.
      const { token, prefix } = await prompts(getCredentials);
      const env = getEnvTemplate(token, prefix);
      await createEnvironmentFile(filePath, env);
      const main = language === 'js' ? getMainFile() : getMainFileTS();
      await createMainFile(filePath, main, language);
      const templates = language === 'js' ? await generateTemplates(filePath) : await generateTSTemplates(filePath);
      await modifyPackageJSONFile(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Success!`));
      console.log(`Type ${chalk.red.bold(`cd ./${name} and then npm run start`)}`);
      return true;
    } catch (err) {
      await deleteDirectory(filePath);
      return err;
    }
  } else {
    throw new Error(`File/Folder with name: ${name} already exists. Cannot create file.`);
  }
}


export async function generateNewCommand(commandName: string, category: string) {
  const slappeyFile = path.join(dir, 'slappey.json');
  const fileExists = await exists(slappeyFile);
  if (fileExists) {
    // Check if commands folder has category.
    // if it exists, create it in there, if not, create folder.
    const commandsPath = path.join(dir, 'src', 'commands', category);
    const categoryExists = await exists(commandsPath);
    if (categoryExists) {
      // Check if command already exists.
      const commandFile = `${capitalize(commandName)}Command.js`;
      const commandFilePath = path.join(commandsPath, commandFile);
      const commandExists = await exists(commandFilePath);
      if (!commandExists) return createCommandFile(commandsPath, commandName, category);
      throw new Error(`Command already exists. ${commandFile}`);
    }
    await createDirectory(commandsPath);
    return createCommandFile(commandsPath, commandName, category);
  } throw new Error('Not a slappey project');
}

export async function generateNewEvent(eventsArray: Array<string>) {
  const eventsPath = path.join(dir, 'src', 'events');
  try {
    const fileExists = await exists(eventsPath);
    if (!fileExists) await createDirectory(eventsPath);
    // eslint-disable-next-line no-restricted-syntax
    for (const event of eventsArray) {
      const eventsFilePath = path.join(eventsPath, `${capitalize(event)}Event.js`);
      const eventsFileExists = await exists(eventsFilePath);
      if (!eventsFileExists) await createEventFile(eventsFilePath, events[event]);
      console.log(`Created ${eventsFilePath}`);
    }
  } catch (err) {
    console.log(err);
  }
}
