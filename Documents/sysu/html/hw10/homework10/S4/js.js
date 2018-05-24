var data = [];
var count = 0;
var button = ["a_button","b_button","c_button","d_button","e_button"]
var button_num = 0;
window.onload = function (){
	randomOrder();
	addClickEvent();
	addmouseEvent();
}
function addClickEvent() {
	$(".button").each(function() {
		$(this).find("span").hide();
	});
	$(".button").each(function() {
		$(this).click(function(){
			if($(this).attr("class") == "button") {
				$(".result").find("span").html("");
				sendmsg($(this).attr("id"));
				$(this).find("span").show();
			}
		});
	});
	$(".icon").click(function(){
		$('#'+button[button_num]).trigger("click");
	});
}
function addmouseEvent() {
	$("#at-plus-container").mouseleave(function(){
		intialize();
		$(".result").find("span").html("")
	});
	$("#at-plus-container").mouseenter(function(){
		intialize();
		$(".result").find("span").html("");
	});
	$(".result").find("span").html("")
}
function sendmsg(_button) {
	var xmlhttp;
	if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
	else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=function(){
    	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        	$('#'+_button).find("span").html(xmlhttp.responseText);
        	data[count++] = xmlhttp.responseText;
        	button_num++;
        	recoverbutton(_button);
        	if(button_num < 5) $('#'+button[button_num]).trigger("click");
        	cancaculate();
		} else {
			$('#'+_button).find("span").html("...");
			closeallbutton(_button);
		}
	}
	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}
function recoverbutton(_button){
	$(".clicked_button").each(function() {
		if($(this).find("span").html() == ""){
			$(this).attr("class","button");
		}
	});
	$('#'+_button).attr("class","clicked_button");
}
function closeallbutton(_button) {
	$(".button").each(function() {
		$(this).attr("class","clicked_button");
	});
	$('#'+_button).attr("class","button");
}
function cancaculate() {
	if(count == 5) {
		caculate();
		$(".result").css("background-color","gray");
		count = 0;
	}
}
function intialize() {
	$(".clicked_button").each(function() {
		$(this).attr("class","button");
		$(this).find("span").html("");
		$(this).find("span").hide();
	});
	$(".result").css("background-color","gray");
	count = 0;
	button_num = 0;
}
function caculate() {
	var sum = 0;
	for(var i = 0; i < 5; i++){
		sum += Number(data[i]);
	}
	count = 0
	$(".result").find("span").html(sum);
}
function randomOrder() {
	for(var i = 0; i < 5; i++){
		var num = Math.round(Math.random() * 4);
		var temp = button[num];
		button[num] = button[i];
		button[i] = temp;
	}
}
