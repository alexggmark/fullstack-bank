const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  activeSavingsAccount: { type: Boolean, default: false},
  activeCurrentAccount: { type: Boolean, default: false },
  tokens: [{
    token: { type: String, required: true }
  }]
})

CustomerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

module.exports = mongoose.model('CustomerSchema', CustomerSchema)