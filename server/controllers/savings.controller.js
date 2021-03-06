const SavingsSchema = require('../models/savings.model')
const UserSchema = require('../models/customer.model')

const controllers = {
  getSavingsAccount,
  createSavingsAccount,
  deleteSavingsAccount
}

async function getSavingsAccount(req, res) {
  try {
    const response = await SavingsSchema.find({ userId: req.user._id})

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

    const userStore = await UserSchema.findOne({ _id: userId })

    if (total > userStore.moneyStore) {
      return res.status(400).json({
        message: 'Not enough money in store'
      })
    }

    await UserSchema.updateStore(userId, -total)

    const savings = new SavingsSchema({
      nickName,
      total,
      userId
    })

    await savings.save()

    const savingsTotal = await SavingsSchema.calculateTotal(userId)
    await UserSchema.updateSavings(userId, savingsTotal)

    res.send({ nickName, total, _id: savings._id })
  } catch (err) {
    console.error(err)
  }
}

async function deleteSavingsAccount(req, res) {
  try {
    const { id } = req.body
    const userId = req.user._id

    const userSavings = await SavingsSchema.findOne({ _id: id })

    await UserSchema.updateStore(userId, +userSavings.total)

    const response = await SavingsSchema.findOneAndDelete({ _id: id })

    const savingsTotal = await SavingsSchema.calculateTotal(userId)

    console.log(`savingsTotal: ${savingsTotal}`)
    await UserSchema.updateSavings(userId, savingsTotal)

    res.send(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers
