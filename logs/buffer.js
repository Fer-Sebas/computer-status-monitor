export class LogBuffer {

  limit;
  logs;
  listeners;
  
  constructor(limit = 1000) {
    this.limit = limit;
    this.logs = [];
    this.listeners = new Set();
  }

  push(entry) {

    this.logs.push(entry);

    if (this.logs.length > this.limit) this.logs.shift();

    this.broadcast(entry);

  }

  tail(count = 100, type = null) {

    const logs = type ? this.logs.filter(log => log.type === type) : this.logs;
    
    return logs.slice(-count);

  }

  subscribe(client, filter = null) {

    client.filter = filter;

    this.listeners.add(client);

  }

  unsubscribe(clientOrRes) {
    for (const client of this.listeners) {
      if (client === clientOrRes || client.res === clientOrRes) {
        this.listeners.delete(client);
      }
    }
  }

  broadcast(entry) {
    for (const client of this.listeners) {
      if (client.filter && client.filter !== entry.type)
        continue;
      client.write(entry);
      }
  }

}

export default new LogBuffer(5000);