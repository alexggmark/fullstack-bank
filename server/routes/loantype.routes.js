const express = require('express')
const router = express.Router()
const controllerCurrent = require('../controllers/loantype.controller')
// const auth = require('../middleware/auth')

router.get(
  '/getLoanTypes',
  // TODO:
)

router.post(
  '/admin/createNewLoan',
  // TODO:
)

router.put(
  '/admin/updateLoan',
  // TODO:
)

module.exports = router