window.onload = function() {
$(".info").attr("status", "inactive");
$(".info").click(function() {
	if ($(this).attr("status") == "active") {
		var result = 0;
		$("li").each(function() {
			var name = this;
			li_inital(name);
			result += parseInt($($(this).find(".redpoint")).text());
		});
		$(this).text(result);
		$(this).attr("status", "inactive");
		$(this).css({"background-color" : "grey"});
	}
});
// 绑定li的click事件
$("li").each(function() {
	$(this).attr("status", "active"); //  是否可点
	$(this).attr("clicked", "false"); //  是否点过
	$(this).click(function() {
		if ($(this).attr("status") == "active") {
			$(this).attr("clicked", "true");
			$($(this).find(".redpoint")).html("...");
			var clicked = $(this);
			afterclick(clicked);
			var that = this;
			$.get("server.js/number", function(result) {
				afterGetNumber(that, result);
				if(allclicked()) {
					$(".info").attr("status", "active");
					$(".info").css({"background-color":"rgba(48, 63, 159, 1)"});
				}
			});
		}
		$(".info").text("");
	});
});
//鼠标离开at后重置
$("#button").mouseleave(function() {
	$("li").each(function() {
		var name = this;
		li_inital(name);
		$($(name).find(".redpoint")).addClass("unclick");
	});
	$(".info").attr("status", "inactive");
	$(".info").text("");
	$(".info").css({"background-color":"grey"});

});
}
//检查是否全部被点击
function allclicked() {
	var flag = 1;
	$("li").each(function() {
		if ($(this).find(".redpoint").attr("class") == "redpoint unclick")
			flag = 0;
	});
	return flag;
}
// 某个被点后灭活
function  afterclick(clicked) {
	clicked.attr("status", "inactive");
	var redpoint = clicked.find(".redpoint");
	$(redpoint).removeClass("unclick");
	clicked.siblings().css({"background-color" : "grey"});
	clicked.siblings().each(function() {
		$(this).attr("status", "inactive");
	});
}
//得到数据后重新激活其他的按钮
function afterGetNumber(that, result) {
	$($(that).find(".redpoint")).html(result);
	$(that).css({"background-color" : "grey"});
	$($(that).siblings()).each(function() {
		if ($(this).attr("clicked") == "false") {  //未被点过就重新激活
			var name = this;
			li_inital(name);
		}
	});
}
function li_inital(name) {
	$(name).attr("status", "active");
	$(name).attr("clicked", "false");
	$(name).css({"background-color":"rgba(48, 63, 159, 1)"});
}
