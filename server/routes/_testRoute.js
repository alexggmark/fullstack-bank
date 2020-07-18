const express = require('express')
const router = express.Router()
const testMiddleWare = require('../middleware/_testMiddleware')
const testController = require('../controllers/_testControllers')

router.get(
  '/test',
  testMiddleWare,
  testController.first
)

router.post(
  '/post',
  testMiddleWare,
  testController.send
)

module.exports = router