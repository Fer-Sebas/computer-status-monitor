// auth/generateBroadcastToken.js

import 'dotenv/config';

import crypto from "crypto";

const SECRET = process.env.MASTER_KEY_SEED;

if (!SECRET)
    throw new Error('MASTER_KEY_SEED is not set');

export function generateBroadcastToken(name) {

    const keyId = crypto.randomBytes(6).toString("hex");

    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(keyId)
        .digest("hex");

    return {
        name,
        keyId,
        key: (`${keyId}.${signature}`)
    };
    
}