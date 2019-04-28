const rr = require('express').Router()

rr.get("/", (req, res) =>{
    res.send("Hello Node1.")
    console.log("root url called")
    // res.status(200).json({ message: 'Connected!!!' });
})

rr.get('/test', (req, res) => {
    res.send({ test: 'hello world' })
})
module.exports = rr