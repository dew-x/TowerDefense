function InGame() {
    copy(this, sceneInternals);
    this.id = null;
    this.level = null;
    this.camera = null;
    this.pressedKeys = {};
}

copy(InGame.prototype, scenePrototype);

InGame.prototype.init = function(id) {
    this.id = id;
    this.level = null;
}

InGame.prototype.setContext = function(context) {
    this.level = new Level(context.levels[this.id]);
    this.map = new Map(this.level.getMap());
    this._addGfx("wavesBg", context.game.wavesBg);
    this._addGfx("statusBarBg", context.game.statusBarBg);
    this._addGfx("minimapBg", context.game.minimapBg);
    this._addGfx("buildmenuBg", context.game.buildmenuBg);
    this._addGfx("selectedBg", context.game.selectedBg);
    var screenRect = {
        x: 0,
        y: 0,
        w: this.width,
        h: this.height,
    }
    this.camera = new Camera(screenRect, this.map.cols, this.map.rows);
    console.log(this.level, this.map, this.gfx, this.camera);
}

InGame.prototype.update = function(delta) {
    if (isNaN(this.timer)) this.timer = 0;
    this.timer = this.timer + delta;
    //console.log(this._isKeyPressed(37),this._isKeyPressed(38),this._isKeyPressed(39),this._isKeyPressed(40));
    if (this._isKeyPressed(39)) this.camera.move(1,0);
    if (this._isKeyPressed(37)) this.camera.move(-1,0);
    if (this._isKeyPressed(40)) this.camera.move(0,1);
    if (this._isKeyPressed(38)) this.camera.move(0,-1);
}

InGame.prototype.draw = function() {
    // draw game
    this._drawGame();
    // draw ui
    for (var i = 0; i < this.drawOrder.length; ++i) {
        this.gfx[this.drawOrder[i]].draw(this.ctx, this.width, this.height, 0, 0, this.width, this.height);
    }
}

InGame.prototype.setWindow = function(width, height) {
    this.width = width;
    this.height = height;
    if (this.camera != null) {
        var screenRect = {
            x: 0,
            y: 0,
            w: this.width,
            h: this.height,
        }
        this.camera.updateScreen(screenRect);
    }
}

InGame.prototype._drawGame = function() {
    this._drawGrid();
}

InGame.prototype._drawGrid = function() {
    var rect = this.camera.getWindow();
    // bg
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    // horitzontals
    for (var i = Math.ceil(rect.y); i < rect.y + rect.h; ++i) {
        var y = this.camera.y2screen(i, this.height);
        doLine(this.ctx, 0, y, this.width, y, "black", 1);
    }
    // verticals
    for (var i = Math.ceil(rect.x); i < rect.x + rect.w; ++i) {
        var x = this.camera.x2screen(i, this.width);
        doLine(this.ctx, x, 0, x, this.height, "black", 1);
    }
}

InGame.prototype.processInput = function(input, actions) {
    while (input.length > 0) {
        var event = input.shift();
        if (event.type == "end") {
            for (var i = this.drawOrder.length - 1; i >= 0; --i) {
                var key = this.drawOrder[i];
                if (this.onClick.hasOwnProperty(key) && this.gfx[key].isInside(event.x, event.y)) {
                    actions.push(this.onClick[key]);
                }
            }
        } else if (event.type == "wheel") {
            this.camera.doZoom(event.delta);
        } else if (event.type == "keyDown") {
            if (!this.pressedKeys.hasOwnProperty(event.key) || !this.pressedKeys[event.key]) {
                this.pressedKeys[event.key]=true;
            }
        } else if (event.type == "keyUp") {
            if (!this.pressedKeys.hasOwnProperty(event.key) || this.pressedKeys[event.key]) {
                this.pressedKeys[event.key]=false;
            }
        }
    }
}

InGame.prototype._isKeyPressed = function (key) {
    return this.pressedKeys.hasOwnProperty(key)&&this.pressedKeys[key];
}