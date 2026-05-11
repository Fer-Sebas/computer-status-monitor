// auth/generateBroadcastToken.js

import 'dotenv/config';

import crypto from "crypto";

const SECRET = process.env.MASTER_KEY_SEED;

if (!SECRET)
    throw new Error('MASTER_KEY_SEED is not set');

export function generateBroadcastToken(name) {

    const tokenId = crypto.randomBytes(6).toString("hex");

    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(tokenId)
        .digest("hex");

    return {
        name,
        tokenId,
        token: (`${tokenId}.${signature}`)
    };
    
}