const express = require('express')

const router = express.Router()
const buffer = require('../logs/buffer')

router.post('/', (req, res) => {
  const {
    cpu,
    gpu,
    ram,
    fans,
    disks
  } = req.body

  const entry = {
    time: Date.now(),
    cpu,
    gpu,
    ram,
    fans,
    disks
  }

  buffer.push('telemetry', entry)

  res.sendStatus(200)
})

module.exports = router