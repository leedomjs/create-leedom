import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import * as glob from 'glob'

/**
 * Check if there is duplicate directory
 */
export default function checkDuplicateDir(projectName: string): boolean {
  const list: string[] = glob.sync('*')
  if (list.length) {
    const hasDuplicateNameDir: Array<string> = list.filter((name: string) => {
      const fileName: string = path.resolve(process.cwd(), path.join('.', name))
      const isDir: boolean = fs.statSync(fileName).isDirectory()
      return name === projectName && isDir
    })
    return hasDuplicateNameDir.length > 0
  }
  return false
}
