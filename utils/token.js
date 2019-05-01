const config = require('../config');
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['authorization'];
    // return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                     res.json({ "error": true, "message": 'Failed to authenticate token.' });
                }
                else {
                    next();
                }
            })
            
        }
        else {
            return res.status(403).send({
                "error": true,
                "message": 'No token provided.'
            });
        }
    }
// }