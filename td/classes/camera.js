function Camera() {
    this.cx = 0;
    this.cy = 0;
    this.zoom = 0;
    this.minZoom = 0;
    this.maxZoom = 0;
    this.minx = 0;
    this.maxx = 0;
    this.miny = 0;
    this.maxy = 0;
    this.zoomRatio = 10;
}

Camera.prototype.doZoom = function(delta) {
    this.zoom = clamp(this.zoom * ((this.zoomRatio + delta) / this.zoomRatio), this.minZoom, this.maxZoom);
}