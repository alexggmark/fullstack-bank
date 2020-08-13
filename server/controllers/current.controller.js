const CurrentSchema = require('../models/current.model')
const UserSchema = require('../models/customer.model')

const controllers = {
  getCurrentAccount,
  createCurrentAccount,
  deleteCurrentAccount
}

async function getCurrentAccount(req, res) {
  try {
    const response = await CurrentSchema.find({ userId: req.user._id })

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

    const userStore = await UserSchema.findOne({ _id: userId })

    if (total > userStore.moneyStore) {
      return res.status(400).json({
        message: 'Not enough money in store'
      })
    }

    await UserSchema.updateStore(userId, -total)

    const current = new CurrentSchema({
      nickName,
      total,
      userId
    })

    await current.save()

    const currentTotal = await CurrentSchema.calculateTotal(userId)
    await UserSchema.updateCurrent(userId, currentTotal)

    res.send({ nickName, total, _id: current._id })
  } catch (err) {
    console.error(err)
  }
}

async function deleteCurrentAccount(req, res) {
  try {
    const { id } = req.body
    const userId = req.user._id

    const userCurrent = await CurrentSchema.findOne({ _id: id })

    await UserSchema.updateStore(userId, +userCurrent.total)

    const response = await CurrentSchema.findOneAndDelete({ _id: id })

    const currentTotal = await CurrentSchema.calculateTotal(userId)

    console.log(`currentTotal: ${currentTotal}`)
    await UserSchema.updateCurrent(userId, currentTotal)

    res.send(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers