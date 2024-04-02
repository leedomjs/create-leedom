import { isCancel, cancel } from '@clack/prompts';

export function onCancel(field: string) {
  if (isCancel(field)) {
		cancel('Operation cancelled.');
		process.exit(0);
  }
}
