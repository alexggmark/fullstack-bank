const express = require('express')
const router = express.Router()
const controllerSavings = require('../controllers/savings.controller')
const auth = require('../middleware/auth')

router.get(
  '/getSavingsAccountsUser',
  auth,
  controllerSavings.getSavingsAccount
)

router.post(
  '/createNewSavingsAccount',
  auth,
  controllerSavings.createSavingsAccount
)

router.delete(
  '/deleteSavingsAccount',
  auth,
  controllerSavings.deleteSavingsAccount
)

module.exports = router