const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        mongoose = require("mongoose"),
        User = require('../models/user'),
        middleware = require('../middleware'); 

// mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser: true});

//----------------------------------------------------

router.get('/',function(req,res){
    res.render('index', ({title : 'The Portfolio'}));
});

//--------------------------------------------------------------

router.get('/signin',function(req,res){
    res.render('signin', ({title : 'Sign In'}));
});

router.post('/signin',passport.authenticate('local',{
    successRedirect: '/portfolio',
    failureRedirect: '/signin'
}),function(req,res){

});

//--------------------------------------------------------------

router.get('/signup',function(req,res){
    res.render('signup', ({title : 'Sign Up'}));
});

router.post('/signup',function(req,res)
{
    if(req.body.password != req.body.cfpassword){
        return res.redirect('signup');
    }

    User.register(new User({
        status: 'general user',
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname}),
        req.body.password, function(err, user)
    {
        if(err){
            console.log(err);
            return res.redirect('/signup');
        }

        passport.authenticate('local')(req,res,function(){
            res.redirect('/portfolio');
        });
    });
});

//---------------------------------------------------------------


router.get('/signout',function(req,res){
    req.logout();
    res.redirect('/');
})



module.exports = router;