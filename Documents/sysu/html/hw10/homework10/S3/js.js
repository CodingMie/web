var data1 = [];
var count = 0;
var button = ["a_button","b_button","c_button","d_button","e_button"]
var button_num = 0;
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
				$(".result").find("span").html("");
				sendmsg($(this).attr("id"));
				$(this).find("span").show();
			}
		});
	});
	$(".icon").click(function(){
		$('#'+button[0]).trigger("click");
		$('#'+button[1]).trigger("click");
		$('#'+button[2]).trigger("click");
		$('#'+button[3]).trigger("click");
		$('#'+button[4]).trigger("click");
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
	$('#'+_button).find("span").show();
	$('#'+_button).find("span").html("...");
	$.post("/", function(data){
		$('#'+_button).find("span").html(data);
		data1[count++] = data;
		closebutton(_button);
		cancaculate();
	});
}
function closebutton(_button){
	$('#'+_button).attr("class","clicked_button");
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
}
function caculate() {
	var sum = 0;
	for(var i = 0; i < 5; i++){
		sum += Number(data1[i]);
	}
	count = 0
	$(".result").find("span").html(sum);
}
