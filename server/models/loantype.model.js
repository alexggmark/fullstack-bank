const mongoose = require('mongoose')

const LoanTypeSchema = new mongoose.Schema({
  loanId: { type: String, required: true },
  loanName: { type: String, required: true },
  interestRate: { type: Number, required: true },
  maxValue: { type: Number, required: true }
})

module.exports = mongoose.model('LoanTypeSchema', LoanTypeSchema)