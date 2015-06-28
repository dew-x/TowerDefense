function InGame() {
	copy(this, sceneInternals);
	this.id = null;
}

copy(InGame.prototype,scenePrototype);

InGame.prototype.init = function (id) {
	this.id = id;
}