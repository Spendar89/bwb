$(document).ready(function(){
	$('.new-div .search-btn').click(function(){
		$('.ajax-loader .progress').fadeIn();
		$('.ajax-loader .progress .progress-bar').animate({width: '100%' }, 1000);
	});

})