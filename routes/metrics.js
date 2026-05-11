import express from 'express';
import LogBuffer from '../logs/buffer.js';
import { requireBroadcastToken } from '../auth/requireBraodcastToken.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(LogBuffer.tail(2));
});

router.post('/', requireBroadcastToken, (req, res) => {
    const entry = {
        type: 'metrics',
        timestamp: Date.now(),
        transponder: req.apiKey.keyId,
        data: req.body
    };
    LogBuffer.push(entry);
    res.sendStatus(200);
});

export default router;