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

  const total = from ? -Number(value) : Number(value)
  const id = from ? fromId : toId
  let response = []

  try {
    console.log(total)
    const checkAccountType = async () => {
      try {
        if (id === tConst.STORE) {
          response = await CustomerSchema.find({ _id: userId })
          // console.log(`-------> ${tConst.STORE} <------`)
          // console.log(`response.moneyStore: ${response[0].moneyStore}`)
          // console.log(response)
          // console.log(`response.moneyStore + total: ${response[0].moneyStore + total}`)
          if (from && (response[0].moneyStore + total < 0)) return 400
          return tConst.STORE
        }
        response = await SavingsSchema.find({ _id: id })
        if (response.length !== 0) {
          // console.log(`-------> ${tConst.SAVINGS} <------`)
          // console.log(`response.total: ${response[0].total}`)
          // console.log(response)
          // console.log(`response.total + total: ${response[0].total + total}`)
          if (from && (response[0].total + total < 0)) return 400
          return tConst.SAVINGS
        }
        if (response.length === 0) {
          response = await CurrentSchema.find({ _id: id })
        }
        if (response.length !== 0) {
          // console.log(`-------> ${tConst.CURRENT} <------`)
          // console.log(`response.total: ${response[0].total}`)
          // console.log(response)
          // console.log(`response.total + total: ${response[0].total + total}`)
          if (from && (response[0].total + total < 0)) return 400
          return tConst.CURRENT
        }
        // console.log('ERROR A')
        return 400
      } catch (err) {
        // console.log('ERROR D')
        return 400
      }
    }

    const type = await checkAccountType()
    if (type === 400) {
      // console.log('ERROR C')
      return {
        type,
      }
    }

    switch (type) {
      case tConst.STORE: {
        const resPromise = CustomerSchema.updateStore(userId, total)
        return {
          type: tConst.STORE,
          promise: resPromise
        }
      }
      case tConst.SAVINGS: {
        const resPromise = SavingsSchema.updateAccount(id, total)
        return {
          type: tConst.SAVINGS,
          promise: resPromise
        }
      }
      case tConst.CURRENT: {
        const resPromise = CurrentSchema.updateAccount(id, total)
        return {
          type: tConst.CURRENT,
          promise: resPromise
        }
      }
      default:
        return {
          type: 400,
          promise: null
        }
    }
  } catch (err) {
    console.error(err)
  }
}

async function transferMoney(req, res) {
  const { value, fromId, toId } = req.body
  const userId = req.user._id

  if (fromId === toId) {
    // console.log('ERROR B')
    return res.status(400).json({
      message: 'Can\'t send to same account'
    })
  }

  try {
    const reqFrom = await handleTransfer(req, true)
    const reqTo = await handleTransfer(req, false)

    if (reqFrom.type === 400 || reqTo.type === 400) {
      // console.log('ERROR A')
      return res.status(400).json({
        message: 'Not enough money for transfer'
      })
    }

    await reqFrom.promise
    await reqTo.promise

    const savingsTotal = await SavingsSchema.calculateTotal(userId)
    await CustomerSchema.updateSavings(userId, savingsTotal)

    const currentTotal = await CurrentSchema.calculateTotal(userId)
    await CustomerSchema.updateCurrent(userId, currentTotal)

    const logResponse = new TranslogSchema({
      userId: userId,
      value: value,
      logType: tConst.TRANSFER,
      accountId: toId,
      accountType: reqTo.type
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