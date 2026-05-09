const express = require('express')

const router = express.Router()

const buffer = require('../logs/buffer')

router.get('/live', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<body>
  <pre id="telemetry">Waiting...</pre>

  <script src="/monitor.js"></script>
</body>
</html>
  `)
})

module.exports = router