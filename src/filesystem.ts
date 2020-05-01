import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import {
  getRegistryFile,
  getBaseCommand,
  getBaseEvent,
  getReadyEvent,
  getMessageEvent,
  getTestCommand,
  getCommandTemplate,
} from './templates/templates';
import { capitalize } from './utils';

const dir = process.cwd();

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

export function createProjectDetailsFile(filePath: string, name: string, version: string) {
  const slappey = {
    name,
    version,
  };
  return fs.writeFile(path.join(filePath, 'slappey.json'), JSON.stringify(slappey, null, 2));
}

export async function createDirectory(filePath: string) {
  try {
    return fs.mkdir(filePath);
  } catch (err) {
    return err;
  }
}

export async function createSrcFolder(filePath: string) {
  try {
    return fs.mkdir(path.join(filePath, 'src'));
  } catch (err) {
    return err;
  }
}

export async function createEnvironmentFile(filePath: string, data: string) {
  try {
    return fs.writeFile(path.join(filePath, '.env'), data);
  } catch (err) {
    return err;
  }
}

export async function createMainFile(filePath: string, data: string) {
  return fs.writeFile(path.join(filePath, 'src', 'bot.js'), data);
}

export async function getFile(filePath: string) {
  const text = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(text);
  return json;
}
export async function generateTemplates(filePath: string) {
  try {
    await fs.mkdir(path.join(filePath, 'src', 'utils'));
    await fs.mkdir(path.join(filePath, 'src', 'utils', 'structures'));
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'registry.js'), getRegistryFile());
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'structures', 'BaseCommand.js'), getBaseCommand());
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'structures', 'BaseEvent.js'), getBaseEvent());
    await fs.mkdir(path.join(filePath, 'src', 'commands'));
    await fs.mkdir(path.join(filePath, 'src', 'events'));
    await fs.mkdir(path.join(filePath, 'src', 'commands', 'test'));
    await fs.mkdir(path.join(filePath, 'src', 'events', 'ready'));
    await fs.mkdir(path.join(filePath, 'src', 'events', 'message'));
    await fs.writeFile(path.join(filePath, 'src', 'events', 'ready', 'ready.js'), getReadyEvent());
    await fs.writeFile(path.join(filePath, 'src', 'events', 'message', 'message.js'), getMessageEvent());
    await fs.writeFile(path.join(filePath, 'src', 'commands', 'test', 'TestCommand.js'), getTestCommand());
  } catch (err) {
    throw new Error(err);
  }
}

export async function createCommandFile(filePath: string, name: string, category: string) {
  return fs.writeFile(path.join(filePath, `${capitalize(name)}Command.js`), getCommandTemplate(name, category));
}

export async function createEventFile(filePath: string, template: string) {
  return fs.writeFile(filePath, template);
}

export async function modifyPackageJSONFile(filePath: string) {
  const buffer = await fs.readFile(path.join(filePath, 'package.json'), 'utf8');
  const json = JSON.parse(buffer);
  json.scripts.dev = 'nodemon ./src/bot.js';
  json.scripts.start = 'node ./src/bot.js';
  return fs.writeFile(path.join(filePath, 'package.json'), JSON.stringify(json, null, 2));
}

export async function deleteDirectory(filePath: string) {
  return fs.rmdir(filePath, {
    recursive: true,
  });
}

export async function initializeNPM(filePath: string) {
  return execSync('npm init -y', {
    cwd: filePath,
  });
}

export async function installDiscordJS(filePath: string, version?: string) {
  return execSync(`npm i discord.js@${version}`, {
    cwd: filePath,
    stdio: 'ignore',
  });
}

export async function installDotenv(filePath: string) {
  return execSync('npm i dotenv', {
    cwd: filePath,
    stdio: 'ignore',
  });
}
