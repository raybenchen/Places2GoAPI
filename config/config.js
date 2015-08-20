'use strict';

var logger = require('./logger'),
  bluemix  = require('./bluemix'),
  extend   = require('extend'),
  env      = process.env.VCAP_SERVICES ? 'prod' : 'dev';

var services = {
  mongodb: 'mongodb://localhost:27017/celebs',

  personality_insights: {
	url: "https://gateway.watsonplatform.net/personality-insights/api",
	username: "c6a28177-c6cf-40ee-8e6f-cfe8dae8fdbd",
	password: "bxaMV62kOQH0",
        version: 'v2'
  },

  twitter: [
  // Twitter app credentials: https://apps.twitter.com/app
  {
    consumer_key:       'DHjDSeWMCwwEakq445LJFgSjo',
    consumer_secret:    'KJWqNhRd78jTLW0blfYKrH1G8Acg0zOvbBHasFkDUVzHHa92B4',
    access_token_key:   '11058162-33Ur8zfrSYtHo5RldRmbYyJq3P5xvBeAERFraZeIK',
    access_token_secret: 'MJmLeIfRZtgw8rRcJefFlnQA74zUHXOlzrXpEmozYvyMO'
  }],
  
  yelp: [
  {
	consumer_key:		'RG7KdeRIdDtZoH8kWlKTvA',
	consumer_secret:	'eHYj_8BXJ8Kp6pbEqzQJWVlRIZc',
	access_token_key:	'jbSWJxxo3Gi1a0fRMtiqh9EznPeiptmM',
	access_token_secret:'h7A2MMu77R1tbVqF2zRZZ27EifA'
	  
  }]
  
};


// Get the service
if (env === 'prod') {
  services.mongodb = bluemix.serviceStarsWith('mongodb').url;
  services.personality_insights = extend({'version':'v2'}, bluemix.serviceStartsWith('personality_insights'));
}

logger.info('mongodb:',services.mongodb);
logger.info('personality_insights:',services.personality_insights);

module.exports = {
    services: services,
    host: 'ec2-54-191-204-35.us-west-2.compute.amazonaws.com',
    port: 3000
};
