// var Script = function () {



// 	//    sidebar dropdown menu

// 	jQuery('#sidebar .sub-menu > a').click(function () {
// 		var last = jQuery('.sub-menu.open', $('#sidebar'));
// 		last.removeClass("open");
// 		jQuery('.arrow', last).removeClass("open");
// 		jQuery('.sub', last).slideUp(200);
// 		var sub = jQuery(this).next();
// 		if (sub.is(":visible")) {
// 			jQuery('.arrow', jQuery(this)).removeClass("open");
// 			jQuery(this).parent().removeClass("open");
// 			sub.slideUp(200);
// 		} else {
// 			jQuery('.arrow', jQuery(this)).addClass("open");
// 			jQuery(this).parent().addClass("open");
// 			sub.slideDown(200);
// 		}
// 		var o = ($(this).offset());
// 		diff = 200 - o.top;
// 		if (diff > 0)
// 			$("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
// 		else
// 			$("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
// 	});

// 	//    sidebar toggle


// 	$(function () {
// 		function responsiveView() {
// 			var wSize = $(window).width();
// 			if (wSize <= 768) {
// 				$('#container').addClass('sidebar-close');
// 				$('#sidebar > ul').hide();
// 			}

// 			if (wSize > 768) {
// 				$('#container').removeClass('sidebar-close');
// 				$('#sidebar > ul').show();
// 			}
// 		}
// 		$(window).on('load', responsiveView);
// 		$(window).on('resize', responsiveView);
// 	});

// 	$('.icon-reorder').click(function () {
// 		if ($('#sidebar > ul').is(":visible") === true) {
// 			$('#main-content').css({
// 				'margin-left': '0px'
// 			});
// 			$('#sidebar').css({
// 				'margin-left': '-180px'
// 			});
// 			$('#sidebar > ul').hide();
// 			$("#container").addClass("sidebar-closed");
// 		} else {
// 			$('#main-content').css({
// 				'margin-left': '180px'
// 			});
// 			$('#sidebar > ul').show();
// 			$('#sidebar').css({
// 				'margin-left': '0'
// 			});
// 			$("#container").removeClass("sidebar-closed");
// 		}
// 	});

// 	// custom scrollbar
// 	$("#sidebar").niceScroll({
// 		styler: "fb",
// 		cursorcolor: "#e8403f",
// 		cursorwidth: '3',
// 		cursorborderradius: '10px',
// 		background: '#404040',
// 		cursorborder: ''
// 	});

// 	$("html").niceScroll({
// 		styler: "fb",
// 		cursorcolor: "#e8403f",
// 		cursorwidth: '6',
// 		cursorborderradius: '10px',
// 		background: '#404040',
// 		cursorborder: '',
// 		zindex: '1000'
// 	});

// 	// widget tools

// 	jQuery('.widget .tools .icon-chevron-down').click(function () {
// 		var el = jQuery(this).parents(".widget").children(".widget-body");
// 		if (jQuery(this).hasClass("icon-chevron-down")) {
// 			jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
// 			el.slideUp(200);
// 		} else {
// 			jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
// 			el.slideDown(200);
// 		}
// 	});

// 	jQuery('.widget .tools .icon-remove').click(function () {
// 		jQuery(this).parents(".widget").parent().remove();
// 	});

// 	//    tool tips

// 	$('.tooltips').tooltip();

// 	//    popovers

// 	$('.popovers').popover();



// 	// custom bar chart

// 	if ($(".custom-bar-chart")) {
// 		$(".bar").each(function () {
// 			var i = $(this).find(".value").html();
// 			$(this).find(".value").html("");
// 			$(this).find(".value").animate({
// 				height: i
// 			}, 2000)
// 		})
// 	}


// 	//custom select box

// 	//    $(function(){
// 	//
// 	//        $('select.styled').customSelect();
// 	//
// 	//    });



// 	// daterangepicker
// 	$('#date-range').daterangepicker({
// 		"startDate": "11/12/2016",
// 		"endDate": "11/18/2016"
// 	}, function (start, end, label) {
// 		console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
// 	});



// };


var App = function () {

	var resetCotentBodyHeight = function() {
			var header_h = $('.sila .header').height();
			var window_h = $(window).height();

			var sidebar = $('.sila .body .left');
			$(sidebar).height(window_h - header_h);

	}

	var addDatePrototypeDateAdd = function() {
		if ( !Date.prototype.DateAdd ) {
			//+————————————————— 
			//| 日期计算 
			//+————————————————— 
			Date.prototype.DateAdd = function(strInterval, Number) { 
				var dtTmp = this; 
				switch (strInterval) { 
					case 's' : return new Date(dtTmp.getTime() + (1000 * Number)); 
					case 'n' : return new Date(dtTmp.getTime() + (60000 * Number)); 
					case 'h' : return new Date(dtTmp.getTime() + (3600000 * Number)); 
					case 'd' : return new Date(dtTmp.getTime() + (86400000 * Number)); 
					case 'w' : return new Date(dtTmp.getTime() + ((86400000 * 7) * Number)); 
					case 'q' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
					case 'm' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
					case 'y' : return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
				} 
			} 
		}
	}




	return {
		init: function()  {
			resetCotentBodyHeight();
			addDatePrototypeDateAdd();
		}
	}
}();


