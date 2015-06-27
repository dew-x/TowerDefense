function Loading() {
    copy(this, sceneInternals);
}

copy(Loading.prototype,scenePrototype);

Loading.prototype.draw = function() {
	this.ctx.fillRect(this.width/2,this.height/2,this.width/2,this.height/2);
}

Loading.prototype.isCompleted = function() {
    return this.timer>3000;
}