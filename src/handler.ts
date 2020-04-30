/* eslint-disable import/no-unresolved */
import prompts from 'prompts';
import { Constants, Type } from './constants';
import {
  createNewProject,
  generateNewCommand,
} from './scaffold';
import { versionSelect, templateGenerate, newProject } from './questions';

export async function checkArguments(arg: string) {

}

export async function handleOption(option: string) {
  if (option === Constants.NEW) {
    const { name } = await prompts(newProject);
    const { version } = await prompts(versionSelect);
    await createNewProject(name, version);
  } else if (option === Constants.GEN) {
    const { type, name, category } = await prompts(templateGenerate);
    if (type === Type.COMMAND) {
      await generateNewCommand(name, category)
        .then(() => console.log('Created.'))
        .catch((err) => console.log(err));
    } else if (type === Type.EVENT) {
      //
    }
  } else if (option === Constants.DEL) {
    //
  }
}
