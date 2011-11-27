window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback, element){
	    window.setTimeout(callback, 1000 / 60)
	}
	
})();

//TODO : Create instances so that the behaviour is separated and can be used for different objects on the site
Animator = {
    init : function(){
	var trigger = $('#basic-trigger');
	var subject = $('.dancer');
	this.origin_x = subject.position().left;
	this.origin_y = subject.position().top;
	this.subject = subject[0];
	
	this.check_drawing_area();
	this.x = 0;
	this.y = 0;
	this.new_destination();
	trigger.unbind('click');
	trigger.click(function(){Animator.kill_animation()});
	trigger.text('Click me to stop animating');
	this.go_on = true;
	this.animate();
    },

    go_on : true,
    speed : 0.1,
    max_x : 0,
    max_y : 0,
    
    animate : function(){
	if(!Animator.go_on){
	    return;
	}

	Animator.check_drawing_area();

	var flag = 0;
	if( (Math.abs(Animator.dest_x - Animator.x)) > 1 ){
	    Animator.x += (Animator.dest_x - Animator.x)*Animator.speed;
	    Animator.subject.style.left = Animator.x + 'px';
	}
	else{
	    flag++;
	}

	if( (Math.abs(Animator.dest_y - Animator.y)) > 1 ){
	    Animator.y += (Animator.dest_y - Animator.y)*Animator.speed;
	    Animator.subject.style.top = Animator.y + 'px';
	}
	else{
	    flag++;
	}

	if(flag >= 2){
	    Animator.new_destination();
	}
	
	requestAnimFrame(Animator.animate, Animator.subject);
    },

    new_destination : function(){
	Animator.dest_x = Math.random()*Animator.max_x;
	Animator.dest_y = Math.random()*Animator.max_y;
    },

    check_drawing_area : function(){
	var width = parseInt(Animator.subject.style.width) || 0;
	var height = parseInt(Animator.subject.style.height) || 0;
	Animator.max_x = Math.floor(window.innerWidth - width);
	Animator.max_y = Math.floor(window.innerHeight - height);
    },

    kill_animation : function(){
	var trigger = $('button.trigger#basic-trigger');
	trigger.unbind('click');
	trigger.click(function(){Animator.init()});
	trigger.text('Click me to start animating');
	this.go_on = false;
    }
}

document.ready = function(){
    $('button.trigger#basic-trigger').click(function(){
	Animator.init();
    });
}