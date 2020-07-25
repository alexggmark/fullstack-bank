const TranslogSchema = require('../models/translog.model')
import {
  TRANSFER,
} from '../_constants/transactions'

const controllers = {
  transferMoney,
}

async function transferMoney(req, res) {
  try {
    // const { nickName, total } = req.body
    const userId = req.user._id

    const logResponse = new TranslogSchema({
      userId: userId,
      value: 12, // FIXME:
      logType: TRANSFER,
      accountId: '23gfd' // FIXME:
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = controllers