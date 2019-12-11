# generator-ts-repo [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Generate a git repository with Node and Typescript.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ts-repo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ts-repo
```

Then generate your new project:

```bash
yo ts-repo
```

## Getting To Know Yeoman

* Yeoman has a heart of gold.
* Yeoman is a person with feelings and opinions, but is very easy to work with.
* Yeoman can be too opinionated at times but is easily convinced not to be.
* Feel free to [learn more about Yeoman](http://yeoman.io/).

## What do you get

Scaffolds out a complete Nodejs repository structure for you:

```bash
└─ repo
   ├─ .editorconfig
   ├─ .eslintignore
   ├─ .eslintrc.js
   ├─ .git
   ├─ .gitattributes
   ├─ .gitignore
   ├─ .prettierrc
   ├─ .travis.yml
   ├─ .vscode
   │  └─ settings.json
   ├─ LICENSE
   ├─ README.md
   ├─ commitlint.config.js
   ├─ jest.config.js
   ├─ package.json
   ├─ src
   │  ├─ example.spec.ts
   │  └─ example.ts
   └─ tsconfig.json
```

Build with:

* Typescript
* eslint
* prettier
* jest
* husky
* lint-staged
* commitizen

## License

MIT © [caikaijie](caikaijie@gmail.com)

[npm-image]: https://badge.fury.io/js/generator-ts-repo.svg
[npm-url]: https://npmjs.org/package/generator-ts-repo
[travis-image]: https://travis-ci.com/caikaijie/generator-ts-repo.svg?branch=master
[travis-url]: https://travis-ci.com/caikaijie/generator-ts-repo
[daviddm-image]: https://david-dm.org/caikaijie/generator-ts-repo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/caikaijie/generator-ts-repo
