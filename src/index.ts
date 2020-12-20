#!/usr/bin/env node
import { checkStructType, CLIArguments, StructureType } from "./utils/index";
import { checkOptionType } from "./utils";
import { Scaffolder } from "./Scaffolder";

const scaffolder = new Scaffolder();

async function main() {
  const args = process.argv.slice(2);
  try {
    if (args.length === 2) {
      const [option, data] = <CLIArguments>args;
      if (checkOptionType(option)) {
        if (option === "new") return scaffolder.createProject(data);
        if (checkStructType(data)) {
          const structure = <StructureType>data;
          return scaffolder.createStructure(structure);
        } else throw new Error("Invalid Structure");
      } else throw new Error("Invalid Action");
    }
  } catch (err) {
    console.log(err);
  }
}

async function createNewCommand() {}

async function createNewEvent() {}

main();
