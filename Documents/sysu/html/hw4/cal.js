//-------------------------before----------------------
/*get number*/
//var number = document.getElementsByClassName("number");
/*for (var i = 0; i < number.length; i++) {
	number[i].onclick = function() {
		var val = this.value;
		displaynum(val);
	};
}*/
//--------------------------after-----------------------
$(".number").click(function() {
	displaynum(this.value);
});
/*show number*/
function displaynum(val) {
	var inp = input.value;
	if (output.value != "") {
		output.value = "";
		input.value = "";
	}
	/*8进制的处理*/
	if (inp[inp.length-1] != "0") {
		input.value += val;
	} else if (inp.length == 1 || (inp.length > 1 && (inp[inp.length-2] < "0" || inp[inp.length-2] > "9"))) {
		var str = input.value.slice(0, -1);
		input.value = str+val;
	}
}
//------------------------before---------------------
/*get operator*/
/*
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
	operator[i].onclick = function() {
		var val = this.value;
		displayop(val);
	}
}*/
//------------------------after---------------------
$(".operator").click(function() {
	displayop(this.value);
});

/*show operator*/
function displayop(val) {
	var last = input.value.slice(-1);
	if (val == "<-") { // 删除最后的字符
		if (input.value == "error!") {
			input.value = "";
			output.value = "";
		} else {
			var str = input.value.slice(0, -1);
			input.value = str;
		}
	} else if (val == "clear") {
		input.value = "";
		output.value = "";
	} else if ((last == "*" || last == "%" || last == "+" || last == "-") &&
		(val == "*" || val == "%" || val == "+" || val == "-")) {
		/*replace the last*/
		var str = input.value.slice(0, -1);
		str += val;
		input.value = str;
		last = val;
	} else if (input.value == "error!" || input.value == "") {
		input.value = "0"+val;
		output.value = "";
	} else if (output.value != "") {
		input.value = output.value;
		output.value = "";
		input.value += val;
	} else {
		input.value += val;
	}
}
/*output*/
/*
var equal = document.getElementById("equal");
equal.onclick = function() {*/
$("#equal").click(function() {
	var str = input.value;
	var last = str.slice(-1);
	/*判断输入是否合法*/
	if (str == "") {
		input.value = "error!";
		output.value = "nothing input!"
	} else if (str.indexOf("%0") != "-1") {
		output.value = "0 can not be the divisor!"
		output.style.fontSize = "100%";
		input.value = "error!";
	} else if (last == "+" || last == "-" || last == "*" || last == "%") {
		/*do nothing*/
	} else {
		str = str.replace(/%/, "/");
		output.value = eval(str);
		var l = parseInt(output.value.length);
		if (l <= 10) {
			output.style.fontSize = "200%";
		} else {
			output.style.fontSize = "130%";
		}
	}
});