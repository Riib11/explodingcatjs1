var inputs = [];
var fanciness = true;

var interindcount = 0;

function generateInputs() {
	var angle;
	var x;
	var indcount=0;
	for(var k = 0; k < 360; k += 1) {
		angle = math.unit(k,'deg');
		inputs[indcount] = new Complex(radius*math.cos(angle), radius*math.sin(angle));
		indcount++;
	}

	for(var k = 0; k < 36*2; k += 1) {
		angle = math.unit(k*5,'deg');
		inputs[indcount] = new Complex(radius/8*math.cos(angle)-radius/3, radius/5*math.sin(angle)-radius/7);
		indcount++;
	}

	for(var k = 0; k < 360; k += 1) {
		angle = math.unit(k,'deg');
		inputs[indcount] = new Complex(radius/8*math.cos(angle)+radius/3, radius/5*math.sin(angle)-radius/7);
		indcount++;
	}

	for(var k = 0; k < 360; k += 1) {
		angle = math.unit(k, 'deg');
		inputs[indcount] = new Complex(radius/8*math.cos(angle), radius/8*math.sin(angle)+radius/4);
		indcount++;
	}

	interindcount = indcount;

	// wisker right top
	for(var k = 0; k<23;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(x+1.5,x/3+1);
		indcount++;
	}

	// wisker right bottom
	for(var k = 0; k<24;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(x+1,x/2+1.4);
		indcount++;
	}

	// wisker left top
	for(var k = 0; k<26;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(-x-1.5,x/3+1);
		indcount++;
	}

	// wisker left bottom
	for(var k = 0; k<24;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(-x-1,x/2+1.4);
		indcount++;
	}

	//right ear bottom
	for(var k = 0; k<28;k += .1) {
		x = k/120;
		inputs[indcount] = new Complex(x+2.3,-10*x-2.1);
		indcount++;
	}

	// right ear top
	for(var k = 0; k<18;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(x+1,-1*x-2.9);
		indcount++;
	}

	//left ear bottom
	for(var k = 0; k<28;k += .1) {
		x = k/120;
		inputs[indcount] = new Complex(-x-2.3,-10*x-2.1);
		indcount++;
	}

	// left ear top
	for(var k = 0; k<18;k += .1) {
		x = k/10;
		inputs[indcount] = new Complex(-x-1,-1*x-2.9);
		indcount++;
	}

}

var size = 3;
var scale = 20;
var radius = 3;
var moveunit = .1;

var graphs = [
	document.getElementById("canvas-orig"),
	document.getElementById("canvas-f"),
	document.getElementById("canvas-g"),
	document.getElementById("canvas-h"),
	document.getElementById("canvas-l"),
	document.getElementById("canvas-q"),
	document.getElementById("canvas-w"),
]

var graphdivs = [
	document.getElementById("f"),
	document.getElementById("g"),
	document.getElementById("h"),
	document.getElementById("l"),
	document.getElementById("q"),
	document.getElementById("w"),
]

var ctxs = new Array(graphs.length);

function initGraphs() {
	for(var i = 0; i < graphs.length; i++) {
		ctxs[i] = graphs[i].getContext("2d");
		ctxs[i].fillStyle = "#000000";
		var center = graphs[i].height/2;
		var height = graphs[i].height;
		ctxs[i].fillRect(0,center,height,1);
		ctxs[i].fillRect(center,0,1,height);
	}
}

function drawPoint(graph,z) {
	var c = ctxs[graph];
	var center = graphs[graph].height/2;
	var pointx = center+(z.re*scale)-(size/2);
	var pointy = center+(z.im*scale)-(size/2);
	c.fillRect(pointx,pointy,size,size);
}

function f(z) {
	return z.cos();
}

function g(z) {
	return z.sin();
}

function h(z) {
	return z.inverse();
}

function l(z) {
	z = z.inverse()
	return z.sin();
}

function q(z) {
	return z.mul(z);
}

function w(z) {
	var e = new Complex(math.e,0)
	return e.pow(z);
}

function toggleFanciness() {
	fanciness=!fanciness;
	drawGraphs();
}

function changeScale(x) {
	scale = x;
	drawGraphs();
}

function showGraph(x) {
	for(var i = 0; i < graphdivs.length; i++) {
		if(i==x) {
			graphdivs[i].style.display = 'block';
		} else {
			graphdivs[i].style.display = 'none';
		}
	}
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
	
	evt.preventDefault()

    var add = new Complex(0,0);

    if(evt.keyCode == 38) { // up
    	add.im = -moveunit;
    } else if(evt.keyCode == 37) { // left
    	add.re = -moveunit;
    } else if(evt.keyCode == 40) { // down
    	add.im = moveunit;
    } else if(evt.keyCode == 39) { // right
    	add.re = moveunit;
    }

    for(var j = 0; j < inputs.length; j++) {
		inputs[j] = inputs[j].add(add);
	}

	drawGraphs();

};

function drawGraphs() {
	for(var x = 0; x < ctxs.length; x++) {
    	var center = graphs[x].height/2;
		var height = graphs[x].height;
    	ctxs[x].clearRect(0,0,graphs[x].height,graphs[x].height);
    	ctxs[x].fillRect(0,center,height,1);
		ctxs[x].fillRect(center,0,1,height);
    }

	var length = inputs.length;
	if(!fanciness) {
		length = interindcount;
	}
	for(var j = 0; j < length; j++) {
		drawPoint(0,inputs[j]);
		drawPoint(1,f(inputs[j]));
		drawPoint(2,g(inputs[j]));
		drawPoint(3,h(inputs[j]));
		drawPoint(4,l(inputs[j]));
		drawPoint(5,q(inputs[j]));
		drawPoint(6,w(inputs[j]));
	}
}

initGraphs();
generateInputs();
drawGraphs();
