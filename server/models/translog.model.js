const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  value: { type: Number, default: 0 }, // pos/neg
  logType: { type: String, required: true } // loan, saving, current
})

module.exports = mongoose.model('LogSchema', LogSchema)