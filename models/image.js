const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let imageSchema = new mongoose.Schema({
    projectid: {     
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    },
    picprofile: String,
    pic2: String,
    pic3: String,
    pic4: String,
    pic5: String
    
});
imageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Image', imageSchema);