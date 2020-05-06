import JWT from 'jsonwebtoken'
import Config from '../../config/config'

const authenticate = (req, res, next) => {
  const access_token = req.headers['authorization'] || req.body.authorization
  if (access_token) {
    try {
      req.decoded = JWT.verify(access_token, Config.config().token.secret) 
      next()
    } catch (err) {
      res.status(403)
        .send({ success: false, message: 'Failed to authenticate token.' })
    }
    return
  } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
  }
}

export default { authenticate }