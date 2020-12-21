import { TemplateGenerator } from "../src/TemplateGenerator";
import {
  getMockFileSystem,
  getMockPaths,
  getMockTemplateGenerator,
} from "../__mocks__";
import path from "path";
import * as templates from "../src/templates/templates";
import * as helpers from "../src/utils/helpers";

jest.mock("../src/FileSystem", () => {
  return {
    FileSystem: { getFileSystem: jest.fn(() => getMockFileSystem()) },
  };
});

describe("TemplateGenerator", () => {
  const generator = new TemplateGenerator();
  const logger = generator.getLogger();
  const fileSystem = generator.getFileSystem();
  const srcPath = "C:\\Fake\\Directory\\app\\src";
  const mockPaths = getMockPaths(srcPath);
  const {
    utils,
    structures,
    commands,
    events,
    test,
    ready,
    client,
    message,
  } = mockPaths;
  it("should be defined", () => {
    expect(generator).toBeDefined();
    expect(logger).toBeDefined();
    expect(fileSystem).toBeDefined();
  });
  describe("initialize", () => {
    it("should call initialize with javascript", () => {
      generator.initialize("javascript");
      expect(generator.getLanguage()).toBe("javascript");
    });
    it("should call initialize with typescript", () => {
      generator.initialize("typescript");
      expect(generator.getLanguage()).toBe("typescript");
    });
  });

  describe("generateUtilities", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate all directories when language is typescript", async () => {
      const { utils, structures, test, ready, message, client } = mockPaths;
      jest.spyOn(generator, "getPaths").mockReturnValue(mockPaths);
      jest
        .spyOn(generator, "generateDirectories")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateRegistry").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateBaseCommand")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateBaseEvent").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateTestCommand")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateReadyEvent").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateMessageEvent")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateClient").mockImplementation(jest.fn());
      await generator.initialize("typescript");
      await generator.generateUtilities(srcPath);
      expect(generator.getPaths).toHaveBeenCalledWith(srcPath);
      expect(generator.generateDirectories).toHaveBeenCalledWith(srcPath);
      expect(generator.generateRegistry).toHaveBeenCalledWith(utils);
      expect(generator.generateClient).toHaveBeenCalledWith(client);
      expect(generator.generateBaseCommand).toHaveBeenCalledWith(structures);
      expect(generator.generateTestCommand).toHaveBeenCalledWith(test);
      expect(generator.generateReadyEvent).toHaveBeenCalledWith(ready);
      expect(generator.generateMessageEvent).toHaveBeenCalledWith(message);
    });
    it("should generate all directories when language is javascript", async () => {
      const { utils, structures, test, ready, message, client } = mockPaths;
      jest.spyOn(generator, "getPaths").mockReturnValue(mockPaths);
      jest
        .spyOn(generator, "generateDirectories")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateRegistry").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateBaseCommand")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateBaseEvent").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateTestCommand")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateReadyEvent").mockImplementation(jest.fn());
      jest
        .spyOn(generator, "generateMessageEvent")
        .mockImplementation(jest.fn());
      jest.spyOn(generator, "generateClient").mockImplementation(jest.fn());
      await generator.initialize("javascript");
      await generator.generateUtilities(srcPath);
      expect(generator.getPaths).toHaveBeenCalledWith(srcPath);
      expect(generator.generateDirectories).toHaveBeenCalledWith(srcPath);
      expect(generator.generateRegistry).toHaveBeenCalledWith(utils);
      expect(generator.generateClient).not.toHaveBeenCalled();
      expect(generator.generateBaseCommand).toHaveBeenCalledWith(structures);
      expect(generator.generateTestCommand).toHaveBeenCalledWith(test);
      expect(generator.generateReadyEvent).toHaveBeenCalledWith(ready);
      expect(generator.generateMessageEvent).toHaveBeenCalledWith(message);
    });
  });

  describe("getPaths", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });
    it("should return the correct paths", () => {
      jest.spyOn(path, "join");
      generator.getPaths(srcPath);
      expect(path.join).toHaveBeenCalledTimes(8);
    });
  });

  describe("generateClient", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate the client template", async () => {
      const mockTemplate = "typescript-client-template";
      jest.spyOn(path, "join");
      jest
        .spyOn(templates, "getTypescriptBotFile")
        .mockReturnValue(mockTemplate);
      const { client } = mockPaths;
      const clientFile = `${client}\\client.ts`;
      await generator.generateClient(client);
      expect(path.join).toHaveBeenCalledWith(client, "client.ts");
      expect(templates.getTypescriptBotFile).toHaveBeenCalledTimes(1);
      expect(fileSystem.createFile).toHaveBeenCalledWith(
        clientFile,
        mockTemplate
      );
    });
  });

  describe("generate Directories", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(logger, "success").mockImplementation(() => {});
      jest.spyOn(logger, "info").mockImplementation(() => {});
      jest.spyOn(generator, "getPaths").mockReturnValue(mockPaths);
    });

    it("should generate all directories for typescript", async () => {
      await generator.initialize("typescript");
      await generator.generateDirectories(srcPath);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(utils);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(structures);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(client);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(commands);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(events);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(test);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(ready);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(message);
      expect(fileSystem.createDirectory).toHaveBeenCalledTimes(8);
    });

    it("should generate all directories for javascript", async () => {
      await generator.initialize("javascript");
      await generator.generateDirectories(srcPath);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(utils);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(structures);
      expect(fileSystem.createDirectory).not.toHaveBeenCalledWith(client);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(commands);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(events);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(test);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(ready);
      expect(fileSystem.createDirectory).toHaveBeenCalledWith(message);
      expect(fileSystem.createDirectory).toHaveBeenCalledTimes(7);
    });
  });

  describe("generateRegistry", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a registry.js file", async () => {
      jest.spyOn(templates, "getRegistryFile").mockReturnValue("template");
      jest.spyOn(path, "join");
      const registry = `${utils}\\registry.js`;
      await generator.initialize("javascript");
      await generator.generateRegistry(utils);
      expect(templates.getRegistryFile).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(utils, "registry.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(registry, "template");
    });
    it("should generate a registry.ts file", async () => {
      jest.spyOn(templates, "getRegistryFileTS").mockReturnValue("template");
      jest.spyOn(path, "join");
      const registry = `${utils}\\registry.ts`;
      await generator.initialize("typescript");
      await generator.generateRegistry(utils);
      expect(templates.getRegistryFileTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(utils, "registry.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(registry, "template");
    });
  });

  describe("generateBaseCommand", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a BaseCommand.js file", async () => {
      jest.spyOn(templates, "getBaseCommand").mockReturnValue("command");
      jest.spyOn(path, "join");
      const commandFile = `${commands}\\BaseCommand.js`;
      await generator.initialize("javascript");
      await generator.generateBaseCommand(commands);
      expect(templates.getBaseCommand).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(commands, "BaseCommand.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(
        commandFile,
        "command"
      );
    });
    it("should generate a BaseCommand.ts file", async () => {
      jest.spyOn(templates, "getBaseCommandTS").mockReturnValue("command");
      jest.spyOn(path, "join");
      const commandFile = `${commands}\\BaseCommand.ts`;
      await generator.initialize("typescript");
      await generator.generateBaseCommand(commands);
      expect(templates.getBaseCommandTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(commands, "BaseCommand.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(
        commandFile,
        "command"
      );
    });
  });
  describe("generateBaseEvent", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a BaseEvent.js file", async () => {
      jest.spyOn(templates, "getBaseEvent").mockReturnValue("event");
      jest.spyOn(path, "join");
      const eventsFile = `${events}\\BaseEvent.js`;
      await generator.initialize("javascript");
      await generator.generateBaseEvent(events);
      expect(templates.getBaseEvent).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(events, "BaseEvent.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(eventsFile, "event");
    });
    it("should generate a BaseEvent.ts file", async () => {
      jest.spyOn(templates, "getBaseEventTS").mockReturnValue("event");
      jest.spyOn(path, "join");
      const eventsFile = `${events}\\BaseEvent.ts`;
      await generator.initialize("typescript");
      await generator.generateBaseEvent(events);
      expect(templates.getBaseEventTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(events, "BaseEvent.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(eventsFile, "event");
    });
  });
  describe("generateTestCommand", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a TestCommand.js file", async () => {
      jest.spyOn(templates, "getTestCommand").mockReturnValue("test-command");
      jest.spyOn(path, "join");
      const file = `${test}\\TestCommand.js`;
      await generator.initialize("javascript");
      await generator.generateTestCommand(test);
      expect(templates.getTestCommand).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(test, "TestCommand.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "test-command");
    });
    it("should generate a TestCommand.ts file", async () => {
      jest.spyOn(templates, "getTestCommandTS").mockReturnValue("test-command");
      jest.spyOn(path, "join");
      const file = `${test}\\TestCommand.ts`;
      await generator.initialize("typescript");
      await generator.generateTestCommand(test);
      expect(templates.getTestCommandTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(test, "TestCommand.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "test-command");
    });
  });
  describe("generateReadyEvent", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a ReadyEvent.js file", async () => {
      jest.spyOn(templates, "getReadyEvent").mockReturnValue("ready");
      jest.spyOn(path, "join");
      const file = `${ready}\\ReadyEvent.js`;
      await generator.initialize("javascript");
      await generator.generateReadyEvent(ready);
      expect(templates.getReadyEvent).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(ready, "ReadyEvent.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "ready");
    });
    it("should generate a ReadyEvent.ts file", async () => {
      jest.spyOn(templates, "getReadyEventTS").mockReturnValue("ready");
      jest.spyOn(path, "join");
      const file = `${ready}\\ReadyEvent.ts`;
      await generator.initialize("typescript");
      await generator.generateReadyEvent(ready);
      expect(templates.getReadyEventTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(ready, "ReadyEvent.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "ready");
    });
  });
  describe("generateMessageEvent", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should generate a MessageEvent.js file", async () => {
      jest.spyOn(templates, "getMessageEvent").mockReturnValue("message");
      jest.spyOn(path, "join");
      const file = `${message}\\MessageEvent.js`;
      await generator.initialize("javascript");
      await generator.generateMessageEvent(message);
      expect(templates.getMessageEvent).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(message, "MessageEvent.js");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "message");
    });
    it("should generate a MessageEvent.ts file", async () => {
      jest.spyOn(templates, "getMessageEventTS").mockReturnValue("message");
      jest.spyOn(path, "join");
      const file = `${message}\\MessageEvent.ts`;
      await generator.initialize("typescript");
      await generator.generateMessageEvent(message);
      expect(templates.getMessageEventTS).toHaveBeenCalledTimes(1);
      expect(path.join).toHaveBeenCalledWith(message, "MessageEvent.ts");
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "message");
    });
  });

  describe("generateCommand", () => {
    const name = "kick";
    const category = "mod";
    const categoryPath = `${commands}\\${category}`;
    beforeEach(() => jest.clearAllMocks());

    it("should throw an error when the language is not set", async () => {
      generator.initialize(undefined);
      try {
        await generator.generateCommand(categoryPath, name, category);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("should throw an error if the command file exists", async () => {
      generator.initialize("typescript");
      jest.spyOn(fileSystem, "exists").mockResolvedValue(true);
      try {
        await generator.generateCommand(categoryPath, name, category);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it("should generate a typescript command if it does not exist", async () => {
      const file = `${categoryPath}\\${name}.ts`;
      generator.initialize("typescript");
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      jest.spyOn(path, "join").mockReturnValue(file);
      jest
        .spyOn(templates, "getCommandTemplateTS")
        .mockImplementation(() => "template");
      jest.spyOn(helpers, "getCommandName");
      await generator.generateCommand(categoryPath, name, category);
      expect(helpers.getCommandName).toHaveBeenCalledWith(name, "typescript");
      expect(helpers.getCommandName).toReturnWith("KickCommand.ts");
      expect(templates.getCommandTemplateTS).toHaveBeenCalledWith(
        name,
        category
      );
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "template");
    });
    it("should generate a javascript command if it does not exist", async () => {
      generator.initialize("javascript");
      const file = `${categoryPath}\\${name}.js`;
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      jest.spyOn(path, "join").mockReturnValue(file);
      jest
        .spyOn(templates, "getCommandTemplate")
        .mockImplementation(() => "template");
      jest.spyOn(helpers, "getCommandName");
      await generator.generateCommand(categoryPath, name, category);
      expect(helpers.getCommandName).toHaveBeenCalledWith(name, "javascript");
      expect(helpers.getCommandName).toReturnWith("KickCommand.js");
      expect(templates.getCommandTemplate).toHaveBeenCalledWith(name, category);
      expect(fileSystem.createFile).toHaveBeenCalledWith(file, "template");
    });
  });

  describe("generateEvents", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
    it("should throw an error when no language is set", async () => {
      generator.initialize(undefined);
      try {
        await generator.generateEvents([], events);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    it("should generate events for javascript", async () => {
      const msgPath = `${events}\\MessageEvent.js`;
      const readyPath = `${events}\\ReadyEvent.js`;
      jest.spyOn(helpers, "getEventName");
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      jest.spyOn(generator, "getTemplate").mockReturnValue("template");
      jest.spyOn(path, "join");
      generator.initialize("javascript");
      await generator.generateEvents(["message", "ready"], events);
      expect(helpers.getEventName).toHaveBeenCalledTimes(2);
      expect(helpers.getEventName).toHaveBeenNthCalledWith(
        1,
        "message",
        "javascript"
      );
      expect(helpers.getEventName).toHaveBeenNthCalledWith(
        2,
        "ready",
        "javascript"
      );
      expect(fileSystem.exists).toHaveBeenCalledTimes(2);
      expect(path.join).toHaveBeenCalledTimes(2);
      expect(fileSystem.createFile).toHaveBeenCalledTimes(2);
      expect(fileSystem.createFile).toHaveBeenNthCalledWith(
        1,
        msgPath,
        "template"
      );
      expect(fileSystem.createFile).toHaveBeenNthCalledWith(
        2,
        readyPath,
        "template"
      );
    });
    it("should generate events for typescript", async () => {
      jest.spyOn(helpers, "getEventName");
      jest.spyOn(fileSystem, "exists").mockResolvedValue(false);
      jest.spyOn(path, "join");
      generator.initialize("typescript");
      await generator.generateEvents(["message", "ready"], events);
      expect(helpers.getEventName).toHaveBeenCalledTimes(2);
      expect(helpers.getEventName).toHaveBeenNthCalledWith(
        1,
        "message",
        "typescript"
      );
      expect(helpers.getEventName).toHaveBeenNthCalledWith(
        2,
        "ready",
        "typescript"
      );
      expect(fileSystem.exists).toHaveBeenCalledTimes(2);
      expect(path.join).toHaveBeenCalledTimes(2);
      expect(fileSystem.createFile).toHaveBeenCalledTimes(2);
    });
    it("should not generate events when it exists", async () => {
      jest.spyOn(fileSystem, "exists").mockResolvedValue(true);
      generator.initialize("typescript");
      await generator.generateEvents(["ready"], events);
      expect(fileSystem.exists).toHaveBeenCalledTimes(1);
      expect(fileSystem.createFile).not.toHaveBeenCalled();
    });
  });

  describe("getTemplate", () => {
    it("should return a js template", () => {
      generator.initialize("javascript");
      generator.getTemplate("ready");
    });
  });

  it("should return the singleton", () => {
    const instance = TemplateGenerator.getTemplateGenerator();
    expect(instance).toBeDefined();
  });
});
