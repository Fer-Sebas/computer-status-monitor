const buffer = require('./buffer')

module.exports = {
  info(message, meta) {
    buffer.push('info', message, meta)
  },

  warn(message, meta) {
    buffer.push('warn', message, meta)
  },

  error(message, meta) {
    buffer.push('error', message, meta)
  }
}