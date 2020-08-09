const CustomerSchema = require('../models/customer.model')

const controllers = {
  createUser,
  loginUser,
  getUserData,
  addStore
}

async function createUser(req, res) {
  try {
    const { username, password, firstname, lastname } = req.body
    const user = new CustomerSchema({
      firstName: firstname,
      lastName: lastname,
      password,
      username
    })
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

function getUserData(req, res) {
  res.send(req.user)
}

async function addStore(req, res) {
  // TODO:
}

module.exports = controllers