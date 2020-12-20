import { FileSystem } from "./FileSystem";
import { PackageManager } from "./Manager";
import { Prompter } from "./Prompter";
import { TemplateGenerator } from "./TemplateGenerator";

export function GetPrompter(): any {
  return (target: {} | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        return Prompter.getPrompter();
      },
      set(value: any) {},
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, name, descriptor);
  };
}

export function GetFileSystem() {
  return (target: {} | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        return FileSystem.getFileSystem();
      },
      set(value: any) {},
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, name, descriptor);
  };
}

export function GetPackageManager() {
  return (target: {} | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        return PackageManager.getPackageManager();
      },
      set(value: any) {},
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, name, descriptor);
  };
}

export function GetTemplateGenerator() {
  return (target: {} | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        return TemplateGenerator.getTemplateGenerator();
      },
      set(value: any) {},
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, name, descriptor);
  };
}
