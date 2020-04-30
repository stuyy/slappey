#!/usr/bin/env node
/* eslint-disable import/no-unresolved */
import prompts, { Answers } from 'prompts';
import { questions } from './questions';
import { handleOption } from './handler';

(async () => {
  if (process.argv.length > 2) {
    // Check Command Argument
  }
  const { option, data } = await prompts(questions);
  await handleOption(option, data);
})();
