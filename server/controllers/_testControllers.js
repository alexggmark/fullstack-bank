const TestSchema = require('../models/_testModels')

const controllers = {
  first,
  send
}

function first (req, res) {
  res.send('I am working')
}

async function send (req, res) {
  const result = await new TestSchema(req.body).save()
  res.send(result)
}

module.exports = controllers