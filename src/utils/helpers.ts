import { Language } from "./types";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const checkOptionType = (arg: any) =>
  ["new", "gen"].some((element) => element === arg);

export const checkStructType = (arg: any) =>
  ["command", "event"].some((element) => element === arg);

export const getCommandName = (name: string, language: Language) =>
  language === "javascript"
    ? `${capitalize(name)}Command.js`
    : `${capitalize(name)}Command.ts`;

export const getEventName = (name: string, language: Language) =>
  language === "javascript"
    ? `${capitalize(name)}Event.js`
    : `${capitalize(name)}Event.ts`;

export const getPackageScripts = (language: Language) => {
  const scripts = { dev: "", start: "", build: "" };
  scripts.dev =
    language === "typescript"
      ? "nodemon ./src/index.ts"
      : "nodemon ./src/index.js";
  scripts.start =
    language === "typescript" ? "node ./build/index.js" : "node ./src/index.js";
  scripts.build = language === "typescript" ? "tsc" : "";

  return scripts;
};
