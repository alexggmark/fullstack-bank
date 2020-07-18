const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
})

TestSchema.pre('save', function (next) {
  this.content = 'UPDATED'
  next()
})

module.exports = mongoose.model('TestSchema', TestSchema)