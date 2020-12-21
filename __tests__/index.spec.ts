import { main } from "../src/index";
import { Scaffolder } from "../src/Scaffolder";
import * as helpers from "../src/utils/helpers";

jest.mock("../src/Scaffolder.ts");

describe("index.ts", () => {
  const checkOptionType = jest.spyOn(helpers, "checkOptionType");
  const checkStructType = jest.spyOn(helpers, "checkStructType");
  const createProject = jest.spyOn(Scaffolder.prototype, "createProject");
  const createStructure = jest.spyOn(Scaffolder.prototype, "createStructure");

  beforeEach(() => jest.clearAllMocks());
  describe("successful calls", () => {
    it("should call createProject when 'new' is passed as an argument", async () => {
      process.argv = ["node", "index.js", "new", "project_name"];
      await main();
      expect(helpers.checkOptionType).toHaveBeenCalledTimes(1);
      expect(helpers.checkOptionType).toHaveBeenCalledWith("new");
      expect(Scaffolder).toHaveBeenCalledTimes(1);
      expect(createProject).toHaveBeenCalledTimes(1);
      expect(createProject).toHaveBeenCalledWith("project_name");
    });

    it("should call createStructure when 'gen' is passed as an argument", async () => {
      process.argv = ["node", "index.js", "gen", "command"];
      await main();
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
        await main();
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
        await main();
      } catch (err) {
        expect(err).toBeDefined();
        expect(checkOptionType).toHaveBeenCalled();
        expect(checkOptionType).toHaveBeenCalledWith("invalid");
      }
    });
  });
});
