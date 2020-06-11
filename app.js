const   express = require("express"),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        passport = require('passport'),
        passportLocal = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        methodOverride = require('method-override'),
        path = require('path'),
        // ----------------Model----------------------
        User = require('./models/user'),
        // ------------------------------------------------
        indexRouter = require('./routes/index');
        portfolioRouter = require('./routes/portfolio');
        userRouter = require('./routes/user');
        // templateRouter = require('./routes/template');
        

let app = express();

mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useUnifiedTopology',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'CSS227',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(function(req,res,next){
    res.locals.portfolio = req.resume;
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect('/login');
// }


app.get("*",function(req,res,next){
    res.locals.user = req.user || null;
    res.locals.portfolio = req.resume || null;
    next();
});

//routes
app.use('/',indexRouter);
app.use('/portfolio',portfolioRouter);
app.use('/user',userRouter);
// app.use('/template',templateRouter);

//start server
app.listen(3000,function(req,res){
    console.log('Portfolio has started!');
});






