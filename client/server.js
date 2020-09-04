const express = require('express')
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 80
const app = express()

app.use(compression({ filter: shouldCompress }))

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})
app.get('/version', function (req, res) {
  return res.send(process.env.DOCKER_IMAGE_TAG)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, (err) => {
  console.log(`App listen on port: ${port}`)
})


function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}