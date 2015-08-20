/*global $:false */

'use strict';

/**
 * Display a celebrity and its traits
 * @param  {Object} celebrity the object with the twitter user,
 * profile and distance
 */
function displayCelebrity(celebrity) {
  $('.cel_name').text(celebrity.user.name);
  $('.cel_username').text('@' + celebrity.user.username);
  $('.cel_username').attr('href', 'https://twitter.com/' + celebrity.user.username);
  $('.cel_distance').text(Math.round(celebrity.distance * 100) + '%');
  $('.cel_image').attr('src', celebrity.user.image.replace('_normal', '_400x400'));

  // Big 5
  celebrity.profile.forEach(function(trait, i) {
    $('#trait_' + i).css('left', 'calc(' + (trait.value * 100) + '%)');
  });
}

/**
 * On click handler for celebrity images.
 * Get the celebrity id and call displayCelebrity if it exists
 * @param  {Object} e event
 */
$('.avatar-small').click(function(e) {
  var celebrity;
  var id = $(this).find('img').prop('id');
  if (id.match('^s_'))
    celebrity = similar_celebs[id.slice(2)];
  else
    celebrity = different_celebs[id.slice(2)];

  if (celebrity)
    displayCelebrity(celebrity);
  else
    console.log('celebrity not found!');

});

/**
 * On click handler for unhiding .overlay-screen.how-it-worked popup overlay.
 */
$(document).on('click', '.how-it-works-link', function() {
  $('.overlay-screen.how-it-worked').fadeIn(200);
  $('#wrap').css({
    'overflow': 'hidden',
    'height': '100%'
  });
});

/**
 * On click handler for hiding .overlay-screen.how-it-worked popup overlay.
 */
$(document).on('click', '.button.back', function() {
  $('.overlay-screen.how-it-worked').fadeOut(200);
  $('#wrap').css({
    'overflow': 'none',
    'height': 'auto'
  });
});

/**
 * On hover handler for making user's points bigger and celeb's points smaller
 */
$(document).on('mouseenter', '.avatars-row > .me', function() {
  $('.mep').addClass('bigger');
  $('.celebrityp').addClass('smaller');
});
$(document).on('mouseleave', '.avatars-row > .me', function() {
  $('.mep').removeClass('bigger');
  $('.celebrityp').removeClass('smaller');
});

/**
 * On hover handler for making celeb's points bigger and user's points smaller
 */
$(document).on('mouseenter', '.avatars-row > .celebrity', function() {
  $('.mep').addClass('smaller');
  $('.celebrityp').addClass('bigger');
});
$(document).on('mouseleave', '.avatars-row > .celebrity', function() {
  $('.mep').removeClass('smaller');
  $('.celebrityp').removeClass('bigger');
});

/**
 * On load handler for loading images a little more gracefully
 */
$('.page-content img').on('load', function() {
  // $(this).addClass('revealed');
  $(this).addClass('revealed');
}).each(function() {
  if (this.complete) {
    $(this).load();
  }
});

$(document).ready(function() {
  displayCelebrity(similar_celebs[0]);
});