function Loading() {
    copy(this, sceneInternals);
    this.next = null;
    this.loadingMinTime = 0;
    this.showHint = false;
    this.hints = [];
}

copy(Loading.prototype, scenePrototype);

Loading.prototype.draw = function() {
    this.ctx.fillRect(this.width / 2, this.height / 2, this.width / 2, this.height / 2);
}

Loading.prototype.isCompleted = function() {
    return this.timer > this.loadingMinTime && (this.next == null || this.next.isLoaded());
}

Loading.prototype.setContext = function(context) {
    this.loadingMinTime = context.game.loadingMinTime;
    this.showHints = context.game.loadingShowHint;
    this.hints = context.game.loadingHints;
    this._addGfx("bg", context.game.loadingBg);
    this._addGfx("barBg", context.game.loadingBarBg);
    this._addGfx("barFront", context.game.loadingBarFront);
}

Loading.prototype.setNext = function(next) {
    this.next = next;
}