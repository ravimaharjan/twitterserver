const userService = require('./userservice')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
    authenticateAsync
}

async function authenticateAsync(userParams) {
    try {
        const user = await User.findOne({ username: userParams.username })
        if (!user) {
            throw new Error('User not found')
        }

        if (!(await bcrypt.compareSync(userParams.password, user.passwordhash))) {
            throw new Error('Invalid Password')
        }
        const payload = {
            username: userParams.username,
            email: userParams.email
        }
        const token = await jwtSignAsync(payload, config.app_secret, { expiresIn: config.tokenLife })

        return {
            username: userParams.username,
            token
        }
    } catch (error) {
        throw error
    }
}

function jwtSignAsync(payload, secret, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}
