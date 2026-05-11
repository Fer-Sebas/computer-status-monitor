// src/logs/logger.js

import { LogBuffer } from './buffer.js';

const logBuffer = new LogBuffer(5000);

const logger = {

    info(message, meta) {
      logBuffer.push({ type: 'info', message, timestamp: Date.now(), meta });
    },
    warn(message, meta) {
      logBuffer.push({ type: 'warn', message, timestamp: Date.now(), meta });
    },
    error(message, meta) {
      logBuffer.push({ type: 'error', message, timestamp: Date.now(), meta });
    }

};

export default logger;