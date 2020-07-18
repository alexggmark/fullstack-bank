const testMiddleware = (req, res, next) => {
  console.log('LOGGED')
  console.log(req.body)
  next()
}

module.exports = testMiddleware