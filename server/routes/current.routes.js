const express = require('express')
const router = express.Router()
const controllerCurrent = require('../controllers/controller.current')
const { route } = require('./customer.routes')

router.get(
  '/getCurrentAccountsUser'
)

router.post(
  '/createNewCurrentAccount'
)

router.delete(
  '/deleteCurrentAccount'
)

module.exports = router