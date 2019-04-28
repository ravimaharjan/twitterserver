
const express = require('express');
const authRouter = express.Router();
const authService = require('../services/auth.service');

// we can define routes like this
// authRouter.post('/register', register);
authRouter.post('/login', authenticate);
module.exports = authRouter;

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
                'status': 'success',
                'message': 'User created successfully'
            })
        })
        .catch(error => {
            return res.status(200).send({
                'status': 'error',
                'message': 'Error occurred.'
            })
        })
})


function authenticate(req, res) {
    console.log("auth request called")
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            status: 'error',
            message: 'user information is empty'
        })
    }
    authService.authenticatePromise(req.body)
        .then(user => {
            console.log(user)
            return user ? res.json({ success: true, message: 'login successful', user: user }) :
                res.status(404).send({ message: 'username or password incorrect' })
        })
        .catch(error => {
            throw error
        })
}

