$(document).ready(function(){
	
    // Back to Top
    if ($('#back2top').length) {
        var scrollTrigger = 100,
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back2top').addClass('show');
                } else {
                    $('#back2top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back2top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
	$(window).on("scroll",function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 10) {
			$(".siteheader").addClass("stickhead");
		} else {	
			$(".siteheader").removeClass("stickhead");
		}	
	});
// 	$('.search-btn').on("click",function(){
// 		$('#search-panel').slideDown('fast');
// 		$('#search-panel input').on("focus");
// 	});
// 	$('#search-panel .closebtn').on("click",function(){
// 		$('#search-panel').slideUp('fast');
// 	});

	$('.navbar-toggle').on("click",function(){
		$(this).toggleClass('is-active');
		$('#menu').toggleClass('showmenu');
		$('.menu_overlay').fadeToggle();
		$('.visible-top').toggleClass('vtfxd');
		$('body, html').toggleClass('oh');
		$('#back2top').fadeToggle();
	});
	$('.menu_overlay').on("click",function(){
		$('.navbar-toggle').removeClass('is-active');
		$('#menu').removeClass('showmenu');
		$(this).fadeOut();
		$('.visible-top').removeClass('vtfxd');
		$('body, html').removeClass('oh');
		$('#back2top').fadeIn();
	});
	$('#menu .closebtn').on("click",function(){
		$('#menu').removeClass('showmenu');
	});
	$('.ftxt_btn').on("click",function(){
		$(".ftxt_btn").html(($(".ftxt_btn").html() == 'Close <i class="fa fa-angle-up"></i>') ? 'More <i class="fa fa-angle-down"></i>' : 'Close <i class="fa fa-angle-up"></i>').fadeIn();
		$('.footer_txt').slideToggle();
		$('html, body').animate({scrollTop: $('.footer_txt').offset().top - 100}, 500);
	});
	
	$('.job-btn').on("click",function(){
		$('html, body').animate({scrollTop: $('#openings').offset().top - 220}, 500);
	});
	
	if ( $(window).width() < 768 ) {
		$('.menu_list>li').removeClass('selc');
	}
	$('.moretxt_btn span').on("click",function(){
		$('.moretxt').slideToggle();
		$(".moretxt_btn span").html(($(".moretxt_btn span").html() == 'Hide Text <i class="fa fa-angle-up"></i>') ? 'Continue Reading..' : 'Hide Text <i class="fa fa-angle-up"></i>');
	});
	$('.agreebtn a').on("click",function(){
	    $('.agreebtn .agree-msg').toggleClass('show').toggleClass('hide');
    });
    
    setTimeout(function(){
    	   $('#cookies').slideDown();// or fade, css display however you'd like.
    }, 60000);
    });

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger: 'hover',
    });
});

$(document).ready(function(){
	$('.all_services').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow:4,
		slidesToScroll:3,
		//variableWidth: true,
		nextArrow: '<button type="button" class="slick-next"><img src="/front/public/assets/images/right-arrow.svg"></button>',
		prevArrow: '<button type="button" class="slick-prev"><img src="/front/public/assets/images/left-arrow.svg"></button>',
		//appendArrows: $('.slick-nav', this),
		responsive: [
			 {breakpoint: 768, settings: {slidesToShow: 1}},
		]
	});
	$('.blog_style').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow:3,
		slidesToScroll:3,
		nextArrow: '<button type="button" class="slick-next"><img src="/front/public/assets/images/right-arrow.svg"></button>',
		prevArrow: '<button type="button" class="slick-prev"><img src="/front/public/assets/images/left-arrow.svg"></button>',
		//appendArrows: $('.slick-nav', this),
		responsive: [
			 {breakpoint: 768, settings: {slidesToShow: 1, slidesToScroll: 1}},
			 {breakpoint: 992, settings: {slidesToShow: 2, slidesToScroll: 2}},
		]
	});
});