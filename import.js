'use strict';
var mongoose = require('mongoose');
var logger   = require('./config/logger');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

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


Review.remove({}, function(err){
	logger.info("Error: "+err);

	var instream = fs.createReadStream('./yelp_academic_dataset_review.json');
	var outstream = new stream;
	var rl = readline.createInterface(instream, outstream);

	rl.on('line', function(line) {
		logger.info(line);
		var rev = JSON.parse(line);
		logger.info("processing review: "+rev.business_id);
		Review.create({
						text: rev.text,
						business_id: rev.business_id,
						date: rev.date,
						stars: rev.stars
				});
	});

	rl.on('close', function() {
	  // do something on finish here
	});
});

 

 

/*Business.remove({}, function (err) {
	logger.info("Error: "+err);
	
	new lazy(fs.createReadStream('./yelp_academic_dataset_business.json'))
     .lines
     .forEach(function(line){
         var biz = JSON.parse(line);
		 logger.info("found biz: "+line);
		 Business.create({ 
							name: biz.name, 
							id: biz.business_id, 
							category: biz.categories[0], 
							full_address: biz.full_address,
							stars: biz.stars,
							review_count: biz.review_count,
							latitude: biz.latitude,
							longitude: biz.longitude
					});
		 }
	 );
	
	
});*/