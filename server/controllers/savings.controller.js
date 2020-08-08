const SavingsSchema = require('../models/savings.model')

const controllers = {
  getSavingsAccount,
  createSavingsAccount,
  deleteSavingsAccount
  // getAllSavingsAccounts
}

async function getSavingsAccount(req, res) {
  try {
    // const response = await SavingsSchema.find({ userId: req.user._id})
    const response = await SavingsSchema.find()

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

async function createSavingsAccount(req, res) {
  try {
    const { nickName, total } = req.body
    const userId = req.user._id

    const savings = new SavingsSchema({
      nickName,
      total,
      userId
    })

    await savings.save((err, data) => {
      res.send({ nickName, total, _id: data._id })
    })
  } catch (err) {
    console.error(err)
  }
}

async function deleteSavingsAccount(req, res) {
  try {
    const { id } = req.body

    const response = await SavingsSchema.findOneAndDelete({ _id: id })
    res.send(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers
