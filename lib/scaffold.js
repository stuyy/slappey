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
const prompts_1 = __importDefault(require("prompts"));
const path_1 = __importDefault(require("path"));
const questions_1 = require("./questions");
const filesystem_1 = require("./filesystem");
const templates_1 = require("./templates/templates");
const utils_1 = require("./utils");
const dir = process.cwd();
function createNewProject(name, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(dir, name);
        const dirExists = yield filesystem_1.exists(filePath);
        if (!dirExists) {
            // Create the project.
            try {
                yield filesystem_1.createDirectory(filePath);
                yield filesystem_1.createProjectDetailsFile(filePath, name, version);
                yield filesystem_1.initializeNPM(filePath);
                yield filesystem_1.installDiscordJS(filePath, version);
                yield filesystem_1.installDotenv(filePath);
                yield filesystem_1.createSrcFolder(filePath);
                // Need to copy templates.
                const { token, prefix } = yield prompts_1.default(questions_1.getCredentials);
                const env = templates_1.getEnvTemplate(token, prefix);
                yield filesystem_1.createEnvironmentFile(filePath, env);
                const main = templates_1.getMainFile();
                yield filesystem_1.createMainFile(filePath, main);
                yield filesystem_1.generateTemplates(filePath);
                yield filesystem_1.modifyPackageJSONFile(filePath);
                return true;
            }
            catch (err) {
                yield filesystem_1.deleteDirectory(filePath);
                return err;
            }
        }
        else {
            throw new Error('Cannot create file');
        }
    });
}
exports.createNewProject = createNewProject;
function generateNewCommand(commandName, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const slappeyFile = path_1.default.join(dir, 'slappey.json');
        const fileExists = yield filesystem_1.exists(slappeyFile);
        if (fileExists) {
            // Check if commands folder has category.
            // if it exists, create it in there, if not, create folder.
            const commandsPath = path_1.default.join(dir, 'src', 'commands', category);
            const categoryExists = yield filesystem_1.exists(commandsPath);
            if (categoryExists) {
                // Check if command already exists.
                const commandFile = `${utils_1.capitalize(commandName)}Command.js`;
                const commandFilePath = path_1.default.join(commandsPath, commandFile);
                const commandExists = yield filesystem_1.exists(commandFilePath);
                if (!commandExists)
                    return filesystem_1.createCommandFile(commandsPath, commandName, category);
                throw new Error(`Command already exists. ${commandFile}`);
            }
            yield filesystem_1.createDirectory(commandsPath);
            return filesystem_1.createCommandFile(commandsPath, commandName, category);
        }
        throw new Error('Not a slappey project');
    });
}
exports.generateNewCommand = generateNewCommand;
function generateNewEvent(eventName, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const slappeyFile = path_1.default.join(dir, 'slappey.json');
        const fileExists = yield filesystem_1.exists(slappeyFile);
        if (fileExists) {
            const eventPath = path_1.default.join(dir, 'src', 'events', category);
            const categoryExists = yield filesystem_1.exists(eventPath);
            if (categoryExists) {
                const eventFile = `${utils_1.capitalize(eventPath)}Event.js`;
                const eventFilePath = path_1.default.join(eventPath, eventFile);
                const commandExists = yield filesystem_1.exists(eventFilePath);
                if (!commandExists)
                    return filesystem_1.createCommandFile(eventPath, eventName, category);
                throw new Error(`Event already exists. ${eventFile}`);
            }
            yield filesystem_1.createDirectory(eventPath);
            return filesystem_1.createCommandFile(eventPath, eventName, category);
        }
        throw new Error('Not a slappey project');
    });
}
