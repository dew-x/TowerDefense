function Map(archetype) {
	copy(this, archetype);
}

Map.prototype.initCamera = function () {
	var camera=new Camera();
	return camera;
}