const mongoose = require('mongoose')

const CurrentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number, default: 0 },
  interestGenerated: { type: Number, default: 0 },
  nickName: { type: String, required: true }
})

module.exports = mongoose.model('CurrentSchema', CurrentSchema)