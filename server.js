import 'dotenv/config'

import runBootSequence from './boot/sequence.js'

import logRoutes from './routes/logs.js'
import metricsRoutes from './routes/metrics.js'
import broadcastTokensRoutes from './routes/broadcast-tokens.js'

import cors from 'cors';
import express from 'express'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://polaris.hyprthread.net',
    'https://polaris-web-app.vercel.app/'
  ]
}));

const port = process.env.PORT

app.use(express.json())
app.set('json spaces', 2);

// ROUTES
app.use('/broadcast-tokens', broadcastTokensRoutes)
app.use('/metrics', metricsRoutes)

app.get('/', (req, res) => {
  res.json('Polaris Computer Telemetry Beacon')
})

app.listen(port, async () => { await runBootSequence(port) })