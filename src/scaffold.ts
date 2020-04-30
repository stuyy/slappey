import prompts from 'prompts';
import path from 'path';
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
  modifyPackageJSONFile,
  createProjectDetailsFile,
  createCommandFile,
} from './filesystem';
import { getEnvTemplate, getMainFile, getCommandTemplate } from './templates/templates';
import { capitalize } from './utils';

const dir = process.cwd();

export async function createNewProject(name: string, version: string) {
  const filePath = path.join(dir, name);
  const dirExists = await exists(filePath);
  if (!dirExists) {
    // Create the project.
    try {
      await createDirectory(filePath);
      await createProjectDetailsFile(filePath, name, version);
      await initializeNPM(filePath);
      await installDiscordJS(filePath, version);
      await installDotenv(filePath);
      await createSrcFolder(filePath);
      // Need to copy templates.
      const { token, prefix } = await prompts(getCredentials);
      const env = getEnvTemplate(token, prefix);
      await createEnvironmentFile(filePath, env);
      const main = getMainFile();
      await createMainFile(filePath, main);
      await generateTemplates(filePath);
      await modifyPackageJSONFile(filePath);
      return true;
    } catch (err) {
      await deleteDirectory(filePath);
      return err;
    }
  } else {
    throw new Error('Cannot create file');
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

async function generateNewEvent(events: Array<string>) {
  // const slappeyFile = path.join(dir, 'slappey.json');
  // const fileExists = await exists(slappeyFile);
  // if (fileExists) {
  //   const eventPath = path.join(dir, 'src', 'events', category);
  //   const categoryExists = await exists(eventPath);
  //   if (categoryExists) {
  //     const eventFile = `${capitalize(eventPath)}Event.js`;
  //     const eventFilePath = path.join(eventPath, eventFile);
  //     const commandExists = await exists(eventFilePath);
  //     if (!commandExists) return createCommandFile(eventPath, eventName, category);
  //     throw new Error(`Event already exists. ${eventFile}`);
  //   }
  //   await createDirectory(eventPath);
  //   return createCommandFile(eventPath, eventName, category);
  // } throw new Error('Not a slappey project');
}
