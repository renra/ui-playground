//TODO : Create instances so that the behaviour is separated and can be used for different objects in the site
Animator = {
    animate : function(){
	var subject = $('.dancer');
	for(var i = 0; i < subject.length; i++){
	    var width = parseInt(subject[i].style.width) || 0;
	    var height = parseInt(subject[i].style.height) || 0;
	    var max_x = (width == 0) ? 100 : (Math.floor(100-100*width/window.innerWidth));
	    var max_y = (height == 0) ? 100 : (Math.floor(100-100*height/window.innerHeight));
	    
	    subject[i].style.left = Math.random()*max_x + '%';
	    subject[i].style.top = Math.random()*max_y + '%';
	}
	//requestAnimFrame(animate, subject);
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