const express = require('express')
const router = express.Router()
const controllerCurrent = require('../controllers/current.controller')
const auth = require('../middleware/auth')

router.get(
  '/getCurrentAccountsUser',
  auth,
  controllerCurrent.getCurrentAccount
)

router.put(
  '/updateCurrentAccountsUser',
  // TODO:
)

router.post(
  '/createNewCurrentAccount',
  auth,
  controllerCurrent.createCurrentAccount
)

router.delete(
  '/deleteCurrentAccount',
  auth,
  controllerCurrent.deleteCurrentAccount
)

module.exports = router