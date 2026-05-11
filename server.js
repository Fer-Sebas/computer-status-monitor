import 'dotenv/config'

import runBootSequence from './boot/sequence.js'

import logRoutes from './routes/logs.js'
import metricsRoutes from './routes/metrics.js'

import express from 'express'

const app = express()
const port = process.env.PORT

app.use(express.json())

// ROUTES
app.use('/logs', logRoutes)
app.use('/metrics', metricsRoutes)

app.get('/', (req, res) => {
  res.json('Polaris Computer Telemetry Beacon')
})

// START SERVER + BOOT SEQUENCE
app.listen(port, async () => {
  await runBootSequence(port)

})