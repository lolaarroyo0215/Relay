const mongoose = require('mongoose');

//Structure for storing users in the database
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true}, //unique usernames required
    password: String,

}, {timestamps: true}); //we can see what time accounts are created

const userModel = mongoose.model('User', UserSchema);

//this syntax is used as opposed to exports because this is a common js file
module.exports = userModel;
