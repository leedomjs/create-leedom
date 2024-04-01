import gradient from 'gradient-string';

// 渐变色打印
const banner = gradient([
  { color: '#42d392', pos: 0 },
  { color: '#42d392', pos: 0.1 },
  { color: '#647eff', pos: 1 },
])

// CLI banner
const getBanner = () => {
  console.log();
  console.log(banner('An easy way to create a new project - Powered by Leedom'));
  console.log();
}

export { banner, getBanner }
