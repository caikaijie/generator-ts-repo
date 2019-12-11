import askName from 'inquirer-npm-name'
import { Answers } from 'yeoman-generator'
import path from 'path'

export function _getModuleNameParts(name: string): string {
    if (name.startsWith('@')) {
        const nameParts = name.slice(1).split('/')
        return nameParts[1]
    } else {
        return name
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function askForPackageName(i: any): Promise<Answers> {
    const anwsers = await askName(
        {
            name: 'repoName',
            default: path.basename(process.cwd()),
        },
        i
    )

    anwsers.repoName = _getModuleNameParts(anwsers.repoName)
    return anwsers
}
