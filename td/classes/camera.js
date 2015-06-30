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
    this.zoom = clamp(this.zoom * ((this.zoomRatio - delta) / this.zoomRatio), this.minZoom, this.maxZoom);
}

Camera.prototype.getWindow = function (width,height) {
	return {
		x:this.cx-(width*this.zoom)/2,
		y:this.cy-(height*this.zoom)/2,
		w:(width*this.zoom),
		h:(height*this.zoom),
	}
}

Camera.prototype.x2screen = function (x,width) {
	return map(x,this.cx-(width*this.zoom)/2,this.cx+(width*this.zoom)/2,0,width);
}

Camera.prototype.y2screen = function (y,height) {
	return map(y,this.cy-(height*this.zoom)/2,this.cy+(height*this.zoom)/2,0,height);
}