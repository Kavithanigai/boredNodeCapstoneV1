const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load Riddle Model
require('../models/riddles');
const Riddle = mongoose.model('riddles');

// Riddle Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Riddle.find({user:req.user.id})
    .sort({date:'desc'})
    .then(riddles => {
      res.render('riddles/index', {
        riddles:riddles
      });
    });
});

// Add Riddle Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('riddles/add');
});

// Edit Riddle Form
router.get('/edit/:id',ensureAuthenticated, (req, res) => {
  Riddle.findOne({
    _id: req.params.id
  })
  .then(riddle => {
    if(riddle.user != req.user.id ){
      req.flash('error_msg','Not Authorized');
      res.redirect('/riddles');
    }else{
    res.render('riddles/edit', {
      riddle:riddle
    });
  }
  });
});

// Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if(!req.body.question){
    errors.push({text:'Please add a riddle'});
  }
  if(!req.body.answer){
    errors.push({text:'Please add an answer'});
  }

  if(errors.length > 0){
    res.render('/add', {
      errors: errors,
      question: req.body.question,
      answer: req.body.answer
    });
  } else {
    const newUser = {
      question: req.body.question,
      answer: req.body.answer,
      user: req.user.id
    }
    new Riddle(newUser)
      .save()
      .then(riddle => {
        req.flash('success_msg', 'New Riddle added');
        res.redirect('/riddles');
      })
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Riddle.findOne({
    _id: req.params.id
  })
  .then(riddle => {
    // new values
    riddle.question = req.body.question;
    riddle.answer = req.body.answer;

    riddle.save()
      .then(riddle => {
        req.flash('success_msg', 'Riddle updated');
        res.redirect('/riddles');
      })
  });
});

// Delete Idea
router.delete('/:id',ensureAuthenticated, (req, res) => {
  Riddle.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Riddle deleted');
      res.redirect('/riddles');
    });
});

module.exports = router;
