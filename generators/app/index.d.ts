import Generator, { Answers } from 'yeoman-generator';
export default class extends Generator {
    answers: Answers;
    constructor(args: string | string[], options: {});
    prompting(): Promise<void>;
    writing(): void;
    install(): void;
}
