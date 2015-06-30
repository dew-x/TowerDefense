var sceneInternals = {
    ctx: null,
    width: null,
    height: null,
    timer: 0,
    gfx: {},
    drawOrder: [],
    onClick: {},
}

var scenePrototype = {
    setCtx: function(ctx) {
        this.ctx = ctx;
    },
    setWindow: function(width, height) {
        this.width = width;
        this.height = height;
    },
    setContext: function(context) {

    },
    update: function(delta) {
        if (isNaN(this.timer)) this.timer = 0;
        this.timer = this.timer + delta;
    },
    draw: function() {
        for (var i = 0; i < this.drawOrder.length; ++i) {
            this.gfx[this.drawOrder[i]].draw(this.ctx, this.width, this.height, 0, 0, this.width, this.height);
        }
    },
    processInput: function(input, actions) {
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
    isLoaded: function() {
        return true;
    },
    loadingPercentage: function() {
        return 1;
    },
    isCompleted: function() {
        return true;
    },
    _addGfx: function(key, archetype, onClick, onlyLoad) {
        if (!this.gfx.hasOwnProperty(key) && archetype != null) {
            this.gfx[key] = new Gfx(archetype);
            if (typeof onlyLoad == 'undefined') this.drawOrder.push(key);
            if (typeof onClick !== 'undefined') this.onClick[key] = onClick;
        }
    }
}