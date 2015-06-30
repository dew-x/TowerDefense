function Map(archetype) {
    copy(this, archetype);
    this.width = this.cols * this.sqSize;
    this.height = this.rows * this.sqSize;
}

Map.prototype.initCamera = function(width, height) {
    var camera = new Camera();
    camera.cx = this.width / 2;
    camera.cy = this.height / 2;
    camera.maxZoom = Math.min(width / this.width, height / this.height);
    camera.minZoom = Math.max(this.sqSize / width, this.sqSize / height);
    camera.zoom = (camera.maxZoom + camera.minZoom) / 2;
    camera.minx = (this.width - width * camera.zoom) / 2;
    camera.maxx = this.width - (this.width - width * camera.zoom) / 2;
    camera.miny = (this.height - height * camera.zoom) / 2;
    camera.maxy = this.height - (this.height - height * camera.zoom) / 2;
    return camera;
}