const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load Users Model
require('../models/users');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

//Post Login route
router.post('/login', (req, res,next) => {
  passport.authenticate('local',{
    successRedirect:'/riddles',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req,res,next);
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

//Post register route
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email:req.body.email})
    .then(user => {
      if(user){
        req.flash('error_msg','Email already exists.');
        res.redirect('/users/register');
      }else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10,(err,salt) =>{
          bcrypt.hash(newUser.password, salt, (err,hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(newUser =>{
              req.flash('success_msg', 'You are now registered and can login!');
              res.redirect('/users/login');
            })
            .catch(err =>{
              console.log(err);
              return;
            });
          });
        });
      }
    });

    //res.send('passed');
  }
});

//logout
// User Register Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg','You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
