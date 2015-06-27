function Game(data, canvasID, width, height) {
    this.data = data;
    this.canvasID = canvasID;
    this.targetWidth = width;
    this.targetHeight = height;
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(this.canvasID);
    this.ctx = this.canvas.getContext("2d");
    this.inputQueue = [];
    this.scenes = {
        loading: new Loading(),
        menu: new MainMenu(),
        inGame: new InGame(),
        endGame: new EndGame(),
    };
    this.currentScene = null;
    this.sceneQueue = ["loading", "menu"];
    this.last = -1;
}

Game.prototype.play = function() {
    this._resize();
}

Game.prototype.loop = function(time) {
    var delta = 0;
    if (this.last != -1) delta = time - this.last;
    this.last = time;
    if (this.currentScene != null) {
        this.currentScene.processInput(this.inputQueue);
        this.currentScene.update(delta);
        this.currentScene.draw();
    }
    if (this.scenes[this.sceneQueue[0]].isLoaded() && (this.currentScene == null || this.currentScene.isCompleted())) {
        this.currentScene = this.scenes[this.sceneQueue.shift()];
    }
}

Game.prototype._resize = function() {
    this.width = (this.targetWidth <= 0) ? window.innerWidth : this.targetWidth;
    this.height = (this.targetHeight <= 0) ? window.innerHeight : this.targetHeight;
    console.log("Resize: ", this.width, this.height, window)
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, this.width / 2, this.height / 2);
}

Game.prototype._mousedown = function(event) {
    event.preventDefault();
    e = event || window.event;
    var target = e.target || e.srcElement;
    rect = target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    this.inputQueue.push({
        type: "begin",
        x: offsetX,
        y: offsetY,
        id: 1,
    });
}

Game.prototype._mousemove = function(event) {
    e = event || window.event;
    var target = e.target || e.srcElement;
    rect = target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    this.inputQueue.push({
        type: "move",
        x: offsetX,
        y: offsetY,
        id: 1,
    });
}

Game.prototype._mouseup = function(event) {
    e = event || window.event;
    var target = e.target || e.srcElement;
    rect = target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    this.inputQueue.push({
        type: "end",
        x: offsetX,
        y: offsetY,
        id: 1,
    });
}

Game.prototype._touchdown = function(event) {
    event.preventDefault();
    var obj = event.changedTouches || event.originalEvent.changedTouches;
    for (var i = 0; i < obj.length; ++i) {
        var target = obj[i].target || obj[i].srcElement;
        rect = target.getBoundingClientRect();
        var x = obj[i].pageX - rect.left;
        var y = obj[i].pageY - rect.top;
        var id = i;
        this.inputQueue.push({
            type: "begin",
            x: x,
            y: y,
            id: id,
        });
    }
}

Game.prototype._touchmove = function(event) {
    event.preventDefault();
    var obj = event.changedTouches || event.originalEvent.changedTouches;
    for (var i = 0; i < obj.length; ++i) {
        var target = obj[i].target || obj[i].srcElement;
        rect = target.getBoundingClientRect();
        var x = obj[i].pageX - rect.left;
        var y = obj[i].pageY - rect.top;
        var id = i;
        this.inputQueue.push({
            type: "move",
            x: x,
            y: y,
            id: id,
        });
    }
}

Game.prototype._touchup = function(event) {
    event.preventDefault();
    var obj = event.changedTouches || event.originalEvent.changedTouches;
    for (var i = 0; i < obj.length; ++i) {
        var target = obj[i].target || obj[i].srcElement;
        rect = target.getBoundingClientRect();
        var x = obj[i].pageX - rect.left;
        var y = obj[i].pageY - rect.top;
        var id = i;
        this.inputQueue.push({
            type: "end",
            x: x,
            y: y,
            id: id,
        });
    }
}


Game.prototype._mousewheel = function(event) {
    event.preventDefault();
    var e = event || window.event; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.inputQueue.push({
        type: "wheel",
        delta: delta,
    });
}

Game.prototype._keydown = function(event) {
    var key = event.keyCode ? event.keyCode : event.which;
    this.inputQueue.push({
        type: "keyDown",
        key: key,
    });
}

Game.prototype._keyup = function(event) {
    var key = event.keyCode ? event.keyCode : event.which;
    this.inputQueue.push({
        type: "keyUp",
        key: key,
    });
}