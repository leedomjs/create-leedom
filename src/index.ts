#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { banner } from './utils';
import p, { intro, outro, text, select, isCancel, cancel, spinner } from '@clack/prompts';
import color from 'picocolors';
import { choices } from './templates';
import degit from 'degit';
import glob from 'glob';
import { bugs } from '../package.json';

/**
 * Check if there is duplicate directory
 */
export function checkDuplicateDir(projectName: string): boolean {
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

async function init() {
  console.clear()
  console.log();

  intro(banner('An easy way to create a new project - Powered by Leedom'));

	const name = await text({
		message: 'Please input your project name:',
		placeholder: 'my-project',
		validate: (value) => {
      const existDirectoryName = path.resolve(process.cwd(), path.join('.', value))
			if (!value) return 'Input your project name first!';
			if (checkDuplicateDir(value)) return `当前目录 ${color.underline(color.cyan(`${existDirectoryName}`))} 已经存在，请另起项目名!`
		},
	})
	if (isCancel(name)) {
		cancel('Operation cancelled.');
		process.exit(0);
	}

	const type = await select({
		message: `Select template type:`,
		options: choices['type'],
	})
	if (isCancel(type)) {
		cancel('Operation cancelled.');
		process.exit(0);
	}

	const url = await select({
		message: `Select template:`,
		options: choices[type as string],
	})
	if (isCancel(url)) {
		cancel('Operation cancelled.');
		process.exit(0);
	}
	
	const s = spinner();
	s.start('Downloading');
	
	const emitter = degit(url, {
		cache: false,
		force: true,
		verbose: true,
	});
	const target = path.join(name || '.', '')
	
	emitter.clone(target).then(async() => {
		s.stop('Succeed!');
		p.note(`cd ${target}\npnpm install\npnpm dev`, 'Next steps.');
		outro(`Problems? ${color.underline(color.cyan(`${bugs.url}`))}`)
	});
}

init().catch(console.error)
