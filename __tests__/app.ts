'use strict'
import path from 'path'
import helpers from 'yeoman-test'
import dirTree, { DirectoryTree } from 'directory-tree'
import treeify from 'treeify'
import fs from 'fs'

function treeify_(t: DirectoryTree): string {
    const convert = (
        p: treeify.TreeObject,
        node: DirectoryTree
    ): treeify.TreeObject => {
        if (node) {
            let c: treeify.TreeObject = {}
            if (node.children) {
                node.children.forEach(v => {
                    c = convert(c, v)
                })
            }

            p[node.name] = c
            return p
        }

        return {}
    }

    const tj = convert({}, t)

    return treeify.asTree(tj, true, false)
}

describe('generator-ts-repo:app', () => {
    let tmpDir = ''
    const repoName = 'e2e-test0000'

    beforeAll(() => {
        return helpers
            .run(path.join(__dirname, '../generators/app'))
            .withPrompts({ repoName })
            .inTmpDir(dir => {
                tmpDir = dir
            })
    })

    it('creates structure', () => {
        expect(
            treeify_(
                dirTree(path.join(tmpDir, repoName), {
                    normalizePath: true,
                    exclude: /.git\/.*/,
                })
            )
        ).toMatchSnapshot('directory structure')
    })

    it('creates packages.json', () => {
        const content: string = fs
            .readFileSync(path.join(tmpDir, repoName, 'package.json'))
            .toString()
        expect(content).toMatchSnapshot('package.json content')
    })
})
