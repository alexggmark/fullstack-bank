const TranslogSchema = require('../models/translog.model')
const SavingsSchema = require('../models/savings.model')
const CurrentSchema = require('../models/current.model')
const CustomerSchema = require('../models/customer.model')
const tConst = require('../_constants/transactions')

const controllers = {
  transferMoney,
  getTranslogs,
  getMoreTranslogs
}

async function handleTransfer(req, from) {
  const { value, fromId, toId } = req.body
  const userId = req.user._id

  const total = from ? -value : value
  const id = from ? fromId : toId
  let response

  try {
    if (fromId === tConst.STORE) {
      await CustomerSchema.updateStore(userId, total)
      return tConst.STORE
    }

    response = await SavingsSchema.find({ _id: id })

    if (response.length !== 0) {
      await SavingsSchema.updateAccount(id, total)
      return tConst.SAVINGS
    }
    if (response.length === 0) response = await CurrentSchema.find({ _id: id })

    if (response.length === 0) {
      res.status(400).send({ message: 'No account ID found' })
      return
    }

    await CurrentSchema.updateAccount(id, total)
    return tConst.CURRENT
  } catch (err) {
    console.error(err)
  }
}

async function transferMoney(req, res) {
  const { value, toId } = req.body
  const userId = req.user._id

  try {
    const reqFrom = await handleTransfer(req, true)
    const reqTo = await handleTransfer(req, false)

    const savingsTotal = await SavingsSchema.calculateTotal(userId)
    await CustomerSchema.updateSavings(userId, savingsTotal)

    const currentTotal = await CurrentSchema.calculateTotal(userId)
    await CustomerSchema.updateCurrent(userId, currentTotal)

    const logResponse = new TranslogSchema({
      userId: userId,
      value: value,
      logType: tConst.TRANSFER,
      accountId: toId,
      accountType: reqTo
    })

    await logResponse.save()

    res.send(logResponse)
  } catch (err) {
    console.error(err)
  }
}

async function getTranslogs(req, res) {
  const userId = req.user._id

  const response = await TranslogSchema.find({ userId: userId }).sort({ createdAt: 'desc' }).limit(7)

  res.send(response)
}

async function getMoreTranslogs(req, res) {
  const userId = req.user._id
  const { counter } = req.body
  let skipStart = 7 + (4 * counter)

  const response = await TranslogSchema.find({ userId: userId }).sort({ createdAt: 'desc' }).skip(skipStart).limit(4)

  res.send(response)
}

module.exports = controllers