var sceneInternals = {
	ctx: null,
	width: null,
	height: null,
	timer: 0,
}

var scenePrototype = {
	setCtx: function(ctx) {
	    this.ctx = ctx;
	},
	setWindow: function(width, height) {
	    this.width = width;
	    this.height = height;
	},
	update: function (delta) {
		if (isNaN(this.timer)) this.timer=0;
		this.timer = this.timer + delta;
	},
	draw: function () {
		this.ctx.fillRect(0,0,this.width/2,this.height/2);
	},
	processInput: function(input) {
		while (input.length>0) {
			var event=input.shift();
			if (event.type=="end") {
				console.log(event.x,event.y);
			}
		}
	},
	isLoaded: function () {
		return true;
	},
	loadingPercentage: function () {

	},
	isCompleted: function () {
		return false;
	},
}