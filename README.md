# twitterserver
Twitterserver is the backend service for the TwitterApp. It uses Express js to serve the api request. To store the user data, mongodb is used which is run inside the docker container. It serves the request for :-

* User Registration
* User Authentication
* Returning twitter feeds
* Search twitter feeds with specific text

## Requirements

* It uses twit npm library to interact with the Twitter service. The library is available in https://www.npmjs.com/package/twit .
* Twitter developer account and necessary keys. The link https://rapidapi.com/blog/how-to-use-the-twitter-api/ has explained in detail.
* Docker must be installed.

## Configurations
* create .env file in the twitterserver folder. Copy paste the content of .env-example into the .env file and set the values for all the keys.
  
  * secret: A secret key to generate the jwt token
  * tokenLife: Life of the jwt token. It's value can be expressed in seconds or string like 60, "2 days", "10h", "7d".
  * consumerkey, consumerSecret, accessToken, accessTokenSecret : These are the keys provided by the Twitter developer account.
  * mongoConnection: ConnectionString of the Mongodb
  
## Run
* Execute ./bash.sh. This will run your mongodb instance in the docker
* Execute nodemon ./server.js. This will start your server 

