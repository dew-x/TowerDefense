function Game(data, canvasID, width, height) {
    this.data = data;
    this.canvasID = canvasID;
    this.targetWidth = width;
    this.targetHeight = height;
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(this.canvasID);
    this.ctx = this.canvas.getContext("2d");
}

Game.prototype.play = function() {
    this._resize();
}

Game.prototype.loop = function(time) {

}

Game.prototype._resize = function() {
    this.width = (this.targetWidth <= 0) ? window.innerWidth : this.targetWidth;
    this.height = (this.targetHeight <= 0) ? window.innerHeight : this.targetHeight;
    console.log("Resize: ",this.width,this.height,window)
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, this.width / 2, this.height / 2);
}

Game.prototype._mousedown = function(event) {
    console.log("MD", event);
}

Game.prototype._mousemove = function(event) {
    console.log("MM", event);
}

Game.prototype._mouseup = function(event) {
    console.log("MU", event);
}

Game.prototype._mousewheel = function(event) {
    console.log("MW", event);
}

Game.prototype._keydown = function(event) {
    console.log("KD", event);
}

Game.prototype._keyup = function(event) {
    console.log("KU", event);
}