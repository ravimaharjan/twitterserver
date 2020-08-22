const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
const jwt = require('./utils/token')
const usercontroller = require('./controllers/usercontroller')
const authcontroller = require('./controllers/authcontroller')
const tweetcontroller = require('./controllers/tweetcontroller.js')
const SERVER_PORT = config.serverport


const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/auth', authcontroller)
app.use('/api/v1/user/', usercontroller)
app.use(jwt)

app.use('/api/v1/tweets/', tweetcontroller)

mongoose.connect(config.mongo_connection_string, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(() => {
    console.log('Successfully connected to the mongo database')
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err.message)
    process.exit(1)
})
// This is not required starting from mongoose V5.0. It uses native promise by default
// mongoose.Promise = global.Promise;



app.listen(SERVER_PORT, () => console.log(`Server listening on PORT ${SERVER_PORT}.`))
process.on('exit', function () {
    console.log('About to exit, waiting for remaining connections to complete')
    app.close(1)
})
