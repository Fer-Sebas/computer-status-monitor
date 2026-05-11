import express from 'express'
import buffer from '../logs/buffer.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(buffer.tail(200))
})

router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.write('data: Connected\n\n')
  const client = {
    filter: 'telemetry',

    write(entry) {
  res.write(`data: ${JSON.stringify(entry.data)}\n\n`)
}
  }

  buffer.subscribe(client)

  req.on('close', () => {
    buffer.unsubscribe(client)
  })
})

export default router