import { log } from '@clack/prompts';

type Day = {
  [key: string]: string
}

// special days
export const specialDays: Day = {
  '11': `🎊  Happy New Year!`,
  '214': `💌  Happy Valentine's Day!`,
  '38': `👩  Happy Women's Day!`,
  '51': `💼  Happy Labor Day!`,
  '61': `👶  Happy Children's Day!`,
  '101': `🇨🇳  Happy National day!`, // Chinese National day
  '1225': `🎄  Merry Chrismas!`,
}

// show stinger
export function stinger(): void {
  const month = new Date().getMonth() + 1 + ''
  const day = new Date().getDay() + ''
  const date = month + day
  log.message(specialDays[date])
}
