const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user'),
      middleware = require('../middleware');


router.get('/',middleware.isLoggedIn,function(req,res){
    res.render('user/project');
});

router.get('/home',middleware.isLoggedIn,function(req,res){
    res.render('/index');
});

router.get('/contact',middleware.isLoggedIn,function(req,res){
    res.render('user/contact');
});

router.get('/setting',middleware.isLoggedIn,function(req,res){
    res.render('user/setting');
});

module.exports = router;