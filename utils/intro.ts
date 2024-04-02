import gradient from 'gradient-string'

export const info: string = 'An easy way to create a new project - Powered by Leedom'

// gradient info
export function banner(message: string) {
  return gradient([
    { color: '#42d392', pos: 0 },
    { color: '#42d392', pos: 0.1 },
    { color: '#647eff', pos: 1 },
  ])(message)
}

// banner
export function getBanner(message: string) {
  console.log()
  console.log(banner(message))
  console.log()
}
