'use strict';

var mongoose = require('mongoose'),
  extend = require('extend');

var UserSchema = mongoose.Schema({
  name:      String,
  username:  String,
  profile:   String,
  followers: Number,
  tweets:    Number,
  id:        String,
  image:     String,
  updated:   { type: Date, default: Date.now }
});

// Create a new user or update the existing one
UserSchema.statics.createOrUpdate = function(profile, done){
  var User = this;
  // Build dynamic key query
  var query = { username: profile.username };

  // Search for a profile from the given auth origin
  User.findOne(query, function(err, user){
      if(err) return done(err);
      if(user) {
        extend(user,profile);
        user.save(function(err, user){
          if(err) return done(err);
          done(null, user);
        });
      } else {
        // New user, create
        User.create(
          extend({},profile),
          function(err, user){
            if(err) return done(err);
            done(null, user);
          }
        );
      }
    });
};

module.exports = mongoose.model('User', UserSchema);

