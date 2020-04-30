"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function getEnvTemplate(token, prefix) {
    return `BOT_TOKEN=${token}\nPREFIX=${prefix}`;
}
exports.getEnvTemplate = getEnvTemplate;
function getMainFile() {
    return `require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client();

(async () => {
  await client.login(process.env.BOT_TOKEN);
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();\n
`;
}
exports.getMainFile = getMainFile;
function getRegistryFile() {
    return `
const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = { 
  registerCommands, 
  registerEvents,
};`;
}
exports.getRegistryFile = getRegistryFile;
function getBaseCommand() {
    return `module.exports = class BaseCommand {
  constructor(name, category, aliases) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
  }
}`;
}
exports.getBaseCommand = getBaseCommand;
function getBaseEvent() {
    return `module.exports = class BaseEvent {
  constructor(name) {
    this.name = name;
  }
}`;
}
exports.getBaseEvent = getBaseEvent;
function getReadyEvent() {
    return `const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
  }
}`;
}
exports.getReadyEvent = getReadyEvent;
function getMessageEvent() {
    return `const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\\s+/);
    const command = client.commands.get(cmdName);
    if (command) {
      command.run(client, message, cmdArgs);
    }
  }
}`;
}
exports.getMessageEvent = getMessageEvent;
function getTestCommand() {
    return `const BaseCommand = require('../../utils/structures/BaseCommand');

  module.exports = class TestCommand extends BaseCommand {
    constructor() {
      super('test', 'testing', []);
    }
  
    run(client, message, args) {
      message.channel.send('Test command works');
    }
  }`;
}
exports.getTestCommand = getTestCommand;
function getCommandTemplate(name, category) {
    return `const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ${utils_1.capitalize(name)}Command extends BaseCommand {
  constructor() {
    super('${name}', '${category}', []);
  }

  run(client, message, args) {
    message.channel.send('${name} command works');
  }
}`;
}
exports.getCommandTemplate = getCommandTemplate;
