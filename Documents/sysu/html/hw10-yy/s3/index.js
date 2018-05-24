var flag_abort = 0;
window.onload = function() {
	$("#button").attr("status", "active");
	$("#button").click(function() {
		if($("#button").attr("status") == "active") {
			$("#button").attr("status", "inactive");
			click_li(".mask", afterGetNumber);
			click_li(".history", afterGetNumber);
			click_li(".message", afterGetNumber);
			click_li(".setting", afterGetNumber);
			click_li(".sign", afterGetNumber);
			$(".info").text("");
			flag_abort = 0;
		}
	});
	$("#button").mouseleave(function() {
		flag_abort = 1;
		$("li").each(function() {
			$(this).css({"background-color":"rgba(48, 63, 159, 1)"});
			$($(this).find(".redpoint")).addClass("unclick");
		});
		$(".info").text("");
		$(".info").css({"background-color":"grey"});
		$("#button").attr("status", "active");
	});
}
function afterGetNumber(name) {
	console.log(name);
	$(name).css({"background-color" : "grey"});
	$($(name).siblings()).each(function() {
		if ($($(this).find(".redpoint")).attr("class") == "redpoint unclick") {
			$(this).css({"background-color" : "rgba(48, 63, 159, 1)"});
		}
	});
	if (allclicked()) {
		click_info();
	}
}
function click_info() {
	var result = 0;
	$("li").each(function() {
		result += parseInt($($(this).find(".redpoint")).text());
		$(this).css({"background-color" : "rgba(48, 63, 159, 1)"});
	});
	$(".info").text(result);
	$(".info").css({"background-color" : "grey"});
	$("#button").attr("status", "active");
}
function click_li(name, callback) {
	if ($(name).prevAll())
		var clicked = $(name);
		var redpoint = clicked.find(".redpoint");
		$(redpoint).removeClass("unclick");
		$(redpoint).html("...");
		clicked.siblings().css({"background-color" : "grey"});
		// 同时进行ajax的操作
		$.ajaxSetup({
			cache: false
		});
		var xrh = $.get("server.js/number", function(result) {
			if (flag_abort) {
				console.log("abort");
				xrh.abort();
			} else {
				$($(name).find(".redpoint")).html(result);
				callback(name);
			}
		});
}
function allclicked() {
	var flag = 1;
	$("li").each(function() {
		if ($(this).find(".redpoint").html() == "...")
			flag = 0;
	});
	return flag;
}
