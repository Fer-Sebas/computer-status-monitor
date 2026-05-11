class LogBuffer {
  constructor(limit = 1000) {
    this.limit = limit
    this.logs = []
    this.listeners = new Set()
  }

  push(type, data) {
    const entry = {
      type,
      time: Date.now(),
      data
    }

    this.logs.push(entry)

    if (this.logs.length > this.limit) {
      this.logs.shift()
    }

    this.broadcast(entry)
  }

  tail(count = 100, type = null) {
    const logs = type
      ? this.logs.filter(log => log.type === type)
      : this.logs

    return logs.slice(-count)
  }

  subscribe(client, filter = null) {
  client.filter = filter
  this.listeners.add(client)
}

  unsubscribe(res) {
    for (const client of this.listeners) {
      if (client.res === res) {
        this.listeners.delete(client)
      }
    }
  }

  broadcast(entry) {
  for (const client of this.listeners) {
    if (client.filter && client.filter !== entry.type) {
      continue
    }

    client.write(entry)
  }
}
}

export default new LogBuffer(5000)