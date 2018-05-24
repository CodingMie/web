window.onload = function() {
	$("#button").attr("status", "active");
	$("#button").click(function() {
		$(".info").text("");
		if ($("#button").attr("status") == "active") {
			$("#button").attr("status", "inactive");
			flag_abort = 1;
			var name = [".mask", ".history", ".message", ".setting", ".sign"];
			callback();
		}
	});
	$("#button").mouseleave(function() {
		flag_click = 0;
		$("#button").attr("status", "active");
		$("li").each(function() {
			$(this).css({"background-color":"rgba(48, 63, 159, 1)"});
			$($(this).find(".redpoint")).addClass("unclick");
		});
		$(".info").text("");
		$(".info").css({"background-color":"grey"});
		flag_abort = 0;
	});
}
//回调part~
function callback() {
		click_li(".mask", function() {
			click_li(".history", function() {
				click_li(".message", function() {
					click_li(".setting", function() {
						click_li(".sign", function() {
							$(".info").css({"background-color" : "rgba(48, 63, 159, 1)"});
							click_info();
						});
					});
				});
			});
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
}
//模拟click li
function click_li(name, callback) {
	//这个可以阻止一部分的点at以后离开他然后再点，但是如果点的太快这个就没用TT TT
	if ($(name).prevAll().find(".unclick").length != 0) {
		console.log($(name).prevAll().find(".unclick"));
		return;
	}
	$($(name).find(".redpoint")).html("...");
	$(name).css({"background-color" : "rgba(48, 63, 159, 1)"});
	var clicked = $(name);
	var redpoint = clicked.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	clicked.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		$($(name).find(".redpoint")).html(result);
		callback();
	});
}
//模拟click info
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
function allclicked() {
	var flag = 1;
	$("li").each(function() {
		if ($(this).find(".redpoint").attr("class") == "redpoint unclick" || 
			$(this).find(".redpoint").html() == "...")
			flag = 0;
	});
	return flag;
}