"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = __importDefault(require("chalk"));
const yosay_1 = __importDefault(require("yosay"));
const path_1 = __importDefault(require("path"));
const sort_package_json_1 = __importDefault(require("sort-package-json"));
const package_1 = require("./package");
const fs_extra_1 = __importDefault(require("fs-extra"));
class default_1 extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.answers = {};
    }
    async prompting() {
        this.log(yosay_1.default(`Welcome to the ${chalk_1.default.red('generator-ts-repo')} generator!`));
        this.answers = await package_1.askForPackageName(this);
        this.log(`I don't have more questions, thanks. Let's Go!\n`);
    }
    writing() {
        const sourceRoot = path_1.default.join(this.sourceRoot(), '../../../');
        this.sourceRoot(sourceRoot);
        const destinationRoot = path_1.default.join(this.destinationRoot(), this.answers.repoName);
        fs_extra_1.default.ensureDirSync(destinationRoot);
        this.destinationRoot(destinationRoot);
        const files = [
            '.editorconfig',
            '.eslintignore',
            '.eslintrc.js',
            '.gitattributes',
            '.gitignore',
            '.prettierrc',
            '.travis.yml',
            '.vscode',
            'commitlint.config.js',
            'jest.config.js',
            'LICENSE',
            'tsconfig.json',
        ];
        files.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });
        this.fs.copy(this.templatePath('templates/src'), this.destinationPath('./src'));
        this.fs.copyTpl(this.templatePath('templates/README.md'), this.destinationPath('README.md'), { repoName: this.answers.repoName });
        const pkg = this.fs.readJSON(this.templatePath('templates/package.json'));
        pkg.name = this.answers.repoName;
        const json = JSON.stringify(sort_package_json_1.default(pkg), null, 2);
        this.fs.write(this.destinationPath('package.json'), json);
    }
    install() {
        const r = this.spawnCommandSync('git', ['init', '--quiet'], {
            cwd: this.destinationPath(),
        });
        if (r.error != undefined) {
            this.log(`${chalk_1.default.red(chalk_1.default.bold('Tip: '))} "git" not found, skipped.\n`);
        }
        const message = `Please install dependencies in your favorite way, thanks.`;
        const hints = `(running "yarn" or "npm install")`;
        this.log(yosay_1.default(message + '\n' + hints, {
            maxLength: message.length,
        }));
    }
}
exports.default = default_1;
