import process from 'node:process'
import { cancel, confirm, isCancel } from '@clack/prompts'

export type FieldType = string | boolean

export function useCancel(field: FieldType, info?: string): void {
  if (isCancel(field)) {
    cancel(info || 'Operation cancelled.')
    process.exit(0)
  }
}

export async function useCache(): Promise<boolean> {
  const cache = await confirm({
    message: 'Use cache?',
    initialValue: false,
  }) as boolean
  return cache
}
