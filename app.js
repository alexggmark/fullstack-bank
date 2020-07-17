const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Setup for Heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })

  app.listen(PORT, () => console.log('Running production'))
  return
}

// Fallback for local HTTPS development
const options = {
  key: fs.readFileSync(path.resolve(__dirname, './certs/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './certs/server.cert'))
}

https.createServer(options, app).listen(PORT, () => {
  console.log('Running development')
})