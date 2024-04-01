import gradient from 'gradient-string';
import glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';

// 渐变色打印
const banner = (message: string) => gradient([
  { color: '#42d392', pos: 0 },
  { color: '#42d392', pos: 0.1 },
  { color: '#647eff', pos: 1 },
])(message)

// CLI banner
const getBanner = (message: string) => {
  console.log();
  console.log(banner(message));
  console.log();
}

/**
 * Check if there is duplicate directory
 */
const checkDuplicateDir = (projectName: string): boolean => {
  const list = glob.sync('*')
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

export { banner, getBanner, checkDuplicateDir }
