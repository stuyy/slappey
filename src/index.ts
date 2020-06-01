#!/usr/bin/env node
/* eslint-disable import/no-unresolved */
import prompts from 'prompts';
import chalk from 'chalk';
import { questions } from './questions';
import { handleOption } from './handler';

(async () => {
  try {
    const args = process.argv.slice(2);
    if (args.length === 2) {
      // Check Command Argument
      const [option, data] = args;
      await handleOption(option, data);
    } else {
      const { option, data } = await prompts(questions);
      await handleOption(option, data);
    }
  } catch (err) {
    console.log(chalk.red.bold(err));
  }
})();
