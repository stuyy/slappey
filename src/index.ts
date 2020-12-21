#!/usr/bin/env node
import { checkStructType, CLIArguments, StructureType } from "./utils/index";
import { checkOptionType } from "./utils";
import { Scaffolder } from "./Scaffolder";
import messages from "./utils/messages";

export async function main() {
  const scaffolder = new Scaffolder();
  const args = process.argv.slice(2);
  if (args.length === 0) {
    // TO-DO
  } else if (args.length === 1) {
    // TO-DO
  } else if (args.length === 2) {
    const [option, data] = <CLIArguments>args;
    if (checkOptionType(option)) {
      if (option === "new") return scaffolder.createProject(data);
      if (checkStructType(data)) {
        const structure = <StructureType>data;
        return scaffolder.createStructure(structure);
      }
      throw new Error("Invalid Structure");
    } else throw new Error("Invalid Action");
  }
}

main();
