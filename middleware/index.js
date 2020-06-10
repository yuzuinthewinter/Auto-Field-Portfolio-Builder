// const Resume = require('../models/resume');


let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
    }

module.exports = middlewareObj;
