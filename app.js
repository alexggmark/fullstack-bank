const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

/**
 * Setting up database
 */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected DB')
  })
  .catch((err) => {
    console.error(err)
  })

console.log(process.env.MONGO_URI)

/**
 * Setting up server environment
 */

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Setting up Routes
 */

const _testRouter = require('./server/routes/_testRoute')
const customerRouter = require('./server/routes/customer.routes')
const currentRouter = require('./server/routes/current.routes')
const savingsRouter = require('./server/routes/savings.routes')

app.use('/api/', _testRouter)
app.use('/api/', customerRouter)
app.use('/api/', currentRouter)
app.use('/api/', savingsRouter)

/**
 * Running server
 */

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