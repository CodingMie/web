$(function() {
	reset();
	//4-33行为重置操作
	function reset() {
		$('#control-ring li').each(function() {
			$(this).find('span').css('opacity', '0');
			$(this).css('background-color', 'rgba(48, 63, 159, 1)');
		});
		$('.info').unbind('click');
		$('.info').css('background-color', '#7E7E7E');
		$('.info').html('');
		$('#order').html('');
		$('#message').html('');
	}

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
	//35-58为机器人
	$('.icon').click(function() {
		var order = [0,1,2,3,4];
		order.sort(function() {return 0.5 - Math.random();});
		$('#order').html('('+String.fromCharCode(order[0]+65)+','
			+String.fromCharCode(order[1]+65)+','+String.fromCharCode(order[2]+65)+','
			+String.fromCharCode(order[3]+65)+','+String.fromCharCode(order[4]+65)+')');
		var message = {mess:'', count:0};
		selectHandler(message,order,0);
	});

	function selectHandler(message,order,i) {
		setUnableColor();
		if (i <= 4) {
			switch(order[i]) {
				case 0 : aHandler(message,order,i); break;
				case 1 : bHandler(message,order,i); break;
				case 2 : cHandler(message,order,i); break;
				case 3 : dHandler(message,order,i); break;
				case 4 : eHandler(message,order,i); break;
			}
				setAbleColor(order,i);
		} else
			bubbleHandler(message);
	}
	//60-76为颜色设置
	function setUnableColor() {
		$('.a').css('background-color', '#7E7E7E');
		$('.b').css('background-color', '#7E7E7E');
		$('.c').css('background-color', '#7E7E7E');
		$('.d').css('background-color', '#7E7E7E');
		$('.e').css('background-color', '#7E7E7E');
	}

	function setAbleColor(order, i) {
		switch(order[i]) {
			case 0 : $('.a').css('background-color', 'rgba(48, 63, 159, 1)'); break;
			case 1 : $('.b').css('background-color', 'rgba(48, 63, 159, 1)'); break;
			case 2 : $('.c').css('background-color', 'rgba(48, 63, 159, 1)'); break;
			case 3 : $('.d').css('background-color', 'rgba(48, 63, 159, 1)'); break;
			case 4 : $('.e').css('background-color', 'rgba(48, 63, 159, 1)'); break;
		}
	}
	//handler处理上一步错误失败message
	function handleMessage(message) {
		if (message.mess != '') {
			$('#message').html(message.mess);
			message.mess = '';
		}
	}
	//85-199为5个小气泡的handler
	function aHandler(message,order,i) {
		handleMessage(message);
		$('.a').find('span').html('...');
		$('.a').find('span').css('opacity', '0.9');
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					//0.3的概率失败
					if (Math.random() > 0.3){
						$('#message').html('A:这是个天大的秘密');
					} else {
						message.mess = 'A:这是个天大的秘密 的否定';
					}
					$('.a').find('span').html(xhr.responseText);
					message.count += parseInt(xhr.responseText);
					selectHandler(message,order,i+1);
				}
			}
		};
		xhr.send(null);
	}

	function bHandler(message,order,i) {
		handleMessage(message);
		$('.b').find('span').html('...');
		$('.b').find('span').css('opacity', '0.9');
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if (Math.random() > 0.3){
						$('#message').html('B:我不知道');
					} else {
						message.mess = 'B:我不知道 的否定';
					}
					$('.b').find('span').html(xhr.responseText);
					message.count += parseInt(xhr.responseText);
					selectHandler(message,order,i+1);
				}
			}
		};
		xhr.send(null);
	}

	function cHandler(message,order,i) {
		handleMessage(message);
		$('.c').find('span').html('...');
		$('.c').find('span').css('opacity', '0.9');
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if (Math.random() > 0.3){
						$('#message').html('C:你不知道');
					} else {
						message.mess = 'C:你不知道 的否定';
					}
					$('.c').find('span').html(xhr.responseText);
					message.count += parseInt(xhr.responseText);
					selectHandler(message,order,i+1);
				}
			}
		};
		xhr.send(null);
	}

	function dHandler(message,order,i) {
		handleMessage(message);
		$('.d').find('span').html('...');
		$('.d').find('span').css('opacity', '0.9');
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if (Math.random() > 0.3){
						$('#message').html('D: 他不知道');
					} else {
						message.mess = 'D: 他不知道 的否定';
					}
					$('.d').find('span').html(xhr.responseText);
					message.count += parseInt(xhr.responseText);
					selectHandler(message,order,i+1);
				}
			}
		};
		xhr.send(null);
	}

	function eHandler(message,order,i) {
		handleMessage(message);
		$('.e').find('span').html('...');
		$('.e').find('span').css('opacity', '0.9');
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/",true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if (Math.random() > 0.3){
						$('#message').html('E:才怪');
					} else {
						message.mess = 'E:才怪 的否定';
					}
					$('.e').find('span').html(xhr.responseText);
					message.count += parseInt(xhr.responseText);
					selectHandler(message,order,i+1);
				}
			}
		};
		xhr.send(null);
	}
	//大气泡的handler
	function bubbleHandler(message) {
		$('.info').html(message.count);
		$('#message').html('大气泡：楼主异步调用战斗力感人，目测不超过'+message.count);
	}
});
