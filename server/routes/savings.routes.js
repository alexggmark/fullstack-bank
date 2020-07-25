const express = require('express')
const router = express.Router()
const controllerSavings = require('../controllers/savings.controller')
const auth = require('../middleware/auth')

router.get(
  '/getSavingsAccountsUser',
  auth,
  controllerSavings.getSavingsAccount
)

router.put(
  '/updateSavingsAccountsUser',
  // TODO:
)

router.post(
  '/createNewSavingsAccount',
  auth,
  controllerSavings.createSavingsAccount
)

router.delete(
  '/deleteSavingsAccount',
  // TODO:
)

module.exports = router