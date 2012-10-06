$(document).ready(function(){	
	
	$('#pingPongAnim').addClass('selected');
	
	$('#carousel').autoSlider({
			slidesContainerId: 'slides',
			animation: 'pingPong',
			interval: 2000
	});
	
	$('#pingPongAnim').click(function(){
		for (var i = 1; i < 99999; i++)
        		window.clearInterval(i);
        	
        	$(this).siblings().removeClass('selected');
        	$(this).addClass('selected');
        		
		$('#carousel').autoSlider({
			slidesContainerId: 'slides',
			animation: 'pingPong',
			interval: 2000
		});	
	});
	
	$('#scrollFromFirstAnim').click(function(){
		for (var i = 1; i < 99999; i++)
        		window.clearInterval(i);
        	$(this).siblings().removeClass('selected');
        	$(this).addClass('selected');
		$('#carousel').autoSlider({
			slidesContainerId: 'slides',
			animation: 'scrollFromFirst',
			interval: 2000
		});	
	});
	
	$('#stop').click(function(){
		$(this).siblings().removeClass('selected');
        	$(this).addClass('selected');
		for (var i = 1; i < 99999; i++)
        		window.clearInterval(i);
	});
	
});