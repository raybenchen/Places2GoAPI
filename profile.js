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

var personality_insights = new watson.personality_insights(config.services.personality_insights);

Business.find({}, function(err, bizs){
	bizs.forEach(function(biz){
		logger.info("for biz: "+biz.id);
		var text = "";
		Review.find({}, function(err, revs){
			
			if(err)
				logger.info(err);
			
			revs.forEach(function(rev){
				text += rev.text+ " ";
			});
			logger.info("final text " + text);
		});
		
		//logger.info("final text " + text);
	});
	
	
});
	
	
	
	/*var profile = personality_insights.profile({contentItems: text}, function(data){
		biz.profile = JSON.stringify(data);
		biz.save();
	});*/
