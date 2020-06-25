const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        mongoose = require("mongoose"),
        User = require('../models/user'),

        path = require('path'),
        multer = require('multer'),
        middleware = require('../middleware'); 

// mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser: true});



const storage = multer.diskStorage({
destination: './public/uploads',
 filename:function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});      
    
const imageFilter = function(req,file,cb){
    var ext = path.extname(file.originalname);
    if(ext != '.png' && ext != '.gif' && ext != '.jpg' && ext != '.jpeg'){
    return cb(new Error('only image is allowed'), false)
    }
    cb(null,true);  
}
const upload = multer({storage: storage,fileFilter:imageFilter})


//----------------------------------------------------

router.get('/',function(req,res){
    res.render('index', ({title : 'The Portfolio'}));
});

//--------------------------------------------------------------

router.get('/signin',function(req,res){
    res.render('signin', ({title : 'Sign In'}));
});

router.post('/signin',passport.authenticate('local',{
        failureFlash: true,
        failureFlash: 'Invalid username or password!',
        failureRedirect: '/signin'
    }),function(req,res){
        if (req.user.status == 'admin') {
            req.flash('success','Welcome to Resume-master');
            res.redirect('/admin');
        } else {
            req.flash('success','Welcome to Resume-master');
            res.redirect('/portfolio');
        }
});

//--------------------------------------------------------------

router.get('/signup',function(req,res){
    res.render('signup', ({title : 'Sign Up'}));
});

router.post('/signup',function(req,res)
{
    if(req.body.password != req.body.cfpassword){
        req.flash('error','Passwords do no match');
        return res.redirect('signup');
    }

    User.register(new User({
        status: 'user',
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profileimg: 'user.png'}),
        req.body.password, function(err, user)
    {
        if(err){
            req.flash('error','Try Again');
            console.log(err);
            return res.redirect('/signup');
        }

        passport.authenticate('local')(req,res,function(){ 
            req.flash('success','Welcome to Resume-master');
            res.redirect('/portfolio');
        });
    });
});

//---------------------------------------------------------------


router.get('/signout',function(req,res){
    req.flash('success','You log out successfully');
    req.logout();
    res.redirect('/');
})



module.exports = router;