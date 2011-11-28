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

Animator = {
    master_kill : false,
    master_speed : 0.1,
    max_x : 0,
    max_y : 0,
    dancers : [],
    
    init : function(){
	var dancers = $(this).parent().parent().find('.dancer');
	var jquery_wrapper = null;
	var index = null;
	Animator.master_kill = false;
	for(var i = 0; i < dancers.length; i++){
	    jquery_wrapper = $(dancers[i]);
	    index = Animator.dancers.length;
	    Animator.dancers[index] = {
		element : dancers[i],
		pos_x : jquery_wrapper.position().left,
		pos_y : jquery_wrapper.position().top,
		speed : Animator.master_speed,
		go_on : true
	    }

	    Animator.delimit_dancing_area_for(index);
	    Animator.set_destination_for(index);
	}

	$(this).unbind('click');
	$(this).click(Animator.kill_animation);
	$(this).text('Click me to stop animating');

	Animator.animate();
    },

    continue : function(){
	$(this).unbind('click');
	$(this).click(Animator.kill_animation);
	$(this).text('Click me to stop animating');
	
	Animator.master_kill = false;
	Animator.animate();
    },
    
    animate : function(){
	if(Animator.master_kill){
	    console.log('Killing');
	    return;
	}

	var flag = null;
	var dancer = null;
	for(var i in Animator.dancers){
	    dancer = Animator.dancers[i];
	    Animator.delimit_dancing_area_for(i);

	    flag = 0;
	    if( (Math.abs(dancer.dest_x - dancer.pos_x)) > 1 ){
		dancer.pos_x += (dancer.dest_x - dancer.pos_x)*dancer.speed;
		dancer.element.style.left = dancer.pos_x + 'px';
	    }
	    else{
		flag++;
	    }

	    if( (Math.abs(dancer.dest_y - dancer.pos_y)) > 1 ){
		dancer.pos_y += (dancer.dest_y - dancer.pos_y)*dancer.speed;
		dancer.element.style.top = dancer.pos_y + 'px';
	    }
	    else{
		flag++;
	    }

	    if(flag >= 2){
		Animator.set_destination_for(i);
	    }
	}
	
	requestAnimFrame(Animator.animate, Animator.dancers);
    },

    delimit_dancing_area_for : function(index){
	var subject = Animator.dancers[index];
	var width = parseInt(subject.element.style.width) || 0;
	var height = parseInt(subject.element.style.height) || 0;
	subject.max_x = Math.floor(window.innerWidth - width);
	subject.max_y = Math.floor(window.innerHeight - height);
    },

    set_destination_for : function(index){
	var subject = Animator.dancers[index];
	subject.dest_x = Math.random()*subject.max_x;
	subject.dest_y = Math.random()*subject.max_y;
    },

    kill_animation : function(){
	$(this).unbind('click');
	$(this).click(Animator.continue);
	$(this).text('Click me to continue animating');
	Animator.master_kill = true;
    }
}

document.ready = function(){
    $('button.trigger#basic-trigger').click(Animator.init);
}