'use strict';

var router = require('express').Router(),
  mongoose = require('mongoose'),
  fs       = require('fs'),
  Q        = require('q'),
  Profile  = mongoose.model('Profile'),
  User     = mongoose.model('User'),
  logger   = require('../../config/logger');


/**
 * Render the celebrity list
*/
router.get('/', function(req,res) {
  Profile.find({},function(err,profiles){
    if (err)
      res.render('celebrities',{error: err});
    else
      res.render('celebrities',{profiles: profiles});
  });
});

/**
 * Render the celebrity list
*/
router.get('/users', function(req,res) {
  User.find({},function(err,profiles){
    if (err)
      res.render('celebrities',{error: err});
    else
      res.render('celebrities',{profiles: profiles});
  });
});


var getUserId = function(text) {
  return text.replace('.json','');
};

var jsonProfiles = function(text) {
  return text.indexOf('.json', text.length - '.json'.length) !== -1;
};

/**
 * Validate twitter usernames
*/
router.get('/syncdb', function (req, res) {
  logger.info('update celebrity database');
  var removeAll = Q.denodeify(Profile.remove.bind(Profile)),
    getFiles = Q.denodeify(fs.readdir),
    getUsers = Q.denodeify(req.twit.getUsers.bind(req.twit)),
    getFile = Q.denodeify(fs.readFile);

  removeAll({})
  .then(function() {
    return getFiles('./profiles');
  })
  .then(function(files){
    if (!files || files.length === 0)
      return;

    var user_ids = files.filter(jsonProfiles).map(getUserId),
      count = Math.ceil(user_ids.length / 100),
      promises = [];

    for (var i = 0; i < count; i++) {
      var ids = user_ids.slice(0,100);
      user_ids = user_ids.slice(Math.min(100, user_ids.length));
      promises.push(getUsers({user_id:ids.join(',')}));
    }
    return Q.all(promises);
  })
  .then(function(usersArray){
    var users = [];
    usersArray.forEach(function(_users){
      users = users.concat(_users);
    });

    logger.info(users.length);
      return Q.all(users.map(function(u){
        u.profile = require('../../profiles/'+u.id+'.json');
		u.profile = JSON.stringify(u.profile);
		logger.info("Profile: "+u.profile);
		return Profile.create(u);
        
    }));
  })
  .then(function(){
    res.redirect('/celebrities');
  })
  .catch(function (error) {
    logger.error(error);
    res.render('celebrities',{error:error});
  });
});

module.exports = router;
