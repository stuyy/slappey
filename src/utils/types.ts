export type Action = "new" | "gen";
export type CLIArguments = [option: Action, data: string];
export type Language = "typescript" | "javascript";
export type PackageManagerType = "npm" | "yarn";
export type FileExtension = "js" | "ts";
export type StructureType = "command" | "event";
export type Credentials = {
  token: string;
  prefix: string;
};
export type CommandAnswer = {
  name: string;
  category: string;
};
export type SlappeyConfig = {
  name: string;
  language: Language;
  manager: PackageManagerType;
  token: string;
  prefix: string;
};
