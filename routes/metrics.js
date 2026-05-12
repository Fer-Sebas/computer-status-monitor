import express from 'express';
import LogBuffer from '../logs/buffer.js';
import { requireBroadcastToken } from '../auth/requireBraodcastToken.js';

const router = express.Router();

router.get('/', (req, res) => {
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Flush headers immediately
  res.flushHeaders?.();

  // Send initial state
  res.write(
    `data: ${JSON.stringify(LogBuffer.tail(2))}\n\n`
  );

  // Send updates every second
  const interval = setInterval(() => {
    const payload = LogBuffer.tail(2);

    res.write(
      `data: ${JSON.stringify(payload)}\n\n`
    );
  }, 1000);

  // Cleanup on disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

router.post('/', requireBroadcastToken, (req, res) => {
    const entry = {
        type: 'metrics',
        timestamp: Date.now(),
        broadcastToken: req.apiKey.keyId,
        data: req.body
    };
    LogBuffer.push(entry);
    res.sendStatus(200);
});

export default router;