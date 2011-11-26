//How can I do this better in javascript?
var speed_modifier = 0.15;

function animate(){
    console.log('Re-rendering');
    var subject = $('.dancer');
    for(var i = 0; i < subject.length; i++){
	var width = parseInt(subject[i].style.width) || 0;
	var height = parseInt(subject[i].style.height) || 0;
	var max_x = (width == 0) ? 100 : (Math.floor(100-100*width/window.innerWidth));
	var max_y = (height == 0) ? 100 : (Math.floor(100-100*height/window.innerHeight));
	var coor_x = parseInt(subject[i].style.left) || 0;
	var coor_y = parseInt(subject[i].style.top) || 0;

	console.log('width ' + width);
	console.log('height ' + height);
	console.log('window height ' + window.innerHeight);
	console.log('max_x ' + max_x);
	console.log('max_y ' + max_y);

	coor_x = Math.random()*max_x + '%';
	coor_y = Math.random()*max_y + '%';

	console.log(coor_x);
	console.log(coor_y);
	
	subject[i].style.left = coor_x;
	subject[i].style.top = coor_y;
    }
    //requestAnimFrame(animate, subject);
}

function animation_loop(){
    setInterval(animate, 1000);
}