const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountId: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  value: { type: Number, default: 0 }, // pos/neg
  logType: { type: String, required: true }, // loan, saving, current
  accountType: { type: String, require: true }
})

module.exports = mongoose.model('LogSchema', LogSchema)