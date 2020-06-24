const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let resumeSchema = new mongoose.Schema({
    id: String,
    userid: {     
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },   
    nameproject: String,
    created: {
        type: Date,
        default: Date.now
    },

    picprofile: String,
    
    Fname: String,
    Lname: String,
    position: String, 
    nationality: String,
    introduce: String,
    
    highschool: String,
    college: String,
    major: String,
    gpax: String,
    
    skill: Array,
    level: Array,

    exp: Array,
    place: Array,
    year: Array,

    email: String,
    fb: String,
    ig: String,
    line: String,
    twitter: String,

    template: String
    
});

module.exports = mongoose.model('resume', resumeSchema);