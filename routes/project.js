const { query } = require('express');
const resume = require('../models/resume');
const image = require('../models/image');

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      mongoose = require("mongoose"),
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
    Resume.findById(req.params.id,function(err,resume){
        // console.log(resume)
        res.render('user/form-project', { title: 'Edit Project', _id:req.params.id, resume:resume});
    });
});

router.post('/form-field/:id', middleware.isLoggedIn, upload.single('picprofile'), async function(req, res){

    resume.findByIdAndUpdate(req.params.id, req.body, function(error, update){
        if(error){
            console.log(error)
        }else{
            res.redirect('/project/'+req.params.id)
        }
    })
    let response = await image.aggregate([
        {
            $lookup:
            {
                localField: "projectid",
                from: "resumes",
                foreignField: "_id",
                as: "projectid"
            }
        },
        {
            $unwind: "$projectid"
        },
        {
          $match: {
            "projectid._id" : mongoose.Types.ObjectId(req.params.id)
          }
        },
      ])
    console.log(response)
    console.log(req.params.id)
    image.findByIdAndUpdate(response[0]._id, {picprofile: req.file.picprofile}, function(error,update){
        if(error){
            console.log(error)
        }else{
            console.log("update")
        }
    })
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