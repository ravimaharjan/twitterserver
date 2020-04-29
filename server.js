const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
const jwt = require('./utils/token')
const routes = require('./routes')
const users = require('./controllers/user.controller')
const auth = require('./controllers/auth.controller')
const tweets = require('./routes/tweets.js')
const SERVER_PORT = config.serverport
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/auth', auth)
app.use(jwt)


app.use('/', routes)
app.use('/api/v1/user', users)
app.use('/api/v1/tweets/', tweets)


mongoose.connect(config.mongo_connection_string, { useCreateIndex: true, useNewUrlParser: true }).then(() => {
    console.log('Successfully connected to the mongo dtabase')
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})
// This is not required starting from mongoose V5.0. It uses native promise by default
// mongoose.Promise = global.Promise;



app.listen(SERVER_PORT, () => console.log(`Server listening on PORT ${SERVER_PORT}.`))
process.on('exit', function () {
    console.log('About to exit, waiting for remaining connections to complete')
    app.close(1)
})
