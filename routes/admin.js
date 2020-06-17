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

router.get('/', middleware.isLoggedIn, function(req, res, next) {
    res.render('admin/admin', { title: 'Admin' });
});      
router.get('/manage-user', middleware.isLoggedIn, function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/manage-user', { users: users, title: 'Manage User'});
            console.log(users);
        }
    });
});   
router.get('/manage-template', middleware.isLoggedIn, function(req, res, next) {
    res.render('admin/manage-template', { title: 'Manage Template' });
}); 

router.get('/view/:id', middleware.isLoggedIn, function(req, res, next) {

    console.log(req.params.id);
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            res.render('admin/view', { users: user , title: user.username.toUpperCase()});
        }
    });
}); 

router.get('/delete/:id', middleware.isLoggedIn, function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.redirect('../manage-user');
        } else {
            res.redirect('../manage-user');
        }
    });
});

module.exports = router;