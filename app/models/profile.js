'use strict';

var mongoose = require('mongoose');
var ProfileSchema = mongoose.Schema({
  name:      String,
  username:  String,
  profile:   String,
  followers: Number,
  tweets:    Number,
  id:        String,
  image:     String
});

module.exports = mongoose.model('Profile', ProfileSchema);