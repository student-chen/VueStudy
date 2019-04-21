var precent = [30,50,10];

	function init() {
		var color = ['#FF0000', '#EEEE00', '#FF82AB'];
		drawCircle("canvas", precent, color);
	}

	function drawCircle(cancasid, precent, color) {
		var can = document.getElementById(cancasid);
		var ctx = can.getContext('2d');
		var radius = can.width * 0.5 - 20; //半径
		ctx.clearRect(0,0,300,600);
		var ox = radius + 20; //圆心x
		var oy = radius + 20; //圆心y
		var startAngle = 0; //开始
		var endAngle = 0; //结束
		for(var i = 0; i < color.length; i++) {
			endAngle = endAngle + precent[i] * Math.PI * 2;
			ctx.fillStyle = color[i];
			ctx.beginPath();
			ctx.moveTo(ox, oy);
			ctx.arc(ox, oy, radius, startAngle, endAngle, false);
			ctx.closePath();
			ctx.fill();
			console.log(startAngle, endAngle, 'dd')
			startAngle = endAngle;
			console.log(precent)
		}
	}
