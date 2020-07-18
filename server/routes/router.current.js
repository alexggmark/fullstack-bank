const express = require('express')
const router = express.Router()
// const middlewareCurrent = require('../middleware/_testMiddleware')
const controllerCurrent = require('../controllers/controller.current')

router.get(
  '/test',
  testMiddleWare,
  testController.first
)

module.exports = router