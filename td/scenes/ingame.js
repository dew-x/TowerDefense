function InGame() {
    copy(this, sceneInternals);
    this.id = null;
    this.level = null;
    this.camera = {
        x: 0,
        y: 0,
        zoom: 1,
    }
}

copy(InGame.prototype, scenePrototype);

InGame.prototype.init = function(id) {
    this.id = id;
    this.level = null;
}

InGame.prototype.setContext = function(context) {
    this.level = new Level(context.levels[this.id]);
}