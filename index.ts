#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { exec } from 'node:child_process'
import { intro, note, outro, select, spinner, text } from '@clack/prompts'
import color from 'picocolors'
import degit from 'degit'
import { banner, info } from './utils/intro'
import { checkDuplicateDir } from './utils/checkDuplicateDir'
import { stinger } from './utils/stinger'
import { choices } from './utils/choices'
import { bugs } from './package.json'
import { onCancel } from './utils/clack'

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

  const type = await select({
    message: 'Select template type:',
    options: choices['type'],
  }) as string
  onCancel(type)

  const url = await select({
    message: 'Select template:',
    options: choices[type as string],
  }) as string
  onCancel(url)

  const s = spinner()
  s.start('Downloading')

  const emitter = degit(url, {
    cache: false,
    force: true,
    verbose: true,
  })
  const target: string = path.join(name as string || '.', '')

  emitter.clone(target).then(async () => {
    const directory = path.resolve(process.cwd(), path.join('.', target))
    await exec('git init', { cwd: directory })
    s.stop(color.green(('Succeed!')))
    note(`cd ${target}\npnpm install\npnpm dev`, 'Next steps.')
    outro(`Problems? ${color.underline(color.cyan(`${bugs.url}`))}`)
  })
}

init().catch(console.error)

export default init
