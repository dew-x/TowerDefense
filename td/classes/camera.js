function Camera(screenRect, mapWidth, mapHeight) {
    this.sx = 0;
    this.sy = 0;
    this.sw = 0;
    this.sh = 0;
    this.width = mapWidth;
    this.height = mapHeight;
    this.cx = mapWidth / 2;
    this.cy = mapHeight / 2;
    this.minZoom = 0;
    this.maxZoom = 0;
    this.zoom = -1;
    this.minx = 0;
    this.maxx = 0;
    this.miny = 0;
    this.maxy = 0;
    this.zoomRatio = 10;
    this.window = null;

    this.updateScreen(screenRect);
}

Camera.prototype.updateScreen = function(screenRect) {
    this.sx = screenRect.x;
    this.sy = screenRect.y;
    this.sw = screenRect.w;
    this.sh = screenRect.h;
    this.maxZoom = Math.min(this.sw, this.sh);
    this.minZoom = Math.max(this.sw / this.width, this.sh / this.height);
    if (this.zoom == -1) this.zoom = (this.minZoom + this.maxZoom) / 2;
    else clamp(this.zoom, this.minZoom, this.maxZoom);
    this.doZoom(0);
    
}

Camera.prototype.doZoom = function(delta) {
    this.zoom = clamp(this.zoom * ((this.zoomRatio + delta) / this.zoomRatio), this.minZoom, this.maxZoom);
    this.minx = (this.width - this.sw / this.zoom) / 2;
    this.maxx = this.width - (this.width - this.sw / this.zoom) / 2;
    this.miny = (this.height - this.sh / this.zoom) / 2;
    this.maxy = this.height - (this.height - this.sh / this.zoom) / 2;
    this.window = {
        x: this.cx - (this.sw / this.zoom) / 2,
        y: this.cy - (this.sh / this.zoom) / 2,
        w: this.sw / this.zoom,
        h: this.sh / this.zoom,
    };
}

Camera.prototype.getWindow = function() {
    return this.window;
}

Camera.prototype.x2screen = function(x) {
    return map(x, this.window.x, this.window.x+this.window.w, 0, this.sw);
}

Camera.prototype.y2screen = function(y) {
    return map(y, this.window.y, this.window.y+this.window.h, 0, this.sh);
}