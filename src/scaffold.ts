/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import prompts from "prompts";
import path from "path";
import chalk from "chalk";
import symbols from "log-symbols";
import {
  getCredentials,
  setupTypescript,
  getAkairoCredentials,
} from "./questions";
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
  createProjectDetailsFile,
  getFile,
  installTypescript,
  installTSNode,
  setupTSConfigTemplate,
  installDiscordAkairo,
  createMainAkairoFile,
  createCommandFileAkairo,
} from "./filesystem";
import {
  getEnvTemplate,
  getMainFile,
  getMainFileTS,
} from "./templates/templates";
import { capitalize } from "./utils";
import eventTemplates from "./templates/events";
import eventTemplatesTS from "./templates/tsevents";
import {
  getMainFileAkairo,
  getMainFileAkairoTS,
} from "./templates/akairo/templates";

const events: any = eventTemplates;
const eventsTS: any = eventTemplatesTS;

const dir = process.cwd();

export async function createNewProject(name: string, language: string) {
  const filePath = path.join(dir, name);
  const dirExists = await exists(filePath);
  if (!dirExists && language.startsWith("akairo-")) {
    try {
      let mainLanguage = language.slice(7);

      // Create Directory
      await createDirectory(filePath);
      console.log(
        chalk.yellow.bold(`${symbols.success} Generated ${filePath}`)
      );
      // Create details file
      await createProjectDetailsFile(filePath, name, language);

      // Init NPM
      await initializeNPM(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Initialized NPM`));

      // Install discord.js dotenv discord-akairo
      await installDiscordJS(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Installed Discord.JS`));
      await installDotenv(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Installed dotenv.`));
      await installDiscordAkairo(filePath);
      console.log(
        chalk.yellow.bold(`${symbols.success} Install discord-akairo`)
      );

      // Create main src folder
      await createSrcFolder(filePath);

      // prompt for token and prefix
      const { token, prefix, id } = await prompts(getAkairoCredentials);

      // make env file with token and prefix
      const env = getEnvTemplate(token, prefix);
      await createEnvironmentFile(filePath, env);
      console.log(chalk.yellow.bold(`${symbols.success} Created .env file.`));

      // make the main file along with commands and events folder and test commands and events
      const main =
        mainLanguage === "js" ? getMainFileAkairo(id) : getMainFileAkairoTS(id);
      await createMainAkairoFile(filePath, main, mainLanguage);
      console.log(
        chalk.yellow.bold(
          `${symbols.success} Created main bot.${language} file.`
        )
      );

      // Generated Templates..
      const templates =
        language === "js"
          ? await generateTemplates(filePath)
          : await generateTSTemplates(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Generated templates.`));
      await modifyPackageJSONFile(filePath, mainLanguage);

      // TS config
      if (mainLanguage === "ts") {
        const { value } = await prompts(setupTypescript);
        if (value) {
          await installTypescript(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Installed TypeScript`)
          );
          await installTSNode(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Installed ts-node.`)
          );
          await setupTSConfigTemplate(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Setup tsconfig.json`)
          );
        }
      }

      console.log(chalk.yellow.bold(`${symbols.success} Success!`));
      console.log(
        `Type ${chalk.red.bold(`cd ./${name} and then npm run start`)}`
      );
    } catch (err) {
      console.log(err);
      await deleteDirectory(filePath);
      return err;
    }
  } else {
    throw new Error(
      `File/Folder with name: ${name} already exists. Cannot create file.`
    );
  }
  if (!dirExists) {
    try {
      await createDirectory(filePath);
      console.log(
        chalk.yellow.bold(`${symbols.success} Generated ${filePath}`)
      );
      await createProjectDetailsFile(filePath, name, language);
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
      console.log(chalk.yellow.bold(`${symbols.success} Created .env file.`));

      const main = language === "js" ? getMainFile() : getMainFileTS();
      await createMainFile(filePath, main, language);

      console.log(
        chalk.yellow.bold(
          `${symbols.success} Created main bot.${language} file.`
        )
      );
      const templates =
        language === "js"
          ? await generateTemplates(filePath)
          : await generateTSTemplates(filePath);
      console.log(chalk.yellow.bold(`${symbols.success} Generated templates.`));
      await modifyPackageJSONFile(filePath, language);

      if (language === "ts") {
        const { value } = await prompts(setupTypescript);
        if (value) {
          await installTypescript(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Installed TypeScript`)
          );
          await installTSNode(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Installed ts-node.`)
          );
          await setupTSConfigTemplate(filePath);
          console.log(
            chalk.yellow.bold(`${symbols.success} Setup tsconfig.json`)
          );
        }
      }
      console.log(chalk.yellow.bold(`${symbols.success} Success!`));
      console.log(
        `Type ${chalk.red.bold(`cd ./${name} and then npm run start`)}`
      );
      return true;
    } catch (err) {
      console.log(err);
      await deleteDirectory(filePath);
      return err;
    }
  } else {
    throw new Error(
      `File/Folder with name: ${name} already exists. Cannot create file.`
    );
  }
}

export async function generateNewCommand(
  commandName: string,
  category: string
) {
  const slappeyFile = path.join(dir, "slappey.json");
  const fileExists = await exists(slappeyFile);
  if (fileExists) {
    const { language } = await getFile(slappeyFile);

    if (language.startsWith("akairo-")) {
      let mainLanguage = language.slice(7);
      const commandsPath = path.join(dir, "src", "commands", category);
      const categoryExists = await exists(commandsPath);
      if (categoryExists) {
        // Check if command already exists.

        const commandFile =
          mainLanguage === "js"
            ? `${capitalize(commandName)}Command.js`
            : `${capitalize(commandName)}Command.ts`;
        const commandFilePath = path.join(commandsPath, commandFile);
        const commandExists = await exists(commandFilePath);
        if (!commandExists)
          return createCommandFileAkairo(
            commandsPath,
            commandName,
            category,
            language
          );
        throw new Error(`Command already exists. ${commandFile}`);
      }
      await createDirectory(commandsPath);
      return createCommandFileAkairo(
        commandsPath,
        commandName,
        category,
        language
      );
    }
    // Check the language
    // Check if commands folder has category.
    // if it exists, create it in there, if not, create folder.
    else {
      const commandsPath = path.join(dir, "src", "commands", category);
      const categoryExists = await exists(commandsPath);
      if (categoryExists) {
        // Check if command already exists.

        const commandFile =
          language === "js"
            ? `${capitalize(commandName)}Command.js`
            : `${capitalize(commandName)}Command.ts`;
        const commandFilePath = path.join(commandsPath, commandFile);
        const commandExists = await exists(commandFilePath);
        if (!commandExists)
          return createCommandFile(
            commandsPath,
            commandName,
            category,
            language
          );
        throw new Error(`Command already exists. ${commandFile}`);
      }
      await createDirectory(commandsPath);
      return createCommandFile(commandsPath, commandName, category, language);
    }
  }
  throw new Error("Not a slappey project");
}


export async function generateNewEvent(eventsArray: Array<string>) {
  const slappeyFile = path.join(dir, "slappey.json");
  const slappeyFileExists = await exists(slappeyFile);
  const eventsPath = path.join(dir, "src", "events");
  try {
    if (slappeyFileExists) {
      const { language } = await getFile(slappeyFile);
      const fileExists = await exists(eventsPath);
      if (!fileExists) await createDirectory(eventsPath);
      const js = language === "js";
      // eslint-disable-next-line no-restricted-syntax
      for (const event of eventsArray) {
        
        const eventsFilePath = js
          ? path.join(eventsPath, `${capitalize(event)}Event.js`)
          : path.join(eventsPath, `${capitalize(event)}Event.ts`);
        const eventsFileExists = await exists(eventsFilePath);
        // eslint-disable-next-line max-len
        if (!eventsFileExists)
          await createEventFile(
            eventsFilePath,
            js ? events[event] : eventsTS[event]
          );
        console.log(`${symbols.success} Created ${eventsFilePath}`);
      }
    } else throw new Error(`${symbols.error} Not a slappey project`);
  } catch (err) {
    console.log(err);
  }
}
