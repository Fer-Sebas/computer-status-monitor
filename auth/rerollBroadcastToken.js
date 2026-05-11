import crypto from "crypto";

import "dotenv/config";

import { transponderStore } from "../stores/broadcastTokenStore.js";

const SECRET = process.env.MASTER_KEY_SEED;
if (!SECRET)
    throw new Error('MASTER_KEY_SEED is not set');

export function rerollBroadcastToken(oldBroadcastToken) {

    const existing = transponderStore[oldBroadcastToken.keyId];

    if (!existing) { return null;}

    // generate new keyId
    const newKeyId = crypto.randomBytes(6).toString("hex");
    
    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(newKeyId)
        .digest("hex");

    // delete old entry
    delete transponderStore[oldKeyId];

    // insert new entry with same identity
    transponderStore[newKeyId] = {
        name: existing.name,
        createdAt: Date.now()
    };

    return {
        name: existing.name,
        keyId: newKeyId,
        key: `${newKeyId}.${signature}`
    };

}