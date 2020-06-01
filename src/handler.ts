/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import prompts from 'prompts';
import { Constants, Type } from './constants';
import {
  createNewProject,
  generateNewCommand,
  generateNewEvent,
} from './scaffold';
import {
  templateGenerate,
  eventGenerate,
  languageSelect,
} from './questions';

export async function handleOption(option: string, data: string) {
  if (option === Constants.NEW) {
    const { language } = await prompts(languageSelect);
    await createNewProject(data, language);
  } else if (option === Constants.GEN) {
    if (data === Type.COMMAND) {
      const { name, category } = await prompts(templateGenerate);
      await generateNewCommand(name, category)
        .then(() => console.log('Created.'))
        .catch((err) => console.log(err));
    } else if (data === Type.EVENT) {
      const { events } = await prompts(eventGenerate);
      await generateNewEvent(events);
    }
  }
}
