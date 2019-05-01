const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    passwordhash: { type: String, required: true },
    email: {type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema);