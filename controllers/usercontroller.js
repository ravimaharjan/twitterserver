
const express = require('express')
const userRouter = express.Router()
const userService = require('../services/userservice')

userRouter.post('/', (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                success: false,


                message: 'user information is empty'
            })
        }
        userService.createUser(req.body)
            .then(response => {
                return res.status(200).send({
                    success: true,
                    message: 'User created successfully'
                })
            })
            .catch(error => {

                return res.status(500).send({
                    success:false,
                    message: 'Error occurred.'
                })
            })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: "Error occurred"
        })
    }
    
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

userRouter.get('/', (req, res) => {
    userService.getAll()
        .then((data) => {
            console.log('1')
            res.json(data)
        })
        .catch(err => {
            console.log('2')
            // return res.status(404).json({ status: 'error', message: 'This user was not found or the email and password are incorrect.' })
            res.status(500).send({
                message: err.message || 'Something wrong while retrieving users.'
            })
        })
})

module.exports = userRouter
