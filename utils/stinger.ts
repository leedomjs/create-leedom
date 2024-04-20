import { log } from '@clack/prompts'
import type { Day } from './types'

// special days
export const specialDays: Day = {
  11: '🎊  Happy New Year!',
  214: '💌  Happy Valentine\'s Day!',
  38: '👩  Happy Women\'s Day!',
  51: '💼  Happy Labor Day!',
  61: '👶  Happy Children\'s Day!',
  101: '🇨🇳  Happy National day!', // Chinese National day
  1225: '🎄  Merry Christmas!',
}

// show stinger
export default function stinger(): void {
  const month = `${new Date().getMonth() + 1}`
  const day = `${new Date().getDate()}`
  const date = month + day
  specialDays[date] && log.message(specialDays[date])
}
