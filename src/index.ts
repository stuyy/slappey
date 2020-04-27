#!/usr/bin/env node
/* eslint-disable import/no-unresolved */
import prompts from 'prompts';
import { questions } from './questions';

(async () => {
  if (process.argv.length > 2) {
    // Check Command Argument
  }
  const response = await prompts(questions);
})();
