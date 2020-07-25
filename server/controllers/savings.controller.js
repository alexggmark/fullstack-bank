const SavingsSchema = require('../models/savings.model')

const controllers = {
  getSavingsAccount,
  createSavingsAccount,
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

    console.log(response)
    console.log(req.user._id)
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

    await savings.save()
    res.send({ nickName, total })
  } catch (err) {
    console.error(err)
  }
}

// async function getAllSavingsAccounts(req, res) {
//   try {
//     console.log(req)
//     const userId = req.user._id
//     const response = await SavingsSchema.find({ userId: userId })
//     console.log(response.body)
//     res.send(response)
//   } catch (err) {
//     console.error(err)
//   }
// }

module.exports = controllers