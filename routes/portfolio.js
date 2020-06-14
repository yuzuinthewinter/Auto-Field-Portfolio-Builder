const { create } = require('../models/user');

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user'),
      middleware = require('../middleware'),
      Resume = require('../models/resume')


router.get('/', middleware.isLoggedIn, function(req,res) {    
    const projects = [{
        nameproject: 'Test project',
        createdAt: new Date()
    },
    {
        nameproject: 'Test project2',
        createdAt: new Date()
    },
    {
        nameproject: 'Test project3',
        createdAt: new Date()
    }
    ]
    res.render('user/project', { projects: projects, title: 'Project'});
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
router.get('/edit-profile', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/profile', { title: 'Edit Profile' });
});
router.get('/setting', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/setting', { title: 'Setting' });
});
  
//--------------------------------------------------------------------------------------
router.get('/myproject', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/port-comp', { title: 'Portfolio Website' });
});

router.get('/build-a-project', middleware.isLoggedIn, function(req, res, next) {
    res.render('user/buildproject', { title: 'Build a project' });
});

router.post('/build-a-project', middleware.isLoggedIn, async function(req,res)
{
    try {
      const resume = await Resume.create(req.body)
      let result = {
        ...resume
      }
      // console.log(result)
      res.redirect('/portfolio/myproject');
    } catch(err) {
      console.log(err)
    }

});


  

//=========================================================

module.exports = router;