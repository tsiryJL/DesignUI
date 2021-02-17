(function ($) {
	'use strict';

	/*-------------------------------------------------------------------------------
	  Menu
	-------------------------------------------------------------------------------*/

	$('.a-nav-toggle').on('click', function(){
		if ($('html').hasClass('body-menu-opened')) {
			$('html').removeClass('body-menu-opened').addClass('body-menu-close');
		} else {
			$('html').addClass('body-menu-opened').removeClass('body-menu-close');
		}
	});


	/*-------------------------------------------------------------------------------
	  Pagepiling
	-------------------------------------------------------------------------------*/

	if ( $('.a-pagepiling').length ) {
		$('.a-pagepiling').pagepiling({
			scrollingSpeed: 280,
			menu: '#menu, #menuMain',
			anchors: ['About', 'Services', 'Skills', 'Resume', 'Portfolio', 'Awards', 'Testimonials', 'Clients', 'Contact'],
			loopTop: false,
			loopBottom: false,
			navigation: {
				'position': 'right'
			},
			onLeave: function(){
				$('.a-progressbar .progress-bar').each(function() {
					if ($('.slide-skills').hasClass('active')) {
						$(this).width($(this).attr('aria-valuenow') + '%');
					} else {
						$(this).width('0');
					}
				});

				typedText();
			}
		});
	}

	/*-------------------------------------------------------------------------------
	  Typed Text
	-------------------------------------------------------------------------------*/

	function typedText() {
		$('.a-slide-typed').each(function() {
			var thisSlide = $(this);
			if (thisSlide.hasClass('active')) {
				var typedDiv = '.a-typed-' + thisSlide.data('name');
				$(typedDiv).html('');
				var typedText = thisSlide.find('.a-typed').data('text');

				var typedT = new Typed(typedDiv, {
					strings: [
						typedText
					],
					typeSpeed: 60,
					startDelay: 1000,
					loop: false,
					showCursor: false
				});
			}
		});
	}

	$(window).load(function () {
		typedText();
	});

	/*-------------------------------------------------------------------------------
	  Parallax
	-------------------------------------------------------------------------------*/

	if ( $('#a-parallax').length ) {
		var scene = document.getElementById('a-parallax');
		var parallax = new Parallax(scene);
	}

	/*-------------------------------------------------------------------------------
	  Carousels
	-------------------------------------------------------------------------------*/

	if ( $('.a-portfolio-carousel').length ) {
		var owl = $('.a-portfolio-carousel');
		owl.owlCarousel({
			items: 3,
			smartSpeed: 750,
			margin: 30,
			autoplayHoverPause: true,
			dots: true,
			nav: false,
			dotData: false,
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				900:{
					items: 3
				}
			}
		});
	}

	if ( $('.a-testimonial-carousel').length ) {
		var owl = $('.a-testimonial-carousel');
		owl.owlCarousel({
			items: 1,
			smartSpeed: 750,
			margin: 30,
			autoplayHoverPause: true,
			dots: true,
			nav: false
		});
	}



	/*-------------------------------------------------------------------------------
	  Ajax Forms
	-------------------------------------------------------------------------------*/

	if ($('.a-form').length) {
		$('.a-form').each(function(){
			$(this).validate({
				errorClass: 'error',
				submitHandler: function(form){
					$.ajax({
						type: "POST",
						url:"mail.php",
						data: $(form).serialize(),
						success: function() {
							$('.form-group-message').show();
							$('#error').hide();
							$('#success').show();
						},
						error: function(){
							$('.form-group-message').show();
							$('#success').hide();
							$('#error').show();
						}
					});
				}
			});
		});
	}

}($));

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
	delta = this.period;
	this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	this.isDeleting = false;
	this.loopNum++;
	delta = 500;
	}

	setTimeout(function() {
	that.tick();
	}, delta);
};
