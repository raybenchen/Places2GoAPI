'use strict';

var mongoose = require('mongoose');
var logger   = require('./config/logger');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var watson = require('watson-developer-cloud');

var config = require('./config/config');
	
require('./app/models/business');

var connect = function () {
  logger.profile('connect-to-mongodb');
  var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
  };
  mongoose.connect(config.services.mongodb, options);
};
connect();

mongoose.connection.on('error', logger.error.bind(logger, 'mongoose-connection-error:'));
mongoose.connection.on('open', logger.profile.bind(logger,'connect-to-mongodb'));
mongoose.connection.on('disconnected', connect);

var Review = mongoose.model('Review');
var Business = mongoose.model('Business');

Business.find({}, function(err, bizs) {
	
	bizs.forEach(function (biz){
		Review.find({ business_id: biz.id}, function(err, revs){
			if(err)
				logger.info("Error: "+err);
			
			revs.forEach(function(rev){
				logger.info("logger text" + rev.text);
			});
		});
	});
	
});

