const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let resumeSchema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    position: String, 
    nationality: String,
    introduce: String,
    
    highschool: String,
    college: String,
    major: String,
    gpax: String,
    
    skill: String,

    exp: String,
    year: String,

    email: String,
    fb: String,
    ig: String,
    line: String,
    twitter: String,

});

module.exports = mongoose.model('resume', resumeSchema);