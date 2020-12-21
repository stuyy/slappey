import { FileSystem } from "../src/FileSystem";
import { getMockScripts, getSlappeyConfig } from "../__mocks__";
import { promises as fs } from "fs";
import * as templates from "../src/templates/templates";
import * as helpers from "../src/utils/helpers";
import path from "path";

jest.mock("fs", () => ({
  promises: {
    access: jest.fn(),
    mkdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

jest.mock("path");

describe("FileSystem", () => {
  const fileSystem = FileSystem.getFileSystem();
  const config = getSlappeyConfig();
  const currentDir = process.cwd();

  beforeEach(() => jest.clearAllMocks());

  it("should call initialize", () => {
    fileSystem.initialize(config);
  });

  it("should call createConfig", async () => {
    const file = `${currentDir}\\app\\slappey.json`;
    const options = JSON.stringify(config, null, 2);
    jest.spyOn(path, "join").mockReturnValue(file);
    await fileSystem.createConfig(config);
    expect(fs.writeFile).toHaveBeenCalledWith(file, options);
  });

  it("should call createProjectDirectory", async () => {
    const projectPath = `${currentDir}\\app`;
    jest.spyOn(path, "join").mockReturnValue(projectPath);
    await fileSystem.createProjectDirectory("app");
    expect(path.join).toHaveBeenCalledWith(currentDir, "app");
    expect(fs.mkdir).toHaveBeenCalledWith(projectPath);
  });

  it("should call createSourceDirectory", async () => {
    const srcPath = `${currentDir}\\app\\src`;
    jest.spyOn(path, "join").mockReturnValue(srcPath);
    await fileSystem.createSourceDirectory("app");
    expect(path.join).toHaveBeenCalledWith(currentDir, "app", "src");
    expect(fs.mkdir).toHaveBeenCalledWith(srcPath);
  });

  it("should call createEntryFile for .ts file", async () => {
    const file = `${currentDir}\\app\\src`;
    jest.spyOn(templates, "getMainFileTS").mockImplementation(() => "template");
    jest.spyOn(templates, "getMainFile");
    jest.spyOn(path, "join").mockReturnValue(`${file}\\index.ts`);
    await fileSystem.createEntryFile(file);
    expect(templates.getMainFileTS).toHaveBeenCalledTimes(1);
    expect(templates.getMainFile).not.toHaveBeenCalled();
    expect(path.join).toHaveBeenCalledWith(file, "index.ts");
    expect(fs.writeFile).toHaveBeenCalledWith(`${file}\\index.ts`, "template");
  });

  it("should call createEntryFile for .js file", async () => {
    const file = `${currentDir}\\app\\src`;
    jest.spyOn(templates, "getMainFile").mockImplementation(() => "template");
    jest.spyOn(templates, "getMainFileTS");
    jest.spyOn(path, "join").mockReturnValue(`${file}\\index.js`);
    config.language = "javascript";
    fileSystem.initialize(config);
    await fileSystem.createEntryFile(file);
    expect(templates.getMainFile).toHaveBeenCalledTimes(1);
    expect(templates.getMainFileTS).not.toHaveBeenCalled();
    expect(path.join).toHaveBeenCalledWith(file, "index.js");
    expect(fs.writeFile).toHaveBeenCalledWith(`${file}\\index.js`, "template");
  });

  it("should createDirectory", async () => {
    await fileSystem.createDirectory("name");
    expect(fs.mkdir).toHaveBeenCalledWith("name");
    expect(fs.mkdir).toHaveBeenCalledTimes(1);
  });

  it("should call createFile", async () => {
    await fileSystem.createFile("filePath", "data");
    expect(fs.writeFile).toHaveBeenCalledWith("filePath", "data");
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });

  it("should call findFile and succeed without error", async () => {
    jest.spyOn(fs, "access").mockImplementation();
    await fileSystem.findFile("file");
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith("file");
  });
  it("should call findFile and throw an error when the file is not found", async () => {
    jest.spyOn(fs, "access").mockImplementation(() => {
      throw new Error("File Not Found");
    });
    try {
      await fileSystem.findFile("file");
    } catch (err) {
      expect(err).toBeDefined();
      expect(fs.access).toHaveBeenCalledTimes(1);
      expect(fs.access).toHaveBeenCalledWith("file");
    }
  });
  it("should call getFileToJson", async () => {
    const text = JSON.stringify({ hello: "world" });
    jest.spyOn(fs, "readFile").mockResolvedValue(text);
    jest.spyOn(JSON, "parse");
    await fileSystem.getFileToJson("filePath");
    expect(JSON.parse).toHaveBeenCalledWith(text);
  });
  it("should return the currentDir", () => {
    fileSystem.getCurrentDir();
  });

  it("should call updatePackageJson and throw an error", async () => {
    fileSystem.initialize();
    const basePath = `${currentDir}\\app`;
    try {
      await fileSystem.updatePackageJson(basePath);
    } catch (err) {
      expect(err).toBeDefined();
      expect(fs.readFile).not.toHaveBeenCalled();
    }
  });
  it("should update package.json with js scripts", async () => {
    const basePath = `${currentDir}\\app`;
    const packageJson = `${basePath}\\package.json`;
    const text = JSON.stringify({ hello: "world" });
    const scripts = getMockScripts("javascript");
    jest.spyOn(path, "join").mockReturnValue(packageJson);
    jest.spyOn(JSON, "parse").mockReturnValue({});
    jest.spyOn(fs, "readFile").mockImplementation((): any => text);
    jest.spyOn(helpers, "getPackageScripts");
    fileSystem.initialize(config);
    await fileSystem.updatePackageJson(basePath);
    expect(path.join).toHaveBeenCalledWith(basePath, "package.json");
    expect(fs.readFile).toHaveBeenCalledWith(packageJson, "utf8");
    expect(JSON.parse).toHaveBeenCalledWith(text);
    expect(helpers.getPackageScripts).toHaveBeenCalledWith("javascript");
    expect(helpers.getPackageScripts).toReturnWith(scripts);
    expect(fs.writeFile).toHaveBeenCalledWith(
      packageJson,
      JSON.stringify({ scripts }, null, 2)
    );
  });
  it("should update package.json with ts scripts", async () => {
    const basePath = `${currentDir}\\app`;
    const packageJson = `${basePath}\\package.json`;
    const text = JSON.stringify({ hello: "world" });
    const scripts = getMockScripts("typescript");
    config.language = "typescript";
    jest.spyOn(path, "join").mockReturnValue(packageJson);
    jest.spyOn(JSON, "parse").mockReturnValue({});
    jest.spyOn(fs, "readFile").mockImplementation((): any => text);
    jest.spyOn(helpers, "getPackageScripts");
    fileSystem.initialize(config);
    await fileSystem.updatePackageJson(basePath);
    expect(path.join).toHaveBeenCalledWith(basePath, "package.json");
    expect(fs.readFile).toHaveBeenCalledWith(packageJson, "utf8");
    expect(JSON.parse).toHaveBeenCalledWith(text);
    expect(helpers.getPackageScripts).toHaveBeenCalledWith("typescript");
    expect(helpers.getPackageScripts).toReturnWith(scripts);
    expect(fs.writeFile).toHaveBeenCalledWith(
      packageJson,
      JSON.stringify({ scripts }, null, 2)
    );
  });

  it("should throw error if file does not exist", async () => {
    jest.spyOn(fs, "access").mockImplementation(() => {
      throw "File Not Found";
    });
    try {
      await fileSystem.exists("file");
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it("should return true if file exists", async () => {
    jest.spyOn(fs, "access").mockImplementation((): any => true);
    const result = await fileSystem.exists("file");
    expect(result).toBeTruthy();
  });

  it("should return the singleton", () => {
    const instance = FileSystem.getFileSystem();
    expect(instance).toBeDefined();
  });
});
