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
    this.camera = this.map.getCamera();
    console.log(this.level, this.map);
}

InGame.prototype.update = function(delta) {
    if (isNaN(this.timer)) this.timer = 0;
    this.timer = this.timer + delta;
}
InGame.prototype.draw = function() {
    for (var i = 0; i < this.drawOrder.length; ++i) {
        this.gfx[this.drawOrder[i]].draw(this.ctx, this.width, this.height, 0, 0, this.width, this.height);
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
        }
    }
},