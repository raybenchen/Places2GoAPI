'use strict';

var mongoose = require('mongoose');
var BusinessSchema = mongoose.Schema({
  name:      		String,
  id:  				String,
  category:   		String,
  full_address:		String,
  stars: 			Number,
  review_count:    	Number,
  latitude:     	Number,
  longitude:		Number,
  profile: 			String
});

var ReviewSchema = mongoose.Schema({
	business_id: String,
	date: Date,
	stars: Number,
	text: String
});

module.exports = mongoose.model('Review', ReviewSchema);
module.exports = mongoose.model('Business', BusinessSchema);