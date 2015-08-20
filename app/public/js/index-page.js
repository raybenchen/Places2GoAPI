/*global $:false */

'use strict';

$('.celeb-img img').on('load', function() {
	$(this).parent().removeClass('shrinked');
	$(this).parent().addClass('expanded');
}).each(function() {
	if (this.complete) {
		$(this).load();
	}
});