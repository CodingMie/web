var set = [];
var restart = 0;
var order = [0, 1, 2, 3, 4];
var count = 0;
$(function() {
	$('#control-ring li').each(function(i) {
		set.push(new burble(this, i));
	});
	reset();

	var checktime = 0;
	$('#button').mouseout(function() {
		checktime = 1;
		var x = setTimeout(function() {
			reset();
		}, 800);
		var y = setInterval(function() {
			if (checktime == 0)
				clearTimeout(x);
		},100);
		setTimeout(function() {
			clearInterval(y);
		}, 1100);
	});

	$('#button').mouseover(function() {
		checktime = 0;
	});

	$('.icon').click(function() {
		order.sort(function() {
			return 0.5 - Math.random();
		});
		$('#order').html('('+String.fromCharCode(65+order[0])+','
			+String.fromCharCode(65+order[1])+','+String.fromCharCode(65+order[2])+','
			+String.fromCharCode(65+order[3])+','+String.fromCharCode(65+order[4])+')');
		set[order[count++]].autoclick(restart);
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
		restart++;
		order = [0, 1, 2, 3, 4];
		count = 0;
		$('#order').html('');
	}

});

function burble(dom, seq) {
	this.dom = dom;
	this.state = 0;
	this.seq = seq;
	this.num = 0;
	this.listenClick();
}

burble.prototype.autoclick = function(num) {
	this.num = num;
	if (this.num == restart) {
		$(this.dom).click();
	}
}
burble.prototype.listenClick = function() {
	$(this.dom).click(function() {
		//alert(this.state);
		if (this.state == 0) {
			this.state = 2;
			$(this.dom).find('span').html('...');
			$(this.dom).find('span').css('opacity', '0.9');
			$.each(set, function() {
				if (this.state == 0) {
					$(this.dom).css('background-color', '#7E7E7E');
					this.state = 1;
				}
			});
			$(this.dom).css('background-color', 'rgba(48, 63, 159, 1)');
			this.getAjax();
		}
	}.bind(this));
}

burble.prototype.getAjax = function() {
	var xhr=new XMLHttpRequest();
	xhr.open("GET","http://localhost:3000/",true);
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
					if(xhr.status==200 && this.num == restart){
						$(this.dom).find('span').html(xhr.responseText);
						$.each(set, function() {
							if (this.state == 1) {
								$(this.dom).css('background-color', 'rgba(48, 63, 159, 1)');
								this.state = 0;
							}
						});
						$(this.dom).css('background-color', '#7E7E7E');
						if (count == 5){
							enableBig();
							$('.info').click();
						}
						else
							set[order[count++]].autoclick(this.num);
					}
			}
	}.bind(this);
	xhr.send(null);
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