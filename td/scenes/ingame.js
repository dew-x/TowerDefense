function InGame() {
    copy(this, sceneInternals);
    this.id = null;
    this.level = null;
    this.camera = null;
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
}

InGame.prototype.draw = function() {
    // draw game
    this._drawGame();
    // draw ui
    for (var i = 0; i < this.drawOrder.length; ++i) {
        this.gfx[this.drawOrder[i]].draw(this.ctx, this.width, this.height, 0, 0, this.width, this.height);
    }
}

InGame.prototype._drawGame = function() {
    this._drawGrid();
}

InGame.prototype._drawGrid = function() {
    var rect = this.camera.getWindow();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    // horitzontals
    for (var i = Math.ceil(rect.y); i < rect.y + rect.h; ++i) {
        var y = this.camera.y2screen(i, this.height);
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.width, y);
        this.ctx.closePath();
        this.ctx.strokeColor = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
    // verticals
    for (var i = Math.ceil(rect.x); i < rect.x + rect.w; ++i) {
        var x = this.camera.x2screen(i, this.width);
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.height);
        this.ctx.closePath();
        this.ctx.strokeColor = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
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
        }
    }
}