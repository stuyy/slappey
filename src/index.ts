#!/usr/bin/env node
import { CLIArguments } from "./constants";
import { checkOptionType } from "./utils";
import { Scaffolder } from "./Scaffolder";

const scaffolder = new Scaffolder();

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 2) {
    const [option, data] = <CLIArguments>args;
    if (checkOptionType(option)) {
      if (option === "new") await scaffolder.createProject(data);
    } else throw new Error("Invalid Action");
  }
}

async function createNewCommand() {}

async function createNewEvent() {}

main();
