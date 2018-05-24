var statement = [false, false, false, false, false];
var jqXHR;
$(document).ready(function($) {
	$("#at-plus-container").mouseenter(function(event) {
		statement = [false, false, false, false, false];
		$(".unread").hide();
		giveTeskToIcons();
	});
	$("#at-plus-container").mouseleave(function(event) {
		quitAllActions();
	});
});


function giveTeskToIcons() {
	$("#control-ring").children().each(function(index, el) {
		if (statement[index] == false) {
			$(el).click(getRandomNum);
			$(el).removeClass('disable');
		} else {
			$(el).unbind();
			$(el).addClass('disable');
		}
	});
}

function getRandomNum() {
	var that = this;
	$("#control-ring").children().unbind();
	jqXHR = $.get("GET", function(data) {
		$(that).find("span").text(data).show();
		$(that).unbind();
		giveTeskToIcons();
		if (check()) {
			$("#info-bar").click(getSum);
		}
	});
	$(that).find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$(that).removeClass("disable");
	statement[$(that).index()] = true;
}

function check() {
	for (var i = 0; i < 5; i++) {
		if(!statement[i]) return false;
	}
	$("#info-bar").addClass("enable");
	return true;
}

function getSum() {
	var sum = 0;
	$("#control-ring span").each(function(index, el) {
		sum +=	parseInt($(el).text());	
	});
	$("#info-bar").removeClass('enable').text(sum);
	$("#control-ring").children().unbind().removeClass("disable");
	statement = [false, false, false, false, false];
	$("#control-ring").children().unbind().click(function() {
		quitAllActions();
		giveTeskToIcons();
	});
}

function quitAllActions() {
	$("#control-ring").children().unbind().removeClass("disable");
	$("#info-bar").unbind();
	$(".unread").hide();
	$("span").text("");
	$("#info-bar").text("");
	if (jqXHR != undefined) { jqXHR.abort(); }
}