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
  getRegistryFileTS,
  getBaseCommandTS,
  getBaseEventTS,
  getReadyEventTS,
  getMessageEventTS,
  getTestCommandTS,
  getTypescriptBotFile,
  getCommandTemplateTS,
  TSCONFIG,
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


export function createProjectDetailsFile(filePath: string, name: string, language: string) {
  const slappey = {
    name,
    language,
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

export async function createMainFile(filePath: string, data: string, language: string) {
  return language === 'ts' ? fs.writeFile(path.join(filePath, 'src', 'bot.ts'), data) : fs.writeFile(path.join(filePath, 'src', 'bot.js'), data);
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

export async function generateTSTemplates(filePath: string) {
  try {
    await fs.mkdir(path.join(filePath, 'src', 'utils'));
    await fs.mkdir(path.join(filePath, 'src', 'utils', 'structures'));
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'registry.ts'), getRegistryFileTS());
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'structures', 'BaseCommand.ts'), getBaseCommandTS());
    await fs.writeFile(path.join(filePath, 'src', 'utils', 'structures', 'BaseEvent.ts'), getBaseEventTS());
    await fs.mkdir(path.join(filePath, 'src', 'commands'));
    await fs.mkdir(path.join(filePath, 'src', 'events'));
    await fs.mkdir(path.join(filePath, 'src', 'client'));
    await fs.writeFile(path.join(filePath, 'src', 'client', 'client.ts'), getTypescriptBotFile());
    await fs.mkdir(path.join(filePath, 'src', 'commands', 'test'));
    await fs.mkdir(path.join(filePath, 'src', 'events', 'ready'));
    await fs.mkdir(path.join(filePath, 'src', 'events', 'message'));
    await fs.writeFile(path.join(filePath, 'src', 'events', 'ready', 'ready.ts'), getReadyEventTS());
    await fs.writeFile(path.join(filePath, 'src', 'events', 'message', 'message.ts'), getMessageEventTS());
    await fs.writeFile(path.join(filePath, 'src', 'commands', 'test', 'TestCommand.ts'), getTestCommandTS());
  } catch (err) {
    throw new Error(err);
  }
}

export async function createCommandFile(
  filePath: string,
  name: string,
  category: string,
  language: string,
) {
  return language === 'js'
    ? fs.writeFile(path.join(filePath, `${capitalize(name)}Command.js`), getCommandTemplate(name, category))
    : fs.writeFile(path.join(filePath, `${capitalize(name)}Command.ts`), getCommandTemplateTS(name, category));
}

export async function createEventFile(filePath: string, template: string) {
  return fs.writeFile(filePath, template);
}

export async function modifyPackageJSONFile(filePath: string, language: string) {
  const buffer = await fs.readFile(path.join(filePath, 'package.json'), 'utf8');
  const json = JSON.parse(buffer);
  json.scripts.dev = language === 'js' ? 'nodemon ./src/bot.js' : 'nodemon --exec ts-node src/bot.ts';
  json.scripts.start = language === 'js' ? 'node ./src/bot.js' : 'node ./build/bot.js';
  if (language === 'ts') json.scripts.build = 'tsc --build';
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

export async function installDiscordJS(filePath: string) {
  return execSync('npm i discord.js@latest', {
    cwd: filePath,
    stdio: 'ignore',
  });
}

export async function installTypescript(filePath: string) {
  return execSync('npm i -D typescript', {
    cwd: filePath,
    stdio: 'ignore',
  });
}

export async function installTSNode(filePath: string) {
  return execSync('npm i -D ts-node', {
    cwd: filePath,
    stdio: 'ignore',
  });
}
export async function installTypes(filePath: string) {
  return execSync('npm i -D @types/node', {
    cwd: filePath,
    stdio: 'ignore',
  });
}

export async function setupTSConfigTemplate(filePath: string) {
  return fs.writeFile(path.join(filePath, 'tsconfig.json'), TSCONFIG);
}

export async function installDotenv(filePath: string) {
  return execSync('npm i dotenv', {
    cwd: filePath,
    stdio: 'ignore',
  });
}
