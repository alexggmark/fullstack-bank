const express = require('express')
const router = express.Router()
const controllerCurrent = require('../controllers/loans.controller')
// const auth = require('../middleware/auth')

router.get(
  '/getActiveLoansUser',
  // TODO:
)

router.post(
  '/createNewLoan',
  // TODO:
)

router.delete(
  '/deleteLoansUser',
  // TODO:
)

router.put(
  '/repayLoanUser',
  // TODO:
)

module.exports = router