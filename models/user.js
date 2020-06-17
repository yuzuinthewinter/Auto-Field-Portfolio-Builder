const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    status: String,
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    profileimg: {
        filename:{
            type: String
        },
        data: Buffer,
        contentType: String
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);