config = {
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    access_token: process.env.accessToken,
    access_token_secret: process.env.accessTokenSecret,
    timeout_ms: 60 * 1000, 
    strictSSL: true,     // optional - requires SSL certificates to be valid.

}
module.exports = config