import * as glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Check if there is duplicate directory
 */
export const checkDuplicateDir = (projectName: string): boolean => {
  const list: string[] = glob.sync('*')
  if (list.length) {
    const hasDuplicateNameDir: Array<string> = list.filter((name: string) => {
      const fileName: string = path.resolve(process.cwd(), path.join('.', name))
      const isDir: boolean = fs.statSync(fileName).isDirectory()
      return name === projectName && isDir
    })
		return hasDuplicateNameDir.length > 0
  } else {
    return true
  }
}
