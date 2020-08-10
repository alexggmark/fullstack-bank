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

async function transferMoney(req, res) {
  try {
    let { value, fromId, toId } = req.body
    const userId = req.user._id
    let toType = ''
    let fromTotalKey = 'total'
    let toTotalKey = 'total'
    let responseFrom = null
    let responseTo = null

    if (fromId === 'store') {
      responseFrom = await CustomerSchema.find({ _id: userId })
      if (responseFrom.length === 0) {
        res.status(400).send({ message: 'No account ID found' })
        return
      }
      fromTotalKey = 'moneyStore'
      fromId = userId
      responseFrom = CustomerSchema
    } else {
      responseFrom = await SavingsSchema.find({ _id: fromId })
      if (responseFrom.length === 0) {
        responseFrom = await CurrentSchema.find({ _id: fromId })
        if (responseFrom.length === 0) {
          res.status(400).send({ message: 'No account ID found' })
          return
        }
        responseFrom = CurrentSchema
      } else {
        responseFrom = SavingsSchema
      }
    }

    if (toId === 'store') {
      responseTo = await CustomerSchema.find({ _id: userId })
      if (responseTo.length === 0) {
        res.status(400).send({ message: 'No account ID found' })
        return
      }
      toTotalKey = 'moneyStore'
      toId = userId
      toType = tConst.STORE
      responseTo = CustomerSchema
    } else {
      responseTo = await SavingsSchema.find({ _id: toId })
      if (responseTo.length === 0) {
        responseTo = await CurrentSchema.find({ _id: toId })
        if (responseTo.length === 0) {
          res.status(400).send({ message: 'No account ID found' })
          return
        }
        responseTo = CurrentSchema
        toType = tConst.CURRENT
      } else {
        responseTo = SavingsSchema
        toType = tConst.SAVINGS
      }
    }

    await responseFrom.updateOne({ _id: fromId}, {
      $inc: {
        [fromTotalKey]: -value
      }
    })

    await responseTo.updateOne({ _id: toId }, {
      $inc: {
        [toTotalKey]: +value
      }
    })

    const logResponse = new TranslogSchema({
      userId: userId,
      value: value,
      logType: tConst.TRANSFER,
      accountId: toId,
      accountType: toType
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