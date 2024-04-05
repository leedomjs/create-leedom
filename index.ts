#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { intro, select, text } from '@clack/prompts'
import color from 'picocolors'
import { banner, info } from './utils/intro'
import { checkDuplicateDir } from './utils/checkDuplicateDir'
import { stinger } from './utils/stinger'
import { choices } from './utils/choices'
import { useCache, useCancel } from './utils/clack'
import { download } from './utils/download'

async function init() {
  console.clear()
  console.log()

  intro(banner(info))

  await stinger()

  // Project name
  const name = await text({
    message: 'Please input your project name:',
    placeholder: 'my-project',
    validate: (value) => {
      const existDirectoryName: string = path.resolve(process.cwd(), path.join('.', value))
      if (!value) {
        return 'Input your project name first!'
      }
      if (checkDuplicateDir(value)) {
        return `Target directory ${color.underline(color.cyan(`${existDirectoryName}`))} already exists. Pick another name!`
      }
    },
  }) as string
  useCancel(name)

  // Select template or remote
  const operate = await select({
    message: 'Select operation:',
    options: choices['operate'],
  }) as string
  useCancel(operate)

  // Do different action
  operate === 'template' ? defaultAction(name, operate) : remoteRepo(name, operate)
}

/**
 * remote repo
 */
async function remoteRepo(projectName: string, clackType: string) {
  // Repo link
  const repoLink = await text({
    message: 'Input the repo link you want:',
    placeholder: 'leedom92/vue-h5-template',
    validate: (value) => {
      if (!value) {
        return 'Please input the repo link!'
      }
    },
  }) as string
  useCancel(repoLink)

  // Use cache?
  const cache = await useCache()
  useCancel(cache)

  const directory: string = path.resolve(process.cwd(), path.join(projectName || '.', ''))

  // download
  await download({
    cache,
    url: repoLink,
    projectName,
    clackType,
    message: `Please refer to ${color.underline(color.cyan(`${directory}/README.md`))} to start the project.`,
  })
}

/**
 * default template
 */
async function defaultAction(projectName: string, clackType: string) {
  // Select template type
  const type = await select({
    message: 'Select template type:',
    options: choices['type'],
  }) as string
  useCancel(type)

  // Select template
  const url = await select({
    message: 'Select template:',
    options: choices[type],
  }) as string
  useCancel(url)

  // Use cache?
  const cache = await useCache()
  useCancel(cache)

  const target: string = path.join(projectName || '.', '')

  // download
  await download({
    cache,
    url,
    projectName,
    clackType,
    message: `cd ${target}\npnpm install\npnpm dev`,
  })
}

init().catch(console.error)

export default init
