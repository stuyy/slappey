import path from "path";
import { Scaffolder } from "../src/Scaffolder";
import { Prompter } from "../src/Prompter";
import { FileSystem } from "../src/FileSystem";
import { PackageManager } from "../src/Manager";
import { TemplateGenerator } from "../src/TemplateGenerator";
import {
  getMockFileSystem,
  getMockPackageManager,
  getMockPrompter,
  getMockTemplateGenerator,
  getSlappeyConfig,
} from "../__mocks__";

jest.mock("path");
jest.mock("../src/Manager", () => {
  return {
    PackageManager: {
      getPackageManager: jest.fn(() => getMockPackageManager()),
    },
  };
});

jest.mock("../src/TemplateGenerator", () => {
  return {
    TemplateGenerator: {
      getTemplateGenerator: jest.fn(() => getMockTemplateGenerator()),
    },
  };
});

jest.mock("../src/FileSystem", () => {
  return {
    FileSystem: { getFileSystem: jest.fn(() => getMockFileSystem()) },
  };
});

jest.mock("../src/Prompter", () => {
  return {
    Prompter: { getPrompter: jest.fn(() => getMockPrompter()) },
  };
});

describe("Scaffolder", () => {
  const fakeDir = "C:\\Fake\\Directory";
  const slappeyPath = `${fakeDir}\\slappey.json`;
  const config = getSlappeyConfig();
  const getPrompter = jest.spyOn(Prompter, "getPrompter");
  const getFileSystem = jest.spyOn(FileSystem, "getFileSystem");
  const getPackageManager = jest.spyOn(PackageManager, "getPackageManager");
  const getTemplateGenerator = jest.spyOn(
    TemplateGenerator,
    "getTemplateGenerator"
  );

  const scaffolder = new Scaffolder();
  const prompter = scaffolder.getPrompter();
  const fileSystem = scaffolder.getFileSystem();
  const manager = scaffolder.getManager();
  const generator = scaffolder.getGenerator();

  it("should be defined", () => {
    expect(scaffolder).toBeDefined();
  });

  it("should call all singleton classes to retrieve its instances", () => {
    expect(getPrompter).toHaveBeenCalled();
    expect(getFileSystem).toHaveBeenCalled();
    expect(getPackageManager).toHaveBeenCalled();
    expect(getTemplateGenerator).toHaveBeenCalled();
  });

  describe("createProject", () => {
    it("should call createProject with no issues", async () => {
      const baseDir = `${fakeDir}\\app`;
      const srcPath = `${fakeDir}\\src`;
      const { language } = config;
      jest.spyOn(path, "join").mockReturnValueOnce(baseDir);
      jest
        .spyOn(fileSystem, "createSourceDirectory")
        .mockResolvedValueOnce(srcPath);
      await scaffolder.createProject("app");
      expect(prompter.language).toHaveBeenCalledTimes(1);
      expect(prompter.packageManager).toHaveBeenCalledTimes(1);
      expect(prompter.credentials).toHaveBeenCalledTimes(1);
      expect(fileSystem.getCurrentDir).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(fakeDir, "app");
      expect(fileSystem.initialize).toHaveBeenCalledWith(config);
      expect(fileSystem.createProjectDirectory).toHaveBeenCalledWith("app");
      expect(fileSystem.createConfig).toHaveBeenCalledWith(config);
      expect(manager.initialize).toHaveBeenCalledWith(config, baseDir);
      expect(generator.initialize).toHaveBeenCalledWith(language);
      expect(fileSystem.createSourceDirectory).toHaveBeenCalledWith("app");
      expect(fileSystem.createEntryFile).toHaveBeenCalledWith(srcPath);
      expect(generator.generateUtilities).toHaveBeenCalledWith(srcPath);
      expect(fileSystem.updatePackageJson).toHaveBeenCalledWith(baseDir);
    });
  });

  describe("createStructure", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should call createStructure and call createCommand", async () => {
      jest
        .spyOn(scaffolder, "createCommand")
        .mockImplementationOnce((): any => {
          return;
        });
      jest.spyOn(path, "join").mockReturnValueOnce(slappeyPath);
      await scaffolder.createStructure("command");
      expect(fileSystem.getCurrentDir).toHaveBeenCalled();
      expect(path.join).toHaveBeenCalledWith(fakeDir, "slappey.json");
      expect(path.join).toReturnWith(slappeyPath);
      expect(fileSystem.findFile).toHaveBeenCalledWith(slappeyPath);
      expect(scaffolder.createCommand).toHaveBeenCalledWith(slappeyPath);
    });
    it("should call createStructure and call createEvent", async () => {
      jest
        .spyOn(scaffolder, "createEvent")
        .mockImplementationOnce((): any => {});
      jest.spyOn(path, "join").mockReturnValueOnce(slappeyPath);
      await scaffolder.createStructure("event");
      expect(fileSystem.getCurrentDir).toHaveBeenCalled();
      expect(path.join).toHaveBeenCalledWith(fakeDir, "slappey.json");
      expect(path.join).toReturnWith(slappeyPath);
      expect(fileSystem.findFile).toHaveBeenCalledWith(slappeyPath);
      expect(scaffolder.createEvent).toHaveBeenCalledWith(slappeyPath);
    });
  });
  describe("createCommand", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate command when category directory exists", async () => {
      const categoryDir = `${fakeDir}\\src\\commands\\mod`;
      jest.spyOn(path, "join").mockReturnValue(categoryDir);
      jest.spyOn(fileSystem, "exists").mockResolvedValue(true);
      await scaffolder.createCommand(slappeyPath);
      expect(fileSystem.getCurrentDir).toHaveBeenCalledTimes(1);
      expect(prompter.command).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(fakeDir, "src", "commands", "mod");
      expect(fileSystem.getFileToJson).toHaveBeenCalledWith(slappeyPath);
      expect(generator.initialize).toHaveBeenCalledWith(config.language);
      expect(fileSystem.exists).toHaveBeenCalledWith(categoryDir);
      expect(generator.generateCommand).toHaveBeenCalledTimes(1);
      expect(generator.generateCommand).toHaveBeenCalledWith(
        categoryDir,
        "kick",
        "mod"
      );
      expect(fileSystem.createDirectory).not.toHaveBeenCalled();
    });
    it("should generate the directory and command when the category does not exist", async () => {
      const categoryDir = `${fakeDir}\\src\\commands\\mod`;
      jest.spyOn(path, "join").mockReturnValue(categoryDir);
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      await scaffolder.createCommand(slappeyPath);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(categoryDir);
      expect(fileSystem.createDirectory).toHaveBeenCalledTimes(1);
      expect(generator.generateCommand).toHaveBeenCalledTimes(1);
      expect(generator.generateCommand).toHaveBeenCalledWith(
        categoryDir,
        "kick",
        "mod"
      );
    });
  });

  describe("createEvent", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should create an event when the directory exists", async () => {
      const eventsDir = `${fakeDir}\\src\\events`;
      jest.spyOn(path, "join").mockReturnValue(eventsDir);
      jest.spyOn(fileSystem, "exists").mockResolvedValue(true);
      await scaffolder.createEvent(slappeyPath);
      expect(fileSystem.getCurrentDir).toHaveBeenCalledTimes(1);
      expect(prompter.event).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(fakeDir, "src", "events");
      expect(fileSystem.getFileToJson).toHaveBeenCalledWith(slappeyPath);
      expect(generator.initialize).toHaveBeenCalledWith(config.language);
      expect(fileSystem.exists).toHaveBeenCalledWith(eventsDir);
      expect(generator.generateEvents).toHaveBeenCalledTimes(1);
      expect(generator.generateEvents).toHaveBeenCalledWith(
        ["message", "ready"],
        eventsDir
      );
      expect(fileSystem.createDirectory).not.toHaveBeenCalled();
    });
    it("should create an event and the directory if the directory does not exist", async () => {
      const eventsDir = `${fakeDir}\\src\\events`;
      jest.spyOn(path, "join").mockReturnValue(eventsDir);
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      await scaffolder.createEvent(slappeyPath);
      expect(fileSystem.getCurrentDir).toHaveBeenCalledTimes(1);
      expect(prompter.event).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(fakeDir, "src", "events");
      expect(fileSystem.getFileToJson).toHaveBeenCalledWith(slappeyPath);
      expect(generator.initialize).toHaveBeenCalledWith(config.language);
      expect(fileSystem.exists).toHaveBeenCalledWith(eventsDir);
      expect(fileSystem.createDirectory).toHaveBeenCalledTimes(1);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(eventsDir);
      expect(generator.generateEvents).toHaveBeenCalledTimes(1);
      expect(generator.generateEvents).toHaveBeenCalledWith(
        ["message", "ready"],
        eventsDir
      );
    });
  });
});
