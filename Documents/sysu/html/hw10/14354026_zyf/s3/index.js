var set = [];
var restart = 0;
var count = 0;
$(function() {
	$('#control-ring li').each(function() {
		set.push(new burble(this));
	});
	reset();

	var checktime = 0;
	$('#button').mouseout(function() {
		checktime = 1;
		var x = setTimeout(function() {
			reset();
		}, 1100);
		var y = setInterval(function() {
			if (checktime == 0)
				clearTimeout(x);
		},100);
		setTimeout(function() {
			clearInterval(y);
		}, 1200);
	});

	$('#button').mouseover(function() {
		checktime = 0;
	});

	$('.icon').click(function() {
		$.each(set, function() {
			this.autoclick(restart);
		});
	});

	function reset() {
		$.each(set, function() {
			this.state = 0;
			$(this.dom).find('span').css('opacity', '0');
			$(this.dom).css('background-color', 'rgba(48, 63, 159, 1)');
		});
		$('.info').unbind('click');
		$('.info').css('background-color', '#7E7E7E');
		$('.info').html('');
		count = 0;
		restart++;
	}

});

function burble(dom) {
	this.dom = dom;
	this.state = 0;
}

burble.prototype.autoclick = function(num) {
	if (this.state == 0) {
		this.state = 2;
		$(this.dom).find('span').html('...');
		$(this.dom).find('span').css('opacity', '0.9');
		this.getAjax(num);
	}
}

burble.prototype.getAjax = function(num) {
	var xhr=new XMLHttpRequest();
	xhr.open("GET","http://localhost:3000/",true);
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
					if(xhr.status==200 && num == restart){
						$(this.dom).find('span').html(xhr.responseText);
						$(this.dom).css('background-color', '#7E7E7E');
						count++;
						if (checkClick()){
							enableBig();
							$('.info').click();
						}
					}
			}
	}.bind(this);
	xhr.send(null);
}

function checkClick() {
	return count == 5;
}

function enableBig() {
	$('.info').css('background-color', 'rgba(48, 63, 159, 1)');
	$('.info').click(function() {
		var count = 0;
		$.each(set, function() {
			count += parseInt($(this.dom).find('span').html());
		});
		$(this).html(count);
		$(this).css('background-color', '#7E7E7E');
	});
}

