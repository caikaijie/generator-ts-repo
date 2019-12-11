import Generator, { Answers } from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'
import path from 'path'
import sortPackageJSON from 'sort-package-json'
import { askForPackageName } from './package'
import fse from 'fs-extra'

export default class extends Generator {
    answers: Answers

    constructor(args: string | string[], options: {}) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, options)
        this.answers = {}
    }

    async prompting(): Promise<void> {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the ${chalk.red('generator-ts-repo')} generator!`)
        )

        // const prompts = [
        //     {
        //         type: 'input',
        //         name: 'repoName',
        //         message: 'Repo name?',
        //     },
        // ]
        // this.answers = await this.prompt(prompts)
        this.answers = await askForPackageName(this)

        this.log(`I don't have more questions, thanks. Let's Go!\n`)
    }

    writing(): void {
        // Relocate Root Dirs.
        const sourceRoot = path.join(this.sourceRoot(), '../../../')
        this.sourceRoot(sourceRoot)
        const destinationRoot = path.join(
            this.destinationRoot(),
            this.answers.repoName
        )
        fse.ensureDirSync(destinationRoot)

        this.destinationRoot(destinationRoot)

        // Copy configs, dotfiles and LICENSE.
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
        ]
        files.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file))
        })

        // Copy static files.
        this.fs.copy(
            this.templatePath('templates/src'),
            this.destinationPath('./src')
        )

        // Render README.md.
        this.fs.copyTpl(
            this.templatePath('templates/README.md'),
            this.destinationPath('README.md'),
            { repoName: this.answers.repoName }
        )

        // Render package.json
        const pkg: { name: string } = this.fs.readJSON(
            this.templatePath('templates/package.json')
        )
        pkg.name = this.answers.repoName
        const json = JSON.stringify(sortPackageJSON(pkg), null, 2)
        this.fs.write(this.destinationPath('package.json'), json)
    }

    install(): void {
        // Try to init git repo.
        const r = this.spawnCommandSync('git', ['init', '--quiet'], {
            cwd: this.destinationPath(),
        })

        if (r.error != undefined) {
            this.log(
                `${chalk.red(chalk.bold('Tip: '))} "git" not found, skipped.\n`
            )
        }

        const message = `Please install dependencies in your favorite way, thanks.`
        const hints = `(running "yarn" or "npm install")`
        this.log(
            yosay(message + '\n' + hints, {
                maxLength: message.length,
            })
        )
    }
}
