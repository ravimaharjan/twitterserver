const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization
    if (token) {
        jwt.verify(token, config.app_secret, function (err, decoded) {
            if (err) {
                res.json({ status: 401, message: 'Failed to authenticate token.' })
            } else {
                next()
            }
        })
    } else {
        return res.status(403).send({
            error: true,
            message: 'Missing authentication token.'
        })
    }
}
