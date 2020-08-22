
const express = require('express')
const authRouter = express.Router()
const authService = require('../services/authservice')

// we can define routes like this
// authRouter.post('/register', register);
authRouter.post('/login', authenticate)
module.exports = authRouter

async function authenticate (req, res) {
    try {
        if (!req.body) {
            return res.status(400).send({
                status: 'error',
                message: 'user information is empty'
            })
        }
        await authService.authenticateAsync(req.body)
            .then(result => {
                return res.json({ status: 200, message: 'Login successful', token: result.token })
            })
    } catch (error) {
        return res.json({ status: 500, errorMessage: 'Error occurred' })
    }
}
