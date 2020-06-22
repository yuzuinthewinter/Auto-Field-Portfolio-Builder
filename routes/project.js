const { query } = require('express');

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),

      middleware = require('../middleware'),
      User = require('../models/user'),
      Resume = require('../models/resume'),

      multer = require('multer'),
      fs = require('fs-extra'),
      bcrypt = require('bcryptjs');

//--------------------------------------------------------------------------------------
router.get('/:id', middleware.isLoggedIn, async function(req, res, next) {
    Resume.findById(req.params.id, function(err, resume){
        if(resume._id != req.params.id){
            res.redirect('/portfolio/');
        }
        res.render('user/port-comp', { title: 'Portfolio Website', resume:resume});
    });
});

router.get('/form-field/:id', middleware.isLoggedIn, function(req, res, next) {
    Resume.findById(req.body,function(err,resume){
        console.log(resume)
        res.render('user/form-project', { title: 'Edit Project', _id:req.params.id});
    });
});

router.post('/form-field/:id', middleware.isLoggedIn, async function(req, res){

    let query = {_id:req.params.id}

    const resume = await Resume.updateOne(query, req.body)
        let result = {
          ...resume
        }

    Resume.updateMany(query, resume, function(err,resume){
        if(err){
            console.log(err);
            return;
          } else {
            res.redirect('/project/'+req.params.id);
          }
    });
});

router.post('/form-field/:id', middleware.isLoggedIn,  function(req,res)
{
    Resume.create(req.body,function(err,re){
        console.log(re)
        res.render('user/template', { title: 'Template',_id:re._id ,userid:req.user._id});
    });
});

router.get('/deleteproject/:id', middleware.isLoggedIn, function(req, res) {
    Resume.findByIdAndRemove(req.params.id, function(err, resume) {
        if (err) {
            res.redirect('/portfolio');
        } else {
            res.redirect('/portfolio');
        }
    });
});

module.exports = router;