#!/usr/bin/env node

import path from 'node:path';
import { banner, checkDuplicateDir } from './utils';
import { intro, outro, text, select, isCancel, cancel, note, spinner, log } from '@clack/prompts';
import color from 'picocolors';
import { choices } from './templates';
import degit from 'degit';
import { bugs } from '../package.json';

async function init() {
  console.clear()
  console.log();

  intro(banner('An easy way to create a new project - Powered by Leedom'));

	const month: number = new Date().getMonth()
	const day: number = new Date().getDay()
	// Chinese National day
	if (month === 9 && day === 1) {
		log.message('🇨🇳  Happy National day!')
	}

	const name = await text({
		message: 'Please input your project name:',
		placeholder: 'my-project',
		validate: (value) => {
      const existDirectoryName: string = path.resolve(process.cwd(), path.join('.', value))
			if (!value) return 'Input your project name first!';
			if (checkDuplicateDir(value)) return `Target directory ${color.underline(color.cyan(`${existDirectoryName}`))} already exists. Pick another name!`
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
	const target: string = path.join(name || '.', '')
	
	emitter.clone(target).then(async() => {
		s.stop(color.green(('Succeed!')));
		note(`cd ${target}\npnpm install\npnpm dev`, 'Next steps.');
		outro(`Problems? ${color.underline(color.cyan(`${bugs.url}`))}`)
	});
}

init().catch(console.error)

export default init
