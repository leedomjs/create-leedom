import path from 'node:path'
import process from 'node:process'
import { exec } from 'node:child_process'
import { log, note, outro, spinner } from '@clack/prompts'
import color from 'picocolors'
import degit from 'degit'
import { bugs } from '../package.json'
import type { NoteOption } from './types'

export default async function download({
  cache,
  url,
  projectName,
  clackType = 'template',
  message,
  title = 'Next steps.',
}: NoteOption) {
  const loading = spinner()
  loading.start('Downloading')

  const emitter = await degit(url, { cache })
  const target: string = path.join(projectName || '.', '')

  emitter.clone(target).then(async () => {
    const directory = path.resolve(process.cwd(), path.join('.', target))
    await exec('git init --initial-branch=main', { cwd: directory })
    loading.stop(color.green(('Succeed!')))
    clackType === 'template' ? note(message, title) : log.step(message)
    outro(`Problems? ${color.underline(color.cyan(`${bugs.url}`))}`)
  })
}
