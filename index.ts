#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { intro, select, text } from '@clack/prompts'
import color from 'picocolors'
import { banner, info } from './utils/intro'
import { checkDuplicateDir } from './utils/checkDuplicateDir'
import { stinger } from './utils/stinger'
import { choices } from './utils/choices'
import { onCancel } from './utils/clack'
import { download } from './utils/download'

async function init() {
  console.clear()
  console.log()

  intro(banner(info))

  await stinger()

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
  onCancel(name)

  const operate = await select({
    message: 'Select operation:',
    options: choices['operate'],
  }) as string
  onCancel(operate)

  operate === 'template' ? defaultAction(name, operate) : remoteRepo(name, operate)
}

// select remote repo
async function remoteRepo(projectName: string, clackType: string) {
  const repoLink = await text({
    message: 'Input the repo link you want:',
    placeholder: 'leedom92/vue-h5-template',
    validate: (value) => {
      if (!value) {
        return 'Please input the repo link!'
      }
    },
  }) as string
  onCancel(repoLink)

  const directory: string = path.resolve(process.cwd(), path.join(projectName || '.', ''))
  await download({
    url: repoLink,
    projectName,
    clackType,
    message: `Please refer to ${color.underline(color.cyan(`${directory}/README.md`))} to start the project.`,
  })
}

// select default template
async function defaultAction(projectName: string, clackType: string) {
  const type = await select({
    message: 'Select template type:',
    options: choices['type'],
  }) as string
  onCancel(type)

  const url = await select({
    message: 'Select template:',
    options: choices[type],
  }) as string
  onCancel(url)

  const target: string = path.join(projectName || '.', '')
  await download({
    url,
    projectName,
    clackType,
    message: `cd ${target}\npnpm install\npnpm dev`,
  })
}

init().catch(console.error)

export default init
