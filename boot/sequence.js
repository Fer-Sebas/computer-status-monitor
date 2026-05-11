import colors from './colors.js';

import { delay, randomDelay } from './utils.js';

const boot = async (text, color = colors.cyan, minTime = 1200, maxTime = 3200) => {
    const frames = ['◢', '◣', '◤', '◥'];
    let i = 0;
    const duration = randomDelay(minTime, maxTime);
    const start = Date.now();
    while (Date.now() - start < duration) {
        process.stdout.write(`\r${color}${frames[i]}${colors.reset} ${text}   `);
        await delay(randomDelay(60, 140));
        i = (i + 1) % frames.length;
    }
    process.stdout.write(`\r${colors.gray}◆${colors.gray} ${text} ${colors.green}[OK]${colors.reset}\n`);
    await delay(randomDelay(100, 600));
};
const runBootSequence = async (port) => {
    console.clear();
    console.log(String.raw `${colors.gray}
ʜ ʏ ᴘ ʀ ᴅ ʏ ɴ ᴇ
┌─┐┌─┐╷  ┌─┐┌─┐╷┌─┐   
├─┘│ ││  ├─┤├┬┘│└─┐  
╵  └─┘└─╴╵ ╵╵└╴╵└─┘    
${colors.reset}`);
    await delay(randomDelay(200, 400));
    process.stdout.write(`${colors.yellow}> Boot sequence initiated.\n\n`);
    await delay(randomDelay(500, 700));
    process.stdout.write(`${colors.reset}> Calibrating telemetry beacon instance.\n\n`);
    await delay(randomDelay(200, 400));
    await boot('Initializing network protocols', colors.yellow, 1100, 2000);
    await boot('Resolving credentials provider', colors.yellow, 1000, 2100);
    process.stdout.write(`\n${colors.green}> Telemetry beacon calibration complete.\n`);
    await delay(randomDelay(500, 1500));
    process.stdout.write(`${colors.green}\n> Stable navigation vector established :: PORT ${port}${colors.reset}\n`);
    await delay(randomDelay(800, 1000));
    console.log(`\n${colors.cyan}> All systems operational.${colors.reset}\n`);
};
export default runBootSequence;
