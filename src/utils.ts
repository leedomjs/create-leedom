import gradient from 'gradient-string';
import glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';

// 渐变色打印
const banner = gradient([
  { color: '#42d392', pos: 0 },
  { color: '#42d392', pos: 0.1 },
  { color: '#647eff', pos: 1 },
])

// CLI banner
const getBanner = () => {
  console.log();
  console.log(banner('An easy way to create a new project - Powered by Leedom'));
  console.log();
}


/**
 * Check if there is duplicate directory
 */
const checkDuplicateDir = (projectName: string): boolean => {
  const list = glob.sync('*')
  if (list.length) {
    const hasDuplicateNameDir = list.filter((name) => {
      const fileName = path.resolve(process.cwd(), path.join('.', name))
      const isDir = fs.statSync(fileName).isDirectory()
      return name === projectName && isDir
    })
		return hasDuplicateNameDir.length > 0
  } else {
    return true
  }
}

export { banner, getBanner, checkDuplicateDir }
