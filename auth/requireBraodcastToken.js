import crypto from "crypto";

import "dotenv/config";

import { transponderStore } from "../stores/broadcastTokenStore.js";

const SECRET = process.env.MASTER_KEY_SEED;
if (!SECRET)
    throw new Error('MASTER_KEY_SEED is not set');

export function requireBroadcastToken(req, res, next) {

    const raw = req.headers["x-api-key"];

    if (!raw)
        return res.status(401).send("Missing key");

    const key = Array.isArray(raw) ? raw[0] : raw;

    const [keyId, signature] = key.split(".");

    if (!keyId || !signature)
        return res.status(401).send("Invalid format");

    const record = transponderStore[keyId];

    if (!record) {
        return res.status(401).send("Key revoked or unknown");
    }
    // recompute expected signature
    const expected = crypto
        .createHmac("sha256", SECRET)
        .update(keyId)
        .digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
        return res.status(401).send("Invalid key");
    }
    
    req.apiKey = { keyId };

    next();
}