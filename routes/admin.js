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

router.get('/show/:id', middleware.isLoggedIn, function(req, res, next) {
    let query = {_id:req.params.id}
    User.findById(query, function(err, user){
        Resume.find({},(err, resume) => {
            res.render('admin/show', { 
                resume: resume, 
                user:user, 
                title: user.username.toUpperCase()
            });
        });
    });
});

router.get('/showproject/:id', middleware.isLoggedIn, async function(req, res, next) {
    Resume.findById(req.params.id, function(err, resume){
        if(resume._id != req.params.id){
            res.redirect('/show'+req.params.id);
        }
        res.render('admin/showproject', { title: 'Portfolio Website', resume:resume});
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

router.get('/search',middleware.isLoggedIn, function(req,res){
    if(req.query.search){
        var keyword = req.query.search;
        const regax = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({username: regax}, function(err, user){
            if(err){
                console.log(err);
            } else {
                res.render('admin/manage-user', { users:user, title: 'Manage User'});
            }
        })
    }
});

module.exports = router;

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}