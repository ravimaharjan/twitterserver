
var tweetDomain = module.export = {}

tweetDomain.getTweetSummary = function (tweet) {
    return {
        id: tweet.id,
        text: tweet.text,
        twitter: {
            name: tweet.user.name,
            location: tweet.user.location,
            followers_count: tweet.user.followers_count,
            friends_count: tweet.user.friends_count
        },
        create_date: tweet.create_at,
        in_reply_to: tweet.in_reply_user_id_str,
        hashtags: tweet.entities.hashtags,
        user_mentions: tweet.entities.user_mentions
    }
}
module.exports = tweetDomain
