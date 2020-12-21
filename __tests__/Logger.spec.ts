import { SimpleLogger } from "../src/Logger";

describe("Logger", () => {
  const logger = SimpleLogger.getSimpleLogger();

  beforeEach(() => {});
  it("should be defined", () => {
    expect(logger).toBeDefined();
  });
  it("success", () => {
    logger.success("success");
  });
  it("error", () => {
    logger.error("error");
  });
  it("warning", () => {
    logger.warning("warning");
  });
  it("info", () => {
    logger.info("info");
  });
});
