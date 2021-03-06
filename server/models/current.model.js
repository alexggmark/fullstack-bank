const mongoose = require('mongoose')

const CurrentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number, default: 0 },
  interestGenerated: { type: Number, default: 0 },
  nickName: { type: String, required: true }
})

CurrentSchema.statics.updateAccount = function(id, value) {
  console.log(`Current update: ${value}`)
  return this.updateOne({ _id: id }, {
    $inc: {
      total: value
    }
  })
}

CurrentSchema.statics.calculateTotal = async function(userId) {
  const result = await this.aggregate([
    { $match: { userId: userId.toString() } },
    { $group: { _id: null, amount: { $sum: "$total" } } }
  ])

  if (!result.length) return 0
  return result[0].amount;
}

module.exports = mongoose.model('CurrentSchema', CurrentSchema)