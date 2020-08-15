const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  activeSavingsAccount: { type: Number, default: 0 },
  activeCurrentAccount: { type: Number, default: 0 },
  moneyStore: { type: Number, default: 10000 },
  totalCurrent: { type: Number, default: 0 },
  totalSavings: { type: Number, default: 0 },
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

CustomerSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY)
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}

CustomerSchema.statics.updateStore = function(userId, total) {
  return this.updateOne({ _id: userId }, {
    $inc: {
      moneyStore: total
    }
  })
}

CustomerSchema.statics.updateSavings = function(userId, total) {
  return this.updateOne({ _id: userId }, {
    activeSavingsAccount: total
  })
}

CustomerSchema.statics.updateCurrent = function(userId, total) {
  return this.updateOne({ _id: userId }, {
    activeCurrentAccount: total
  })
}

CustomerSchema.statics.findByCredentials = async function(username, password) {
  const User = await this.findOne({ username })
  if (!User) {
    console.error('Invalid login credentials')
    return
  }

  const passwordMatch = await bcrypt.compare(password, User.password)
  if (!passwordMatch) {
    console.error('Password doesn\'t match')
    return
  }

  return User
}

module.exports = mongoose.model('CustomerSchema', CustomerSchema)