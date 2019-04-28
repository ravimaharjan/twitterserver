const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

module.exports = {
    createUser,
    getAll
};
async function createUser(userParam) {
    console.log(userParam)
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user = new User({
        username: userParam.username,
        firstname: userParam.firstname,
        lastname: userParam.lastname,
        passwordhash: bcrypt.hashSync(userParam.password, 10),
        email: userParam.email
    });

    await user.save();
}

async function getAll(){
    await User.find().select('-hash');
}
