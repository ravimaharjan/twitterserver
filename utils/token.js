const config = require('../config');
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    console.log(req.body)
    console.log(req.query)
    const token = req.body.token || req.query.token || req.headers['token'];
    // return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                     res.json({ "error": true, "message": 'Failed to authenticate token.' });
                }
                else {
                    
                    // res.json({
                    //     message: "Valid Token."
                    // })
                }
            })
            next();
        }
        else {
            return res.status(403).send({
                "error": true,
                "message": 'No token provided.'
            });
        }
    }
// }