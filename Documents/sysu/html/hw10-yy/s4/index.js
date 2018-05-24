window.onload = function() {
	$("#button").attr("status", "active");
	$("#button").click(function() {
		if($("#button").attr("status") == "active") {
			$("#button").attr("status", "inactive");
			callback();
		}
	});
	$("#button").mouseleave(function() {
			$("li").each(function() {
				$(this).css({"background-color":"rgba(48, 63, 159, 1)"});
				$($(this).find(".redpoint")).addClass("unclick");
				$($(this).find(".redpoint")).html("...");
			});
			$(".info").text("");
			$(".info").css({"background-color":"grey"});
			$("#button").attr("status", "active");
	});
}
function callback() {
	var name = [".mask", ".history", ".message", ".setting", ".sign"];
	var play = ["A", "B", "C", "D", "E"];
	var list = [0, 1, 2, 3, 4];
	//排序
	list.sort(function() {
		return Math.random() - 0.5;
	});
	var result = "";
	var callback = [];
	for (var i = 0; i <= 4; i++) {
		result += play[list[i]];
		(function(i) {
		callback[list[i]] = function() {
			click_li(name[list[i+1]], callback[list[i+1]]);
		}
		})(i);
	}
	$(".info").css({"font-size" : "20pt"});
	$(".info").text(result);
		callback[list[4]] = function() {
			click_info();
		}
		click_li(name[list[0]], callback[list[0]]);
}
function click_li(name, callback) {
	$(name).css({"background-color" : "rgba(48, 63, 159, 1)"});
	var clicked = $(name);
	var redpoint = clicked.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	clicked.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		$($(name).find(".redpoint")).html(result);
		$(name).css({"background-color" : "grey"});
		callback();
	});
}
function click_info() {
	var result = 0;
	$("li").each(function() {
		result += parseInt($($(this).find(".redpoint")).text());
		$(this).css({"background-color" : "rgba(48, 63, 159, 1)"});
	});
	$(".info").css({"font-size" : "40pt"});
	$(".info").text(result);
	$(".info").css({"background-color" : "grey"});
	$("#button").attr("status", "active");
}
function allclicked() {
	var flag = 1;
	$("li").each(function() {
		if ($(this).find(".redpoint").attr("class") == "redpoint unclick")
			flag = 0;
	});
	return flag;
}
