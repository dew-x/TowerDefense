var sceneInternals = {
    ctx: null,
    width: null,
    height: null,
    timer: 0,
    gfx: {},
    drawOrder: [],
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
    processInput: function(input) {
        while (input.length > 0) {
            var event = input.shift();
            if (event.type == "end") {
                console.log(event.x, event.y);
            }
        }
    },
    isLoaded: function() {
        return true;
    },
    loadingPercentage: function() {

    },
    isCompleted: function() {
        return false;
    },
    _addGfx: function(key, archetype) {
        if (!this.gfx.hasOwnProperty(key) && archetype != null) {
            this.gfx[key] = new Gfx(archetype);
            this.drawOrder.push(key);
        }
    }
}