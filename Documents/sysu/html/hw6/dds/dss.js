window.onload = function() {
	hole();
	before();
}
function hole() {
	var play = document.getElementById("playground");
	for (var i = 0; i < 60; i++) {
		var hole = document.createElement("input");
		hole.type = "radio";
		hole.className = "hole";
		play.appendChild(hole);
	}
}
/*游戏开始前的状态*/
function before() {
	document.getElementById("start").innerHTML = "Start Game";
	document.getElementById("countdown").className = "";
	document.getElementById("game").value = "Game Over";
	for (var i = 0; i < 60; i++) {
		playground[i].removeEventListener("click", hitmouse);  //防止游戏结束时的残留
		playground[i].disabled = true;
		playground[i].checked = false;
	}
}
var time = 0;
var flag = 0;
document.getElementById("start").onclick = function() {
	if (flag == 0) {
		/*开始游戏*/
		before();
		flag = 1;
		document.getElementById("start").innerHTML = "Stop Game";
		var val = document.getElementById("countdown").value;  //可自己输入时间
		if (val > 0) {
			countdown(val);
		} else {
			countdown("30");
		}
		document.getElementById("game").value = "PLAYING..";
		mouse();
	} else {
		/*暂停*/
		flag = 0;
		for (var i = 0; i < 60; i++) {
			playground[i].disabled = true;
			playground[i].removeEventListener("click", hitmouse);  
		}
		document.getElementById("start").innerHTML = "Continue";
		document.getElementById("game").value = "Pause";
	}
}
var playground = document.getElementById("playground").children;
/*--------------地鼠-------------*/
function mouse() {
	for (var i = 0; i < 60; i++) {
		playground[i].disabled = false;
		playground[i].addEventListener("click", othermouse);
	}
	createmouse();
}
/*--------------随机-------------*/
function createmouse() {
	if (flag) {
		var i = parseInt(Math.random()*60);
		playground[i].checked = true;
		playground[i].removeEventListener("click", othermouse);
		playground[i].addEventListener("click", hitmouse);
		}
}
/*--------------打地鼠+1-------------*/
function hitmouse() {
	if (flag) {
	event.target.checked = false;
	event.target.removeEventListener("click", hitmouse);
	event.target.addEventListener("click", othermouse);
	var val = document.getElementById("score_").value;
	val = parseInt(val)+1;
	document.getElementById("score_").value = val;
	createmouse();
	}
}
/*--------------打错-1-------------*/
function othermouse() {
	if (flag) {
	event.target.checked = false;
	var val = document.getElementById("score_").value;
	if (val > 0) {
		val = parseInt(val)-1;
		document.getElementById("score_").value = val;
	}
	}
}
/*--------------倒计时-------------*/
function countdown(i) {
	var val = parseInt(i);
	if (flag == 1) {
		var time = document.getElementById("countdown");
		time.value = val;
		/*结束*/
		if (val == 0) {
			flag = 0;
			var val = document.getElementById("score_").value;
			alert("Game Over.\nYour score is:"+val);
			document.getElementById("score_").value = 0;
			before();
		} else {
			/*x 小于5s时警报 */
			if (val < 5) {
				document.getElementById("countdown").className = "red";
			}
			val--;
			setTimeout("countdown("+val+")", 1000);
		}
	}
}