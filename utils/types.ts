/**
 * Stinger key: value
 * for example:
 * 101: '🇨🇳  Happy National day!'
 */
export interface Day {
  [key: string]: string
}

/**
 * clack choice
 */
export interface Choice {
  label: string
  value: string
  hint?: string
}

/**
 * clack choiceList
 */
export interface ChoiceList {
  [key: string]: Choice[]
}
