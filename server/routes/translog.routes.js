const express = require('express')
const router = express.Router()
const controllerTranslog = require('../controllers/translog.controller')
const auth = require('../middleware/auth')

router.post(
  '/transferMoney',
  auth,
  controllerTranslog.transferMoney
)

router.get(
  '/getTransLogs',
  auth,
  controllerTranslog.getTranslogs
)

router.post(
  '/getMoreTransLogs',
  auth,
  controllerTranslog.getMoreTranslogs
)

module.exports = router