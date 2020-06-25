const { query } = require('express');

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
        res.render('user/port-comp', { title: 'Portfolio Website', resume:resume});
    });
});

router.get('/form-field/:id', middleware.isLoggedIn, function(req, res, next) {
    Resume.findById(req.params.id,function(err,resume){
        res.render('user/form-project', { title: 'Edit Project', _id:req.params.id, resume:resume});
    });
});

router.post('/form-field/:id', middleware.isLoggedIn, upload.single('picprofile'), async function(req, res){

    let Skill = req.body.skill;
    let Level = req.body.level;
    let Exp = req.body.exp;
    let Place = req.body.place;
    let Year = req.body.year;

    if(req.file) {
        Resume.findById(req.params.id, function(err, re){
            if(err){
                console.log(err);
                res.redirect('/project/'+req.params.id);
            } else{
                const imagePath = './public/uploads/' + re.picprofile;
                fs.unlink(imagePath, function(err){
                    if(err){
                        console.log(err);
                        res.redirect('project/'+req.params.id);
                    }
                });
            }
        });
        
        var all = {
            picprofile: req.file.filename, 
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            position: req.body.position, 
            nationality: req.body.nationality,
            introduce: req.body.introduce,
            
            highschool: req.body.highschool,
            college: req.body.college,
            major: req.body.major,
            gpax: req.body.gpax,
            
            skill: [],
            level: [],

            exp: [],
            place: [],
            year: [],

            email: req.body.email,
            fb: req.body.fb,
            ig: req.body.ig,
            line: req.body.line,
            twitter: req.body.twitter,

            template: req.body.template
        }

    } else {
        var all = { 
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            position: req.body.position, 
            nationality: req.body.nationality,
            introduce: req.body.introduce,
            
            highschool: req.body.highschool,
            college: req.body.college,
            major: req.body.major,
            gpax: req.body.gpax,
            
            skill: [],
            level: [],

            exp: [],
            place: [],
            year: [],

            
            fb: req.body.fb,email: req.body.email,
            ig: req.body.ig,
            line: req.body.line,
            twitter: req.body.twitter,

            template: req.body.template 
        }
    }
    console.log(all)
    Resume.findByIdAndUpdate(req.params.id, all, async function(error,update){
        console.log(req.body)
        if(error){
            console.log(error);
        }else{
            for(let skill of Skill){
                await update.skill.push(skill);
            } 
            for(let level of Level){
                await update.level.push(level);
            } 
            for(let exp of Exp){
                await update.exp.push(exp);
            } 
            for(let place of Place){
                await update.place.push(place);
            } 
            for(let year of Year){
                await update.year.push(year);
            } 
            await update.save(function(error, qwer) {
                console.log(qwer);
            });
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
    Resume.findByIdAndRemove(req.params.id , function(err, resume) {
        if (err) {
            res.redirect('/portfolio');
        } else {
            res.redirect('/portfolio');
        }
    });

    Image.findByIdAndRemove(req.params.id, function(error,update){
        if(error){
            console.log(error)
        }else{
            console.log("update")
        }
    });
});


module.exports = router;