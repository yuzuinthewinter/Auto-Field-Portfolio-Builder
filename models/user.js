const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    _id: String,
    status: String,
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);