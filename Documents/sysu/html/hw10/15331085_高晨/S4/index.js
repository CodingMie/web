var order = ["A", "B", "C", "D", "E"];
var statement = [false, false, false, false, false];
var jsXHR;

$(document).ready(function($) {
	$("#at-plus-container").mouseenter(function(event) {
		order.sort(function() { return 0.5 - Math.random(); });
		$(".unread").hide();
		$("#show").hide();
		$(".icon").click(giveTeskToIcons);
	});
	$("#at-plus-container").mouseleave(function(event) {
		quitAllActions();
	});
});

function giveTeskToIcons() {
	$("#show").html(order.join(" -> ")).show();
	$(".icon").unbind();
	clickIcons.call(router(order[0]), 0);
}

function clickIcons(num) {
	var that = this;
	jsXHR = $.get("GET", function(data) {
		$(that).find("span").text(data).show();
		changeStyle();
		if (check()) {
			getSum();
		} else {
		    clickIcons.call(router(order[num+1]), num+1);
		}
	});
	$(that).find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$(that).removeClass("disable");
	statement[$(that).index()] = true;
}


function router(order) {
	switch(order) {
		case "A": return $("#A");
		case "B": return $("#B");
		case "C": return $("#C");
		case "D": return $("#D");
		case "E": return $("#E");
	}
}

function check() {
	for (var i = 0; i < 5; i++) {
		if(!statement[i]) return false;
	}
	$("#info-bar").addClass("enable");
	return true;
}

function changeStyle() {
	$("#control-ring").children().each(function(index, el) {
		if (statement[index] == false) {
			$(el).removeClass('disable');
		} else {
			$(el).addClass('disable');
		}
	});
}

function getSum() {
	var sum = 0;
	$("#info-bar").addClass("enable");
	$("#control-ring span").each(function(index, el) {
		sum +=	parseInt($(el).text());	
	});
	$("#info-bar").removeClass('enable').text(sum);
	$("#control-ring").children().unbind().removeClass("disable");
	$(".icon").click(function(event) {
		quitAllActions();
		order.sort(function() { return 0.5 - Math.random(); });
		giveTeskToIcons();
	});
}

function quitAllActions() {
	statement = [false, false, false, false, false];
	$("#control-ring").children().unbind().removeClass("disable");
	$(".icon").unbind();
	$(".unread").hide();
	$("span").text("");
	$("#info-bar").text("");
	$("#show").hide();
	if (jsXHR != undefined) { jsXHR.abort(); }
}