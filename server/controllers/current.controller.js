const CurrentSchema = require('../models/current.model')

const controllers = {
  getCurrentAccount,
  createCurrentAccount,
  deleteCurrentAccount
  // getAllCurrentAccounts
}

async function getCurrentAccount(req, res) {
  try {
    // const response = await CurrentSchema.find({ userId: req.user._id})
    const response = await CurrentSchema.find()

    if (!response) {
      return res.status(400).json({
        message: 'Unsuccessful login'
      })
    }

    res.send(response)
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

    await current.save((err, data) => {
      res.send({ nickName, total, _id: data._id })
    })
  } catch (err) {
    console.error(err)
  }
}

async function deleteCurrentAccount(req, res) {
  try {
    console.log(req.body)
    const { id } = req.body

    const response = await CurrentSchema.findOneAndDelete({ _id: id })
    console.log(id)
    res.send(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers