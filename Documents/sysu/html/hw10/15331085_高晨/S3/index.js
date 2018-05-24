var statement = [false, false, false, false, false];
var jsXHRA, jsXHRB, jsXHRC, jsXHRD, jsXHRE;
$(document).ready(function($) {
	$("#at-plus-container").mouseenter(function(event) {
	var statement = [false, false, false, false, false];
		$(".unread").hide();
		$(".icon").click(giveTeskToIcons);
	});
	$("#at-plus-container").mouseleave(function(event) {
		quitAllActions();
	});
});

function giveTeskToIcons(argument) {
	$(".icon").unbind();
	teskA();
	teskB();
	teskC();
	teskD();
	teskE();
}

function teskA() {
	jsXHRA = $.get('GETA', function(data) {
		$("#A").find("span").text(data).show();
		statement[0] = true;
		$("#A").addClass("disable");
    	if (check()) { getSum(); }
    });
	$("#A").find("span").text("...").show();
	$("#A").removeClass("disable");
}

function teskB() {
	jsXHRB = $.get('GETB', function(data) {
		$("#B").find("span").text(data).show();
		statement[1] = true;
		$("#B").addClass("disable");
    	if (check()) { getSum(); }
    });
	$("#B").find("span").text("...").show();
	$("#B").removeClass("disable");
}

function teskC() {
	jsXHRC = $.get('GETC', function(data) {
		$("#C").find("span").text(data).show();
		statement[2] = true;
		$("#C").addClass("disable");
    	if (check()) { getSum(); }
    });
	$("#C").find("span").text("...").show();
	$("#C").removeClass("disable");
}

function teskD() {
	jsXHRD = $.get('GETD', function(data) {
		$("#D").find("span").text(data).show();
		statement[3] = true;
		$("#D").addClass("disable");
    	if (check()) { getSum(); }
    });
	$("#D").find("span").text("...").show();
	$("#D").removeClass("disable");
}

function teskE() {
	jsXHRE = $.get('GETE', function(data) {
		$("#E").find("span").text(data).show();
		statement[4] = true;
		$("#E").addClass("disable");
    	if (check()) { getSum(); }
    });
	$("#E").find("span").text("...").show();
	$("#E").removeClass("disable");
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
	$(".icon").click(function() {
		quitAllActions();
		giveTeskToIcons();
	})
}

function quitAllActions() {
	statement = [false, false, false, false, false];
	$("#control-ring").children().unbind().removeClass("disable");
	$(".icon").unbind();
	$(".unread").hide();
	$("span").text("");
	$("#info-bar").text("");
	if (jsXHRA != undefined) { jsXHRA.abort(); }
	if (jsXHRB != undefined) { jsXHRB.abort(); }
	if (jsXHRC != undefined) { jsXHRC.abort(); }
	if (jsXHRD != undefined) { jsXHRD.abort(); }
	if (jsXHRE != undefined) { jsXHRE.abort(); }
}