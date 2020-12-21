import * as templates from "../src/templates/templates";

describe("Templates", () => {
  it("should match envTemplate", () => {
    expect(templates.getEnvTemplate("123", "123")).toMatchSnapshot();
  });
  it("should match getMainFile", () => {
    expect(templates.getMainFile()).toMatchSnapshot();
  });
  it("should match getMainFileTS", () => {
    expect(templates.getMainFileTS()).toMatchSnapshot();
  });
  it("should match getTypescriptBotFile", () => {
    expect(templates.getTypescriptBotFile()).toMatchSnapshot();
  });
  it("should match getRegistryFileTS", () => {
    expect(templates.getRegistryFileTS()).toMatchSnapshot();
  });
  it("should match getRegistryFile", () => {
    expect(templates.getRegistryFile()).toMatchSnapshot();
  });
  it("should match getBaseCommand", () => {
    expect(templates.getBaseCommand()).toMatchSnapshot();
  });
  it("should match getBaseCommandTS", () => {
    expect(templates.getBaseCommandTS()).toMatchSnapshot();
  });
  it("should match getBaseEvent", () => {
    expect(templates.getBaseEvent()).toMatchSnapshot();
  });
  it("should match getBaseEventTS", () => {
    expect(templates.getBaseEventTS()).toMatchSnapshot();
  });
  it("should match getReadyEvent", () => {
    expect(templates.getReadyEvent()).toMatchSnapshot();
  });
  it("should match getReadyEventTS", () => {
    expect(templates.getReadyEventTS()).toMatchSnapshot();
  });
  it("should match getMessageEvent", () => {
    expect(templates.getMessageEvent()).toMatchSnapshot();
  });
  it("should match getMessageEventTS", () => {
    expect(templates.getMessageEventTS()).toMatchSnapshot();
  });
  it("should match getTestCommand", () => {
    expect(templates.getTestCommand()).toMatchSnapshot();
  });
  it("should match getTestCommandTS", () => {
    expect(templates.getTestCommandTS()).toMatchSnapshot();
  });
  it("should match getCommandTemplate", () => {
    expect(templates.getCommandTemplate("Ban", "mod")).toMatchSnapshot();
  });
  it("should match getCommandTemplateTS", () => {
    expect(templates.getCommandTemplateTS("Kick", "mod")).toMatchSnapshot();
  });
});
