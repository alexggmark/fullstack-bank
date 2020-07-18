const mongoose = require('mongoose')

const LoanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loanId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number, default: 0 }
})

module.exports = mongoose.model('LoanSchema', LoanSchema)