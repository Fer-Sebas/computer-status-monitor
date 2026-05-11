import express from 'express';

import { broadcastTokenStore } from '../stores/broadcastTokenStore.js';
import { generateBroadcastToken } from '../auth/generateBroadcastToken.js';
import { rerollBroadcastToken } from '../auth/rerollBroadcastToken.js';

const router = express.Router();

router.get('/', (req, res) => {

    const list = Object.entries(broadcastTokenStore).map(([tokenId, data]) => { return data; });

    res.send(list);

});

router.post('/reroll', (req, res) => {

    const tokenId = req.body?.tokenId;

    if (!tokenId) {
        return res.status(400).send('Missing tokenId');
    }

    const newKey = rerollBroadcastToken(tokenId);

    if (!newKey) {
        return res.status(404).send('Key not found');
    }

    res.send(newKey);

});

router.post('/', (req, res) => {

    const tokenAlias = req.body?.name;

    if (!tokenAlias) {
        return res.status(400).json({ error: 'Missing name' });
    }

    const key = generateBroadcastToken(tokenAlias);

    broadcastTokenStore[key.tokenId] = {
        tokenAlias: tokenAlias,
        updatedAt: new Date(Date.now()).toLocaleString()
    };

    res.json({ key });
});

export default router;