export enum Constants {
  NEW = "new",
  GEN = "gen",
  DEL = "del",
}

export enum Type {
  COMMAND = "command",
  EVENT = "event",
}

export type Action = "new" | "gen";
export type CLIArguments = [option: Action, data: string];
export type Language = "typescript" | "javascript";
export type PackageManagerType = "npm" | "yarn";
export type FileExtension = "js" | "ts";
export interface SlappeyConfig {
  name: string;
  language: Language;
  manager: PackageManagerType;
  token: string;
  prefix: string;
}

export interface Initializer {
  initialize(...args: any): void;
}
