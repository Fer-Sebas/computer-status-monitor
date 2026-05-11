import crypto from "crypto";

import "dotenv/config";

import { broadcastTokenStore } from "../stores/broadcastTokenStore.js";

const SECRET = process.env.MASTER_KEY_SEED;
if (!SECRET)
    throw new Error('MASTER_KEY_SEED is not set');

export function rerollBroadcastToken(oldBroadcastToken) {

    const existing = broadcastTokenStore[oldBroadcastToken];

    if (!existing) { return null;}

    // generate new tokenId
    const newTokenId = crypto.randomBytes(6).toString("hex");
    
    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(newTokenId)
        .digest("hex");

    // delete old entry
    delete broadcastTokenStore[oldBroadcastToken];

    // insert new entry with same identity
    broadcastTokenStore[newTokenId] = {
        tokenAlias: existing.tokenAlias,
        updatedAt: new Date(Date.now()).toLocaleString()
    };

    return {
        tokenAlias: existing.tokenAlias,
        tokenId: newTokenId,
        token: `${newTokenId}.${signature}`
    };

}