const { create } = require('../models/user');

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),

      middleware = require('../middleware'),
      User = require('../models/user'),
      Resume = require('../models/resume'),

      multer = require('multer'),
      fs = require('fs-extra'),
      bcrypt = require('bcryptjs');


router.get('/', middleware.isLoggedIn, function(req,res) {  
  User.findById(req.params.id, function(err, user){
    Resume.find({},(err, resume) => {
      res.render('user/project', {
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

          Fname: '',
          Lname: '',
          position: '', 
          nationality: '',
          introduce: '',
          
          highschool: '',
          college: '',
          major: '',
          gpax: '',
          
          skill: '',
          level: '',

          exp: '',
          place: '',
          year: '',

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
router.get('/contact', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/contact', { title: 'Contact us' });
});

//----------------------update profile picture---------------------------
router.get('/profile', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/profile', { title: 'Edit Profile' });
});
/*
<div id="image"><img src="data:image/jpeg;base64, <%= (users.image.data).toString('base64') %>" class="mx-auto d-block w-100 rounded"></div>
router.post('/profile', uploadimg.upload.single('image'), function(req, res, next) {
    var editfile = uploadimg.upIMG(req, res);
    if(editfile != false){
        user.image = editfile;
    }
});*/
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
router.post('/edit-profile/:id', middleware.isLoggedIn, function(req, res){
    let user = {};
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
  
    let query = {_id:req.params.id}
  
    User.updateMany(query, user, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/portfolio/profile');
      }
    });
});
//--------------------------------update user profile---------------------------------
//=========================================================

module.exports = router;

/*,
age: req.body.username,
date: req.body.username,   
nationality: req.body.username,
gender: req.body.username,
status: req.body.username,

highschool: req.body.username,
college: req.body.username,
major: req.body.username,
gpax: req.body.username,

skill: req.body.username,

exp: req.body.username,
year: req.body.username,

email: req.body.username,
fb: req.body.username,
ig: req.body.username,
line: req.body.username,
twitter: req.body.username*/