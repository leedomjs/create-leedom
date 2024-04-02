import { isCancel, cancel } from '@clack/prompts';

export function onCancel(field: string, info?: string) {
  if (isCancel(field)) {
		cancel(info || 'Operation cancelled.');
		process.exit(0);
  }
}
