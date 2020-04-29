const tweetRoutes = require('express').Router()
const Twit = require('twit')
const config = require('../config')
const tweetdomain = require('../domain/tweets')

tweetRoutes.get('/', (req, res) => {
    const T = new Twit(config)
    T.get('search/tweets', { q: 'a' }, function (err, data, response) {
        if (!err) {
            const tweetData = data.statuses
            const tweetResult = tweetData.map((tweet) => {
                return tweetdomain.getTweetSummary(tweet)
            })
            return res.status(200).json({ tweets: tweetResult })
        } else {
            console.error(err)
            res.send(err)
        }
    })
})

tweetRoutes.get('/:tweetkey', (req, res) => {
    const T = new Twit(config)
    T.get('search/tweets', { q: req.params.tweetkey }, function (err, data, response) {
        if (!err) {
            const tweetData = data.statuses
            const tweetResult = tweetData.map((tweet) => {
                return tweetdomain.getTweetSummary(tweet)
            })
            res.status(200).json({ tweets: tweetResult })
        } else {
            res.send(err)
        }
    })
})
module.exports = tweetRoutes
