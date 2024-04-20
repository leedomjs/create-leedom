import { exec } from 'node:child_process'
import { lt } from 'semver'
import { note, spinner } from '@clack/prompts'
import color from 'picocolors'
import isOnline from 'is-online'
import { name, version } from '../package.json'

export default async function checkNewVersion(): Promise<void> {
  const loading = spinner()
  loading.start('Check latest version')
  const online = await isOnline()
  return new Promise((resolve, reject) => {
    if (online) {
      exec(`npm view ${name} version`, (error, stdout) => {
        if (error) {
          reject(error)
        }
        const latestVersion = stdout.slice(0, -1)

        if (lt(version, latestVersion)) {
          loading.stop(`${color.yellow(`v${latestVersion}`)} is available. You can upgrade ${color.green(`v${version}`)} -> ${color.red(`v${latestVersion}`)}`, 2)
        } else {
          loading.stop(`v${version}: latest version now.`)
        }
        resolve()
      })
    } else {
      loading.stop('You are offline, couldn\'t check latest version. ', 2)
      note(`v${version}`, 'Local version')
      resolve()
    }
  })
}
