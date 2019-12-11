"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_npm_name_1 = __importDefault(require("inquirer-npm-name"));
const path_1 = __importDefault(require("path"));
function _getModuleNameParts(name) {
    if (name.startsWith('@')) {
        const nameParts = name.slice(1).split('/');
        return nameParts[1];
    }
    else {
        return name;
    }
}
exports._getModuleNameParts = _getModuleNameParts;
async function askForPackageName(i) {
    const anwsers = await inquirer_npm_name_1.default({
        name: 'repoName',
        default: path_1.default.basename(process.cwd()),
    }, i);
    anwsers.repoName = _getModuleNameParts(anwsers.repoName);
    return anwsers;
}
exports.askForPackageName = askForPackageName;
