const CurrentSchema = require('../models/current.model')

const controllers = {
  getCurrentAccount,
  createCurrentAccount,
}

async function getCurrentAccount() {
  try {
    const token = req.headers['authorization'];
    const response = await CurrentSchema.find({ userId: token.token})
  } catch (err) {
    console.error(err)
  }
}

async function createCurrentAccount(req, res) {
  try {
    const { nickName, total } = req.body
    const userId = req.user._id

    const current = new CurrentSchema({
      nickName,
      total,
      userId
    })

    await current.save()
    res.send({ nickName, total })
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers