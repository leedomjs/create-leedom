/**
 * fix directory path in Windows
 */
export default function fixDirectoryPath(directory: string): string {
  return directory.replaceAll('\\', '/')
}
