import express from 'express'
import buffer from '../logs/buffer.js'

const router = express.Router()

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

export default router