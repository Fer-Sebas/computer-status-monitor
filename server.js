require('dotenv/config')

const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT
app.use(express.json())
app.use(express.static('public'))
const logger = require('./logs/logger')
const runBootSequence = require('./boot/sequence')

const indexRoutes = require('./routes')
const logRoutes = require('./routes/logs')
const telemetryRoutes = require('./routes/telemetry')
const monitorRoutes = require('./routes/monitor')


// ROUTES
app.use('/', indexRoutes)
app.use('/logs', logRoutes)
app.use('/telemetry', telemetryRoutes)
app.use('/monitor', monitorRoutes)

// FALLBACK ROOT
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// START SERVER + BOOT SEQUENCE
app.listen(port, async () => {
  await runBootSequence(port)

})