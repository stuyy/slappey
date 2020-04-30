"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const templates_1 = require("./templates/templates");
const utils_1 = require("./utils");
const dir = process.cwd();
function exists(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(filePath);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.exists = exists;
function createProjectDetailsFile(filePath, name, version) {
    const slappey = {
        name,
        version,
    };
    return fs_1.promises.writeFile(path_1.default.join(filePath, 'slappey.json'), JSON.stringify(slappey, null, 2));
}
exports.createProjectDetailsFile = createProjectDetailsFile;
function createDirectory(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fs_1.promises.mkdir(filePath);
        }
        catch (err) {
            return err;
        }
    });
}
exports.createDirectory = createDirectory;
function createSrcFolder(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fs_1.promises.mkdir(path_1.default.join(filePath, 'src'));
        }
        catch (err) {
            return err;
        }
    });
}
exports.createSrcFolder = createSrcFolder;
function createEnvironmentFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fs_1.promises.writeFile(path_1.default.join(filePath, '.env'), data);
        }
        catch (err) {
            return err;
        }
    });
}
exports.createEnvironmentFile = createEnvironmentFile;
function createMainFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'bot.js'), data);
    });
}
exports.createMainFile = createMainFile;
function getFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = yield fs_1.promises.readFile(filePath, 'utf8');
        const json = JSON.parse(text);
        return json;
    });
}
exports.getFile = getFile;
function generateTemplates(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'utils'));
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'utils', 'structures'));
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'utils', 'registry.js'), templates_1.getRegistryFile());
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'utils', 'structures', 'BaseCommand.js'), templates_1.getBaseCommand());
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'utils', 'structures', 'BaseEvent.js'), templates_1.getBaseEvent());
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'commands'));
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'events'));
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'commands', 'test'));
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'events', 'ready'));
            yield fs_1.promises.mkdir(path_1.default.join(filePath, 'src', 'events', 'message'));
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'events', 'ready', 'ready.js'), templates_1.getReadyEvent());
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'events', 'message', 'message.js'), templates_1.getMessageEvent());
            yield fs_1.promises.writeFile(path_1.default.join(filePath, 'src', 'commands', 'test', 'TestCommand.js'), templates_1.getTestCommand());
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.generateTemplates = generateTemplates;
function createCommandFile(filePath, name, category) {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.promises.writeFile(path_1.default.join(filePath, `${utils_1.capitalize(name)}Command.js`), templates_1.getCommandTemplate(name, category));
    });
}
exports.createCommandFile = createCommandFile;
function modifyPackageJSONFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield fs_1.promises.readFile(path_1.default.join(filePath, 'package.json'), 'utf8');
        const json = JSON.parse(buffer);
        json.scripts.dev = 'nodemon ./src/bot.js';
        json.scripts.start = 'node ./src/bot.js';
        return fs_1.promises.writeFile(path_1.default.join(filePath, 'package.json'), JSON.stringify(json, null, 2));
    });
}
exports.modifyPackageJSONFile = modifyPackageJSONFile;
function deleteDirectory(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.promises.rmdir(filePath, {
            recursive: true,
        });
    });
}
exports.deleteDirectory = deleteDirectory;
function initializeNPM(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return child_process_1.execSync('npm init -y', {
            cwd: filePath,
        });
    });
}
exports.initializeNPM = initializeNPM;
function installDiscordJS(filePath, version) {
    return __awaiter(this, void 0, void 0, function* () {
        return child_process_1.execSync(`npm i discord.js@${version}`, {
            cwd: filePath,
        });
    });
}
exports.installDiscordJS = installDiscordJS;
function installDotenv(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return child_process_1.execSync('npm i dotenv', {
            cwd: filePath,
        });
    });
}
exports.installDotenv = installDotenv;
