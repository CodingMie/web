var statement = [false, false, false, false, false];
var jsXHRA, jsXHRB, jsXHRC, jsXHRD, jsXHRE;
$(document).ready(function($) {
	$("#at-plus-container").mouseenter(function(event) {
		$(".unread").hide();
		$(".icon").click(teskA);
	});
	$("#at-plus-container").mouseleave(function(event) {
		quitAllActions();
	});
});

function teskA() {
	$(".icon").unbind();
	jsXHRA = $.get('GETA', function(data) {
		$("#A").find("span").text(data).show();
    	changeStyle();
    });
	$("#A").find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$("#A").removeClass("disable");
	statement[0] = true;
	jsXHRA.done(teskB);
}

function teskB() {
	jsXHRB = $.get('GETB', function(data) {
		$("#B").find("span").text(data).show();
    	changeStyle();
    });
	$("#B").find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$("#B").removeClass("disable");
	statement[1] = true;
	jsXHRB.done(teskC);
}

function teskC() {
	jsXHRC = $.get('GETC', function(data) {
		$("#C").find("span").text(data).show();
    	changeStyle();
    });
	$("#C").find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$("#C").removeClass("disable");
	statement[2] = true;
	jsXHRC.done(teskD);
}

function teskD() {
	jsXHRD = $.get('GETD', function(data) {
		$("#D").find("span").text(data).show();
    	changeStyle();
    });
	$("#D").find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$("#D").removeClass("disable");
	statement[3] = true;
	jsXHRD.done(teskE);
}

function teskE() {
	jsXHRE = $.get('GETE', function(data) {
		$("#E").find("span").text(data).show();
    	changeStyle();
    });
	$("#E").find("span").text("...").show();
	$("#control-ring").children().addClass("disable");
	$("#E").removeClass("disable");
	statement[4] = true;
	jsXHRE.done(getSum);
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
	$(".icon").click(function() {
		quitAllActions();
		teskA();
	});
}

function quitAllActions() {
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
	statement = [false, false, false, false, false];
}