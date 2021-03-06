const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const customerControllers = require('../controllers/customer.controller')

router.post(
  '/createUser',
  customerControllers.createUser
)

router.post(
  '/loginUser',
  customerControllers.loginUser
)

router.get(
  '/auth/getUserData',
  auth,
  customerControllers.getUserData
)

router.post(
  '/auth/addToMoneyStore',
  auth,
  customerControllers.addStore
)

module.exports = router