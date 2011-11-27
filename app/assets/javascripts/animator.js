//TODO : add compatibility for other browsers later
window.requestAnimFrame = (function(){
    return requestAnimationFrame ||
	webkitRequestAnimationFrame ||
	mozRequestAnimationFrame ||
	oRequestAnimationFrame ||
	msRequestAnimationFrame ||
	function(callback, element){
	    window.setTimeout(callback, 1000 / 60)
	}
	
})();

//TODO : Create instances so that the behaviour is separated and can be used for different objects on the site
Animator = {
    animate : function(){
	console.log('Animating');
	var subject = $('.dancer');
	for(var i = 0; i < subject.length; i++){
	    var width = parseInt(subject[i].style.width) || 0;
	    var height = parseInt(subject[i].style.height) || 0;
	    var max_x = (width == 0) ? window.innerWidth : (Math.floor(window.innerWidth - width));
	    var max_y = (height == 0) ? window.innerHeight : (Math.floor(window.innerHeight - height));
	    
	    subject[i].style.left = Math.random()*max_x + 'px';
	    subject[i].style.top = Math.random()*max_y + 'px';
	    //This works too fast and does not really animate. I guess it works just with pixels
	    //requestAnimFrame(Animator.animate, subject[i]);
	}
    },

    animation_loop : function(){
	//Can 'this' be used here somehow?
	var trigger = $('button.trigger#basic-trigger');
	trigger.attr('onclick', 'Animator.kill_animation();');
	trigger.text('Click me to stop animating');
	this.interval_id = setInterval(this.animate, 1000);
    },

    kill_animation : function(){
	var trigger = $('button.trigger#basic-trigger');
	trigger.attr('onclick', 'Animator.animation_loop();');
	trigger.text('Click me to start animating');
	clearInterval(this.interval_id);	
    }
}