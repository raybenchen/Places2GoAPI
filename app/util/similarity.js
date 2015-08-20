'use strict';

var logger = require('../../config/logger');

/**
 * Return the euclidean distance between two profiles
 * @param  json origin The personality insights profile
 * @param  json target The personality insights profile
 * @return Array      The 5 main traits
 */
var similarity = function(/*object*/ origin, /*object*/ target) {
  origin = typeof (origin) === 'string' ? JSON.parse(origin) : origin;
  target = typeof (target) === 'string' ? JSON.parse(target) : target;
  var distance = 0.0,
    origin_big5 = origin.tree.children[0].children[0].children,
    target_big5 = target.tree.children[0].children[0].children;
	
	logger.info(JSON.stringify(origin.tree.children[1].children[0].children));
	var origin_needs = origin.tree.children[1].children[0].children;
	var target_needs = target.tree.children[1].children[0].children;
	
	var origin_values = origin.tree.children[2].children[0].children;
	var target_values = target.tree.children[2].children[0].children;

    // for each trait in origin personality...
    /*origin_big5.forEach(function(trait, i) {
      distance += Math.pow(trait.percentage - target_big5[i].percentage, 2);
    });*/
	
	origin_needs.forEach(function(trait, i) {
		distance += Math.pow(trait.percentage - target_needs[i].percentage, 2);
	});
	
	origin_values.forEach(function(trait, i) {
		distance += Math.pow(trait.percentage - target_values[i].percentage, 2);
	});
	
	
    var ret = 1 - (Math.sqrt(distance/(origin_needs.length + origin_values.length)));
    return ret;
};

module.exports = similarity;