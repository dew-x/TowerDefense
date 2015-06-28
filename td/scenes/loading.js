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
    this._addGfx("bar", context.game.loadingBar);
    if (this.showHints) this._addGfx("hint", context.game.loadingHint);
    this.gfx["hint"].text = this.hints[randomInt(0,this.hints.length-1)];
}

Loading.prototype.setNext = function(next) {
    this.next = next;
}

Loading.prototype.update = function(delta) {
    if (isNaN(this.timer)) this.timer = 0;
    this.timer = this.timer + delta;
    this.gfx["bar"].setPercentage(Math.min(1,this.timer/this.loadingMinTime));
}