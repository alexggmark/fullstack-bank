const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const customerControllers = require('../controllers/customer.controller')

router.post(
  '/auth/createUser',
  customerControllers.createUser
)

router.post(
  '/auth/loginUser',
  customerControllers.loginUser
)

router.get(
  '/auth/getUsers',
  auth,
  customerControllers.getUsers
)

module.exports = router