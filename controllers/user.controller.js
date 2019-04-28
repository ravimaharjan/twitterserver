
const express = require('express');
const userRouter = express.Router();
const userService = require('../services/user.service');

userRouter.post('/register', (req, res, next) => {
    console.log('register')
    if (!req.body) {
        return res.status(400).send({
            message: 'user information cannot be empty'
        })
    }
    userService.create(req.body)
        .then((data) => {
            // console.log("db output" + data.toString())
            res.json({success: true})
        })
        .catch(err => {
            // res.status(500).json({ status: 'error', data: response })
            next(err)
        });
})

userRouter.get('/', (req, res) => {
    userService.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch(err=>{
            // return res.status(404).json({ status: 'error', message: 'This user was not found or the email and password are incorrect.' })
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        })
})

module.exports = userRouter;