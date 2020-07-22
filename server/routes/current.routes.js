const express = require('express')
const router = express.Router()
const controllerCurrent = require('../controllers/current.controller')
const auth = require('../middleware/auth')

router.get(
  '/getCurrentAccountsUser'
)

router.post(
  '/createNewCurrentAccount',
  auth,
  controllerCurrent.createCurrentAccount
)

router.delete(
  '/deleteCurrentAccount'
)

module.exports = router