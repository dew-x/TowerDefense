function MainMenu() {
    copy(this, sceneInternals);
}

copy(MainMenu.prototype, scenePrototype);

MainMenu.prototype.setContext = function(context) {
    this._addGfx("bg", context.game.mainmenuBg);
    for (var level in context.levels) {
        if (context.levels.hasOwnProperty(level)) {
            var key = level + "_button";
            this._addGfx(key, context.levels[level].button,{action:"playLevel", param: level});
        }
    }
}