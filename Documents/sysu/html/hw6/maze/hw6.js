/*js*/
var gameStart = 0;
var cheat;
var s = document.getElementById("start");
var e = document.getElementById("end");
var dog = document.getElementById("dog");
s.onmouseover = function() {
	gameStart = 1;
	cheat = 0;
	document.getElementById("result").innerHTML = "";
	hit();
}
e.onmouseover = function() {
	var result = document.getElementById("result");
	if (gameStart == 1) {
		if (cheat == 0) result.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
		else result.innerHTML = "You win!";
	}
	gameStart = 0;
	dog.style.left = "0px";
	dog.style.top = "10px";
}
document.onmousemove = function() {
	if(gameStart) {
		var i = (window.innerWidth-500)/2;
		dog.style.left = event.clientX-i+"px";
		dog.style.top = event.clientY-360+"px";
	}
}
document.getElementById("cheat").onmouseover = function() {
	cheat = 1;
}

function Dead() {
	gameStart = 0;
	document.getElementById("result").innerHTML = "you lose";
	dog.style.left = "0px";
	dog.style.top = "10px";
}
function hit() {
	var wall = document.getElementById("wall").childNodes;
	for (var i = 0; i < wall.length; i++) {
		wall[i].onmouseover = function() {
			if (gameStart == 1){
				this.className = 'red';
				Dead();
			}
		}
		wall[i].onmouseleave = function() {
			this.className = 'w';
		}
	}
}