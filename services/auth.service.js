const userService = require('./user.service');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    createNewUser,
    authenticatePromise
}
function createNewUser(userParams) {
    return userService.createUser(userParams)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return error
        })
}

function authenticateCb(userParams, cb) {
    User.findOne({
        username: userParams.username
    }, (err, user) => {
        if (err) {
            cb(err)
            return
        }

        if (!user) {
            cb(new Error('No User'))
            return
        }

        bcrypt.compare(userParams.password, user.passwordhash, (err, success) => {
            if (err) {
                cb(err)
                return
            }

            if (!success) {
                cb(new Error('Invalid Password'))
                return
            }

            const payload = {
                username: userParams.username,
                email: userParams.email
            }

            jwt.sign(
                payload,
                config.secret,
                { expiresIn: config.tokenLife },
                (err, token) => {
                    if (err) {
                        cb(err)
                        return
                    }

                    cb(null, {
                        username: userParams.username,
                        token
                    })
                }
            )
        })
    })
}

// authenticateCb({}, (err, token) => {
//     if (err) {
//         res.json({
//             // failure
//          })
//         return
//     }

//     res.json({
//         // success
//     })
// })

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

function authenticatePromise(userParams) {
    console.log(userParams)
    return User.findOne({ username: userParams.username })
        .then(user => {
            if (!user) {
                throw new Error('No User')
            }
            return bcrypt.compare(userParams.password, user.passwordhash)
        })
        .then(success => {
            console.log('then of bcrypt compare')
            if (!success) {
                throw new Error('Invalid Password')
            }

            const payload = {
                username: userParams.username,
                email: userParams.email
            }

            return jwtSignAsync(payload, config.secret, { expiresIn: config.tokenLife })
        })
        .then(token => {
            console.log("then of jwt sign")
            return {
                username: userParams.username,
                token
            }
        })
}

// authenticatePromise({})
//     .then(({ username, token }) => {
//         res.json({})
//     })
//     .catch(err => {
//         res.json({})
//     })

// authenticatePromise({})
//     .then((result) => {
//         res.json({})

//         return new Promise(...)
//     })
//     .then(...)
//     .catch(err => {
//         res.json({})
//     })

// async function authenticateAsync(userParams) {
//     const user = await user.findOne({ username: userParams.username })

//     if (!user) {
//         throw new Error('No User')
//     }

//     if (! (await bcrypt.compareSync(userParams.password, user.passwordhash))) {
//         throw new Error('Invalid Password')
//     }

//     const token = await jwtSignAsync(payload, config.secret, { expiresIn: config.tokenLife })

//     return {
//         username: userParams.username,
//         token
//     }
// }

// async main () {
//     try {
//         const result = await authenticateAsync({})
//         res.json()

//         ...
//         ...

//     } catch (err) {
//         res.json({ err })
//     }
// }

// async function authenticate(userParams) {
//     const user = await User.findOne({
//         username: userParams.username
//     })
//     if (user && bcrypt.compareSync(userParams.password, user.passwordhash)) {
//         const payload = {
//             username: userParams.username,
//             email: userParams.email
//         }

//         return new Promise((resolve, reject) => {
//             jwt.sign(
//                 payload,
//                 config.secret,
//                 { expiresIn: config.tokenLife },
//                 (err, token) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve(token)
//                     }
//                     // console.log("token generated.")
//                     // console.log({
//                     //     username: userParams.username,
//                     //     token: token
//                     // })
//                 }
//             )

//         })
//         // return {
//         //     username: userParams.username,
//         //     token: token
//         // }
//     // // console.log("token gen")
//     //     console.log(user)
//     //     await user
//     }
//     else {
//         throw new Error('')
//     }
// }

// authenticate({}, (token) => {
//     response.send(token)
// })

