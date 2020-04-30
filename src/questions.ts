import { PromptObject } from 'prompts';

export const questions: Array<PromptObject> = [
  {
    type: 'select',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      { title: 'New', description: 'Create a new Discord.JS Project', value: 'new' },
      { title: 'Generate', description: 'Generate a command or event', value: 'gen' },
      { title: 'Delete', description: 'Delete a command or event', value: 'del' },
    ],
  },
];

export const newProject: Array<PromptObject> = [
  {
    type: 'text',
    name: 'name',
    message: 'Enter a name for your project',
  },
];

export const versionSelect: Array<PromptObject> = [
  {
    type: 'select',
    name: 'version',
    message: 'Select a version',
    choices: [
      { title: 'Latest', value: 'latest', description: 'Install the latest version of Discord.JS v12' },
      { title: 'v11.6.4', value: '11.6.4', description: 'Install Discord.JS v11.6.4' },
    ],
  },
];

export const getCredentials: Array<PromptObject> = [
  {
    type: 'invisible',
    name: 'token',
    message: 'Enter your token',
  },
  {
    type: 'text',
    name: 'prefix',
    message: 'Enter your prefix',
  },
];

export const templateGenerate: Array<PromptObject> = [
  {
    type: 'select',
    name: 'type',
    message: 'What would you like to do?',
    choices: [
      { title: 'Command', value: 'command', description: 'Generate a command?' },
      { title: 'Event', value: 'event', description: 'Generate an event?' },
    ],
  },
  {
    type: 'text',
    name: 'name',
    message: 'Enter the name of the command',
  },
  {
    type: 'text',
    name: 'category',
    message: 'Enter the category of the command',
  },
];
