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
