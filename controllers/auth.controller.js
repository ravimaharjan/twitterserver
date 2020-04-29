
const express = require('express')
const authRouter = express.Router()
const authService = require('../services/auth.service')

// we can define routes like this
// authRouter.post('/register', register);
authRouter.post('/login', authenticate)
module.exports = authRouter

authRouter.post('/register', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            status: 'error',
            message: 'user information is empty'
        })
    }
    authService.createNewUser(req.body)
        .then(response => {
            return res.status(200).send({
                status: 'success',
                message: 'User created successfully'
            })
        })
        .catch(error => {
            return res.status(200).send({
                status: error,
                message: 'Error occurred.'
            })
        })
})

function authenticate (req, res) {
    try {
        if (!req.body) {
            return res.status(400).send({
                status: 'error',
                message: 'user information is empty'
            })
        }
        authService.authenticateAsync(req.body)
            .then(result => {
                return res.json({ status: 200, message: 'Login successful', token: result.token })
            })
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, errorMessage: 'Error occurred' })
    }
}
