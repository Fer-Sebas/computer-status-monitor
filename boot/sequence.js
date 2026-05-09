const colors = require('./colors')
const { delay, randomDelay } = require('./utils')

const boot = async (
  text,
  color = colors.cyan,
  minTime = 1200,
  maxTime = 3200
) => {
  const frames = ['◢', '◣', '◤', '◥']

  let i = 0

  const duration = randomDelay(minTime, maxTime)

  const start = Date.now()

  while (Date.now() - start < duration) {
    process.stdout.write(
      `\r${color}${frames[i]}${colors.reset} ${text}   `
    )

    await delay(randomDelay(60, 140))

    i = (i + 1) % frames.length
  }

  process.stdout.write(
    `\r${colors.green}◆${colors.reset} ${text} ${colors.green}[OK]${colors.reset}\n`
  )

  await delay(randomDelay(100, 600))
}

const runBootSequence = async port => {
  console.clear()

  console.log(`${colors.magenta}
██╗  ██╗██╗   ██╗██████╗ ██████╗ ███████╗██████╗  █████╗  ██████╗███████╗
██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝
███████║ ╚████╔╝ ██████╔╝██████╔╝███████╗██████╔╝███████║██║     █████╗
██╔══██║  ╚██╔╝  ██╔═══╝ ██╔══██╗╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝
██║  ██║   ██║   ██║     ██║  ██║███████║██║     ██║  ██║╚██████╗███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝
${colors.reset}`)

  process.stdout.write(
    `${colors.reset}> Boot sequence initiated.\n\n`
  )

  await boot('Calibrating Hyprdrive', colors.yellow, 2500, 3000)

  await boot('Mapping Hyprspace lanes', colors.yellow, 1800, 2000)

  await boot('Resolving network interference', colors.yellow, 3000, 3300)

  process.stdout.write(
    `${colors.green}\n> Stable navigation vector established :: PORT ${port}${colors.reset}\n\n`
  )

  await delay(randomDelay(500, 1500))

  process.stdout.write(
    `${colors.green}> Navigation lock confirmed.\n\n`
  )

  await delay(randomDelay(500, 1500))
  
  process.stdout.write(
    `${colors.green}> Hyprdrive calibration complete.\n`
  )

  await delay(randomDelay(800, 1000))

  console.log(`\n${colors.magenta}> Engage.${colors.reset}\n`)
}

module.exports = runBootSequence