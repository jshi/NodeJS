/**
 * Stores all routes for "/"
 */

var express = require('express');
var passport = require('passport');

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require('../../models/user');

var router = express.Router();

// routes
router.get('/', function(req, res){
    res.render('home/');
});

router.get('/home', function(req, res){
    res.render('home/home');
});

router.get('/about', function(req, res){
    res.render('home/about');
});

router.get('/posts', ensureAuthenticated, function(req, res){
    res.render('home/posts');
});

router.get('/login', function(req, res){
    res.render('home/login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));

router.get('/logout', function(req, res){
    //logout
    req.logout(function(err){
        if (err) { return next(err); }
        //redirect
        res.redirect('/home');
    });
});

router.get('/signup', function(req, res){
    res.render('home/signup');
});

router.post('/signup', function(req, res, next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    //check if user already exists
    User.findOne({email: email}, function(err, user){
        if (err) { return next(err); }
        //user already exists (with specified email)
        if (user) {
            req.flash('error', 'There is already an account with this email');
            return res.redirect('/signup');
        }

        //create new user object
        var newUser = new User({
            username:username,
            email:email,
            password:password
        });

        newUser.save(next);
    });
}, passport.authenticate('login', {
    successRedirect:'/',
    failureRedirect:'/signup',
    failureFlash:true
}));

module.exports = router;