// Agency Theme JavaScript

(function ($) {
	"use strict"; // Start of use strict
	
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('a.page-scroll').bind('click', function (event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});
	
	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 51
	});
	
	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function () {
		$('.navbar-toggle:visible').click();
	});
	
	// Offset for Main Navigation
	$('#mainNav').affix({
		offset: {
			top: 100
		}
	})
	
	// Visitor Warning
	
	var sentEmail = false;
	
	$(window).on('scroll', function () {
		var winScroll = $(this).scrollTop();
		if (winScroll > 50 && !sentEmail) {
			console.log('attempting email send')
			$.ajax({
				type: "GET",
				url: '/visit',
				processData: false,
				contentType: 'application/json',
				cache: false,
				success: function () {
					console.log('sent Email =)')
				}
			})
			sentEmail = true;
		}
	})
	
})(jQuery); // End of use strict
