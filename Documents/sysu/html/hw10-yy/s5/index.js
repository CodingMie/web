window.onload = function() {
	$("#button").attr("status", "active");
	$("#button").click(function() {
		if($("#button").attr("status") == "active") {
			$("#button").attr("status", "inactive");
			$(".info").text("");
			callback();
		}
	});
	$("#button").mouseleave(function() {
			$("li").each(function() {
				$(this).css({"background-color":"rgba(48, 63, 159, 1)"});
				$($(this).find(".redpoint")).addClass("unclick");
			});
			$("p").html("");
			$(".info").text("");
			$(".info").css({"background-color":"grey"});
			$("#button").attr("status", "active");
	});
}

function aHandler(sum,callback) {
	var A = $(".mask");
	A.css({"background-color" : "rgba(48, 63, 159, 1)"});
	var redpoint = A.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	A.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		if (Math.random() < 0.5) {
			$("p").html("A：这是个天大的秘密");
		} else {
			$("p").html("A：这不是个天大的秘密");
		}
		$(redpoint).html(result);
		sum += parseInt(result);
		A.css({"background-color" : "grey"});
		callback(sum);
	});
}
function bHandler(sum,callback) {
	var A = $(".history");
	A.css({"background-color" : "rgba(48, 63, 159, 1)"});
	var redpoint = A.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	A.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		if (Math.random() < 0.5) {
			$("p").html("B：我不知道");
		} else {
			$("p").html("B：我知道");
		}
		$(redpoint).html(result);
		sum += parseInt(result);
		A.css({"background-color" : "grey"});
		callback(sum);
	});
}
function cHandler(sum,callback) {
	var A = $(".message");
	A.css({"background-color" : "rgba(48, 63, 159, 1)"});
	var redpoint = A.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	A.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		if (Math.random() < 0.5) {
			$("p").html("C：你不知道");
		} else {
			$("p").html("C：你知道");
		}
		$(redpoint).html(result);
		sum += parseInt(result);
		A.css({"background-color" : "grey"});
		callback(sum);
	});
}
function dHandler(sum, callback) {
	var A = $(".setting");
	A.css({"background-color" : "rgba(48, 63, 159, 1)"});
	var redpoint = A.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	A.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		if (Math.random() < 0.5) {
			$("p").html("D：他不知道");
		} else {
			$("p").html("D：他知道");
		}
		$(redpoint).html(result);
		sum += parseInt(result);
		A.css({"background-color" : "grey"});
		callback(sum);
	});
}
function eHandler(sum, callback) {
	var A = $(".sign");
	A.css({"background-color" : "rgba(48, 63, 159, 1)"});
	var redpoint = A.find(".redpoint");
	$(redpoint).removeClass("unclick");
	$(redpoint).html("...");
	A.siblings().css({"background-color" : "grey"});
	$.get("server.js/number", function(result) {
		if (Math.random() < 0.5) {
			$("p").html("E：才怪");
		} else {
			$("p").html("E：才不怪");
		}
		$(redpoint).html(result);
		sum += parseInt(result);
		A.css({"background-color" : "grey"});
		callback(sum);
	});

}
function callback() {
	var func = [aHandler, bHandler, cHandler, dHandler, eHandler];
	var play = ["A", "B", "C", "D", "E"];
	var list = [0, 1, 2, 3, 4];
	list.sort(function() {
		return Math.random() - 0.5;
	});
	var text = "";
	for(var i = 0; i < 5; i++) {
		text += play[list[i]];
	}
	$(".info").css({"font-size" : "20pt"});
	$(".info").text(text);
	var result = "";
	var callback = [];
	for (var i = 0; i < 4; i++) {
		(function(i) {
			callback[list[i]] = function(sum) {
				func[list[i+1]](sum, callback[list[i+1]]);
			}
		})(i);
	}
	callback[list[4]] = click_info;
	var sum = 0;
	func[list[0]](sum, callback[list[0]]);
}
function click_info(sum) {
	$("p").html("大气泡：楼主异步调用战斗力感人，目测不超过" + sum);
	$(".info").css({"font-size" : "40pt"});
	$(".info").text(sum);
	$(".info").css({"background-color" : "grey"});
	$("#button").attr("status", "active");
	$("li").each(function() {
		$(this).css({"background-color" : "rgba(48, 63, 159, 1)"});
	});
}