var data = [];
var count = 0;
var isbreak = false;
window.onload = function (){
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
				sendmsg($(this).attr("id"));
				$(this).find("span").show();
				$(".result").find("span").html("")
			}
		});
	});
	$(".result").click(function(){
		if(cancaculate()) {
			caculate();
			$(".result").css("background-color","gray");
			count = 0;
		}
	});
}
function addmouseEvent() {
	$("#at-plus-container").mouseleave(function(){
		intialize();
		$(".result").find("span").html("")
		isbreak = true;
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
        	recoverbutton(_button);
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
		$(".result").css("background-color","rgba(48, 63, 159, 1)");
		return true;
	} else return false;
}
function intialize() {
	$(".clicked_button").each(function() {
		$(this).attr("class","button");
		$(this).find("span").html("");
		$(this).find("span").hide();
	});
	$(".result").css("background-color","gray");
	count = 0;
}
function caculate() {
	var sum = 0;
	for(var i = 0; i < 5; i++){
		sum += Number(data[i]);
	}
	count = 0
	$(".result").find("span").html(sum);
}