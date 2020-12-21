import { PackageManager } from "../src/Manager";
import { getSlappeyConfig } from "../__mocks__";
import child_process from "child_process";

describe("PackageManager", () => {
  const manager = PackageManager.getPackageManager();
  const config = getSlappeyConfig();
  const fakePath = `C:\\Fake\\Directory\\app`;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.spyOn(child_process, "execSync").mockImplementation(jest.fn());
  });
  it("should be defined", () => {
    expect(manager).toBeDefined();
  });

  it("should throw an error if setup is called with no config set", async () => {
    try {
      await manager.setup();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it("should call initialize", async () => {
    await manager.initialize(config, fakePath);
  });

  it("should call setup when manager is set with yarn", async () => {
    jest.spyOn(manager, "initializeYarn").mockImplementation(() => {});
    jest.spyOn(manager, "initializeNPM").mockImplementation(() => {});
    await manager.setup();
    expect(manager.initializeYarn).toHaveBeenCalled();
    expect(manager.initializeNPM).not.toHaveBeenCalled();
  });

  it("should call setup with initializeNPM", async () => {
    jest.spyOn(manager, "initializeNPM").mockImplementation(() => {});
    jest.spyOn(manager, "initializeYarn").mockImplementation(() => {});
    config.manager = "npm";
    manager.initialize(config, fakePath);
    await manager.setup();
    expect(manager.initializeNPM).toHaveBeenCalled();
    expect(manager.initializeYarn).not.toHaveBeenCalled();
  });

  it("call initializeNPM", () => {
    jest.spyOn(manager, "installDependencies").mockImplementation(() => {});
    manager.initializeNPM();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith("npm init -y", {
      cwd: fakePath,
    });
    expect(manager.installDependencies).toHaveBeenCalledTimes(1);
  });

  it("call initializeYarn", () => {
    jest.spyOn(manager, "installDependencies").mockImplementation(() => {});
    config.manager = "yarn";
    manager.initialize(config, fakePath);
    manager.initializeYarn();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith("yarn init -y", {
      cwd: fakePath,
    });
    expect(manager.installDependencies).toHaveBeenCalledTimes(1);
  });

  it("should call installDependencies and call installTypes when language is typescript", () => {
    jest.spyOn(manager, "installDiscordJS").mockImplementation(jest.fn());
    jest.spyOn(manager, "installNodemon").mockImplementation(jest.fn());
    jest.spyOn(manager, "installTypes").mockImplementation(jest.fn());
    manager.installDependencies();
    expect(manager.installDiscordJS).toHaveBeenCalled();
    expect(manager.installNodemon).toHaveBeenCalled();
    expect(manager.installTypes).toHaveBeenCalled();
  });

  it("should call installDependencies and not call installTypes when language is javascript", () => {
    jest.spyOn(manager, "installDiscordJS").mockImplementation(jest.fn());
    jest.spyOn(manager, "installNodemon").mockImplementation(jest.fn());
    jest.spyOn(manager, "installTypes").mockImplementation(jest.fn());
    config.language = "javascript";
    manager.initialize(config, fakePath);
    manager.installDependencies();
    expect(manager.installDiscordJS).toHaveBeenCalled();
    expect(manager.installNodemon).toHaveBeenCalled();
    expect(manager.installTypes).not.toHaveBeenCalled();
  });

  it("should call installTypes", async () => {
    jest.spyOn(manager, "installTypescript").mockImplementation(jest.fn());
    jest.spyOn(manager, "installNodeTypes").mockImplementation(jest.fn());
    await manager.installTypes();
    expect(manager.installTypescript).toHaveBeenCalledTimes(1);
    expect(manager.installNodeTypes).toHaveBeenCalledTimes(1);
  });

  it("should call installTypescript with yarn", async () => {
    const cmd = "yarn add -D typescript";
    manager.installTypescript();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });

  it("should call installTypescript with npm", async () => {
    const cmd = "npm i -D typescript";
    config.manager = "npm";
    manager.initialize(config, fakePath);
    manager.installTypescript();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });

  it("should call installDiscordJS with npm", async () => {
    const cmd = "npm i discord.js@latest";
    manager.installDiscordJS();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
  it("should call installDiscordJS with yarn", async () => {
    const cmd = "yarn add discord.js@latest";
    config.manager = "yarn";
    manager.initialize(config, fakePath);
    manager.installDiscordJS();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
  it("should call installNodemon with yarn", async () => {
    const cmd = "yarn add -D nodemon";
    manager.installNodemon();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
  it("should call installNodemon with npm", async () => {
    const cmd = "npm i -D nodemon";
    config.manager = "npm";
    manager.initialize(config, fakePath);
    manager.installNodemon();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
  it("should call installNodeTypes with npm", async () => {
    const cmd = "npm i -D @types/node";
    manager.installNodeTypes();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
  it("should call installNodeTypes with yarn", async () => {
    const cmd = "yarn add -D @types/node";
    config.manager = "yarn";
    manager.initialize(config, fakePath);
    manager.installNodeTypes();
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(cmd, {
      cwd: fakePath,
      stdio: "ignore",
    });
  });
});
