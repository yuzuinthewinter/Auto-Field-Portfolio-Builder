const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let imageSchema = new mongoose.Schema({
    projectid: {     
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    },
    picprofile: String
    
});
imageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Image', imageSchema);