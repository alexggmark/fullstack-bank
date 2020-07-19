const CustomerSchema = require('../models/customer.model')

const controllers = {
  createUser,
  loginUser,
  getUsers,
  addStore
}

async function createUser(req, res) {
  try {
    const user = new CustomerSchema(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (err) {
    console.error(err)
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body
    const user = await CustomerSchema.findByCredentials(username, password)

    if (!user) {
      return res.status(400).json({
        message: 'Unsuccessful login'
      })
    }

    const token = await user.generateAuthToken()
    console.log(`Success: ${username} - ${password}`)
    res.send({ user, token })
  } catch (err) {
    console.error(err)
  }
}

async function getUsers(req, res) {
  try {
    const user = await CustomerSchema.find().exec()
    res.send(user)
  } catch (err) {
    console.error(err)
  }
}

async function addStore(req, res) {
  // ADD TO MONEY STORE
}

module.exports = controllers