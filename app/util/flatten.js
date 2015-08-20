'use strict';

/**
 * Return the Big 5 Traits normalized
 * @return Array      The 5 main traits
 */
var big5 = function(tree) {
  var profile = typeof (tree) === 'string' ? JSON.parse(tree) : tree;
  var _big5 = profile.tree.children[0].children[0].children;
  return _big5.map(function(trait) {
      return { name: trait.name, value: trait.percentage };
  });
};

module.exports.big5 = big5;