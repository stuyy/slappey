import { Prompter } from "../src/Prompter";
import * as prompts from "prompts";
jest.mock("prompts", () =>
  jest.fn(() => ({
    language: "typescript",
    packageManager: "yarn",
    command: { name: "kick", category: "mod" },
    event: ["message"],
    credentials: { token: "123", prefix: "!" },
  }))
);
describe("Prompter", () => {
  const prompter: Prompter = Prompter.getPrompter();
  beforeEach(() => jest.clearAllMocks());
  it("should call language", async () => {
    await prompter.language();
    expect(prompts).toHaveBeenCalledTimes(1);
  });
  it("should call packageManager", async () => {
    await prompter.packageManager();
    expect(prompts).toHaveBeenCalledTimes(1);
  });
  it("should call command", async () => {
    await prompter.command();
    expect(prompts).toHaveBeenCalledTimes(1);
  });
  it("should call event", async () => {
    await prompter.event();
    expect(prompts).toHaveBeenCalledTimes(1);
  });
  it("should call credentials", async () => {
    await prompter.credentials();
    expect(prompts).toHaveBeenCalledTimes(1);
  });
});
