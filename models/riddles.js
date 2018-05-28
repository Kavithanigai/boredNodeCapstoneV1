const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RiddleSchema = new Schema({
  question:{
    type: String,
    required: true
  },
  answer:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  }
});

mongoose.model('riddles', RiddleSchema);
