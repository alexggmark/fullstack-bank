const CurrentSchema = require('../models/current.model')

const controllers = {
  getCurrentAccount,
  createCurrentAccount,
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

    await current.save()
    res.send({ nickName, total })
  } catch (err) {
    console.error(err)
  }
}

// async function getAllCurrentAccounts(req, res) {
//   try {
//     console.log(req)
//     const userId = req.user._id
//     const response = await CurrentSchema.find({ userId: userId })
//     console.log(response.body)
//     res.send(response)
//   } catch (err) {
//     console.error(err)
//   }
// }

module.exports = controllers