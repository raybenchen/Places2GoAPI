'use strict';

var flatten  = require('./flatten'),
  similarity = require('./similarity');


// Utility function to sort the profiles based on distance
var profileSort = function (p1, p2) {
  return p2.distance-p1.distance;
};

module.exports = {

  /**
   * Transform Tweets to ContentItems to be used
   * @param  {Twitter tweet} A tweet from the Twitter API
   */
  toContentItem : function(tweet) {
    return {
      id: tweet.id_str,
      userid: tweet.user.id_str,
      sourceid: 'twitter',
      language: 'en',
      contenttype: 'text/plain',
      content: tweet.text.replace('[^(\\x20-\\x7F)]*',''),
      created: Date.parse(tweet.created_at)
    };
  },
  /**
   * Transform a twitter user to our app user
   * @param  {Twitter User} twitter representation of a user
   * @return {models.User}     internal representation of a user
   */
  toAppUser : function(user) {
    return {
      name: user.name,
      username: user.screen_name.toLowerCase(),
      id: user.id_str,
      followers: user.followers_count,
      tweets: user.statuses_count,
      verified: user.verified,
      protected: user.protected,
      image: user.profile_image_url
    };
  },

  /**
   * Calculate the euclidean distance between user and celebs
   * @param  {Object} user   the user object
   * @param  {Array} celebs the celebs
   * @return {Array} celebs and distances
   */
  calculateDistances: function(user, celebs) {
    return celebs.map(function(celebrity) {
      var ret = {
        user: celebrity,
        distance: similarity(user.profile, celebrity.profile),
        profile: flatten.big5(celebrity.profile)
      };
      return ret;
    }).sort(profileSort);
  }
};