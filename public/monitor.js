const telemetry = document.getElementById('telemetry')

const stream = new EventSource('/logs/stream')

stream.onmessage = (event) => {
    const data = JSON.parse(event.data)

    const fans = Object.entries(data.fans || {})
        .map(([name, rpm]) => name + ': ' + Math.round(rpm) + ' RPM')
        .join('\n')

    const disks = (data.disks || [])
        .map(d =>
        `  ${d.name}
            TEMP: ${Number(d.temp || 0).toFixed(1)}°C
            SIZE: ${Number(d.total_gb || 0).toFixed(1)} GB - USED: ${Number(d.used_percent || 0).toFixed(1)}%
            LOAD: ${Number(d.activity || 0).toFixed(1)}% - R ${Number(d.read || 0).toFixed(2)} MB/s - W ${Number(d.write || 0).toFixed(2)} MB/s
            `
        )
        .join('\n\n')

    telemetry.textContent =
        `${data.cpu.name}\n` +
        `  TEMP: ${data.cpu.temp} °C\n` +
        `  LOAD: ${data.cpu.load}%\n\n` +

        `${data.gpu.name}\n` +
        `  TEMP: ${data.gpu.temp} °C\n` +
        `  LOAD: ${data.gpu.load}%\n\n` +

        `RAM:\n  LOAD: ${data.ram.load}% \n  USED: ${data.ram.used} GB\n  FREE: ${data.ram.free} GB\n\n` +

        `FANS:\n  ${fans}\n\n` +

        `DISKS:\n${disks}`
}