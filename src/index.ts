#!/usr/bin/env node
import {
  Action,
  checkStructType,
  CLIArguments,
  StructureType,
} from "./utils/index";
import { checkOptionType } from "./utils";
import { Scaffolder } from "./Scaffolder";
import { Prompter } from "./Prompter";

export async function main(scaffolder: Scaffolder, prompter: Prompter) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    const answer = await prompter.getChoice();
    return handleChoice(scaffolder, ...answer);
  } else if (args.length === 2)
    return handleChoice(scaffolder, ...(<CLIArguments>args));
}

export function handleChoice(
  scaffolder: Scaffolder,
  action: Action,
  data: string
) {
  if (checkOptionType(action)) {
    if (action === "new") return scaffolder.createProject(data);
    if (checkStructType(data)) {
      const structure = <StructureType>data;
      return scaffolder.createStructure(structure);
    }
    throw new Error("Invalid Structure");
  } else throw new Error("Invalid Action");
}

main(new Scaffolder(), new Prompter());
