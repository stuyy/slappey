import { handleChoice, main } from "../src/index";
import { Scaffolder } from "../src/Scaffolder";
import { Prompter } from "../src/Prompter";
import * as helpers from "../src/utils/helpers";

jest.mock("../src/Scaffolder.ts");
jest.mock("../src/Prompter.ts");

describe("index.ts", () => {
  const scaffolder = new Scaffolder();
  const prompter = new Prompter();
  const checkOptionType = jest.spyOn(helpers, "checkOptionType");
  const checkStructType = jest.spyOn(helpers, "checkStructType");
  const createProject = jest.spyOn(scaffolder, "createProject");
  const createStructure = jest.spyOn(scaffolder, "createStructure");
  beforeEach(() => jest.clearAllMocks());
  describe("successful calls", () => {
    it("should do something when 0 args are provided", async () => {
      jest.spyOn(prompter, "getChoice").mockResolvedValue(["gen", "command"]);
      process.argv = ["node", "index.js"];
      await main(scaffolder, prompter);
      expect(prompter.getChoice).toHaveBeenCalledTimes(1);
    });
    it("should call handleChoice when action is new", () => {
      handleChoice(scaffolder, "new", "app");
      expect(scaffolder.createProject).toHaveBeenCalledWith("app");
      expect(checkOptionType).toHaveBeenCalledWith("new");
      expect(scaffolder.createProject).toHaveBeenCalledTimes(1);
      expect(checkOptionType).toHaveBeenCalledTimes(1);
    });
    it("should call handleChoice when action is gen", () => {
      handleChoice(scaffolder, "gen", "command");
      expect(scaffolder.createStructure).toHaveBeenCalledTimes(1);
      expect(scaffolder.createStructure).toHaveBeenCalledWith("command");
      expect(checkOptionType).toHaveBeenCalledTimes(1);
      expect(checkOptionType).toHaveBeenCalledWith("gen");
      expect(checkStructType).toHaveBeenCalledWith("command");
    });
    it("should do something when 1 args are provided", async () => {
      process.argv = ["node", "index.js", "new"];
      await main(scaffolder, prompter);
    });

    it("should call createProject when 'new' is passed as an argument", async () => {
      process.argv = ["node", "index.js", "new", "project_name"];

      await main(scaffolder, prompter);
      expect(helpers.checkOptionType).toHaveBeenCalledTimes(1);
      expect(helpers.checkOptionType).toHaveBeenCalledWith("new");
      expect(createProject).toHaveBeenCalledTimes(1);
      expect(createProject).toHaveBeenCalledWith("project_name");
    });

    it("should call createStructure when 'gen' is passed as an argument", async () => {
      process.argv = ["node", "index.js", "gen", "command"];

      await main(scaffolder, prompter);
      expect(checkOptionType).toHaveBeenCalledWith("gen");
      expect(checkStructType).toHaveBeenCalledWith("command");
      expect(checkOptionType).toHaveBeenCalledTimes(1);
      expect(checkStructType).toHaveBeenCalledTimes(1);
      expect(createStructure).toHaveBeenCalledTimes(1);
      expect(createStructure).toHaveBeenCalledWith("command");
    });
  });

  describe("errors", () => {
    it("should throw an error when an invalid structure is provided", async () => {
      process.argv = ["node", "index.js", "gen", "random"];
      try {
        await main(scaffolder, prompter);
      } catch (err) {
        expect(err).toBeDefined();
        expect(createStructure).not.toHaveBeenCalled();
        expect(checkOptionType).toHaveBeenCalledWith("gen");
        expect(checkStructType).toHaveBeenCalledWith("random");
        expect(createStructure).not.toHaveBeenCalled();
      }
    });
    it("should throw an error when provided an invalid action", async () => {
      process.argv = ["node", "index.js", "invalid", "entry"];
      try {
        await main(scaffolder, prompter);
      } catch (err) {
        expect(err).toBeDefined();
        expect(checkOptionType).toHaveBeenCalled();
        expect(checkOptionType).toHaveBeenCalledWith("invalid");
      }
    });
  });
});
