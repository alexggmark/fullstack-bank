const jwt = require('jsonwebtoken')
const CustomerSchema = require('../models/customer.model')

async function auth(req, res, next) {
  const token = req.headers['authorization'].replace('Bearer ', '')
  const data = jwt.verify(token, process.env.JWT_KEY)

  try {
    const user = await CustomerSchema.findOne({ _id: data._id, 'tokens.token': token})
    if (!user) {
      console.error('No user')
    }
    req.user = user
    req.token = token
    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = auth