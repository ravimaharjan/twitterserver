require('dotenv').config()
config = {
    app_secret: process.env.secret,
    tokenLife: process.env.tokenLife,
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    access_token: process.env.accessToken,
    access_token_secret: process.env.accessTokenSecret,
    timeout_ms: 60 * 1000, 
    strictSSL: true,     // optional - requires SSL certificates to be valid.
    mongo_connection_string: process.env.mongoConnection,
    serverport:3001

}
module.exports = config