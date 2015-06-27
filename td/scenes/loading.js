function Loading() {
    copy(this, sceneInternals);
    this.next = null;
    this.loadingMinTime = 0;
    this.showHint = false;
    this.hints = [];
}

copy(Loading.prototype, scenePrototype);

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

Loading.prototype.update = function(delta) {
    if (isNaN(this.timer)) this.timer = 0;
    this.timer = this.timer + delta;
    this.gfx["barFront"].setPerc(Math.min(1,this.timer/this.loadingMinTime));
}