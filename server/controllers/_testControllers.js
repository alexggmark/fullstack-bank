const TestSchema = require('../models/_testModels')

const controllers = {
  first,
  send
}

function first (req, res) {
  res.send('I am working')
}

async function send (req, res) {
  console.log('Running async send')
  const result = await new TestSchema(req.body).save()
  console.log('After save')
  res.send(result)
}

module.exports = controllers