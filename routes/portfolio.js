const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user'),
      middleware = require('../middleware');


router.get('/', middleware.isLoggedIn, function(req,res){    
    res.render('user/project', { title: 'My Project' });
});

//=========================================================


/* GET users listing. */
router.get('/about', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/about', { title: 'About Us' });
  });
  router.get('/', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/project', { title: 'My Project' });
  });
  router.get('/template', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/template', { title: 'Template' });
  });
  router.get('/contact', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/contact', { title: 'Contact us' });
  });
  router.get('/edit-profile', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/profile', { title: 'Edit Profile' });
  });
  router.get('/setting', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/setting', { title: 'Setting' });
  });
  
  router.get('/build-a-project', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/buildproject', { title: 'Build a project' });
  });
  

//=========================================================

module.exports = router;