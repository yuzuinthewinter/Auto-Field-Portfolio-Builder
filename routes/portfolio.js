const { create } = require('../models/user');

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),

      middleware = require('../middleware'),
      User = require('../models/user'),
      Resume = require('../models/resume'),
      Image = require('../models/image'),

      path = require('path'),
      multer = require('multer'),
      fs = require('fs-extra'),
      bcrypt = require('bcryptjs');

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

router.get('/', middleware.isLoggedIn, function(req,res) {  
  User.findById(req.params.id, function(err, user){
    Resume.find({},(err, resume) => {
      res.render('user/project', {
        template: '',
        nameproject: '',
        resume: resume,          
        title: 'Project'
      });
    });
  });
});

router.post('/newproject',middleware.isLoggedIn, async function(req,res) {
    
  let resume = new Resume({
    nameproject: req.body.nameproject,
    userid: req.user._id,
    picprofile: 'profile.png',

    Fname: '',
    Lname: '',
    position: '', 
    nationality: '',
    introduce: '',
    
    highschool: '',
    college: '',
    major: '',
    gpax: '',
    
    skill: [],
    level: [],

    exp: [],
    place: [],
    year: [],

    email: '',
    fb: '',
    ig: '',
    line: '',
    twitter: '',

    template: 'default1'
  });
        
  resume.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success','Create success');
      res.redirect('/portfolio');
    }
  });
});

//=========================================================


/* GET users listing. */
router.get('/about', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/about', { title: 'About Us' });
});
router.get('/template', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/template', { title: 'Template' });
});
router.get('/showtemplate', middleware.isLoggedIn, function(req, res, next) {
  res.render('user/showtemplate', { title: 'Example Template', template:'default1'});
});
router.post('/showtemplate', middleware.isLoggedIn, function(req, res, next) {
  res.render('user/showtemplate', { title: 'Example Template' });
});

router.get('/contact', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/contact', { title: 'Contact us' });
});

//----------------------update profile picture---------------------------
router.get('/profile', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/profile', { title: 'Edit Profile' });
});
//----------------------update profile picture---------------------------
router.get('/setting', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/setting', { title: 'Setting' });
});

//--------------------------------update user profile---------------------------------
router.get('/edit-profile/:id', middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(user._id != req.params.id){
            res.redirect('/portfolio/profile/');
        }
        res.render('/edit-profile', {user:user});
    });
});
router.post('/edit-profile/:id', middleware.isLoggedIn, upload.single('profileimg'), function(req, res){
    if(req.file) {
      User.findById(req.params.id, function(err, re){
          if(err){
              console.log(err);
              res.redirect('/setting');
          } else{
              const imagePath = './public/uploads/' + re.profileimg;
              fs.unlink(imagePath, function(err){
                  if(err){
                      console.log(err);
                      res.redirect('/setting');
                  }
              });
          }
      });
      var user = {
          profileimg: req.file.filename,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          status: req.body.status,
          email: req.body.email
      };
    } else {
        var user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          status: req.body.status,
          email: req.body.email
        };
    }
    console.log(user)
    User.findByIdAndUpdate(req.params.id, user, function(error,update){
        console.log(req.body)
        if(error){
            console.log(error);
        }else{
            req.flash('success','Update success');
            res.redirect('/portfolio/profile/');
        }
    });
});
//--------------------------------update user profile---------------------------------
//=========================================================

module.exports = router;