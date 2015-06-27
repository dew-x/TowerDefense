function gameArchetype(data) {
    var defaults = {
        // values
        loadingMinTime: 3000,
        loadingShowHint: true,
        loadingHints: [
            "aaaaaaaaaaaaaaaaaaaaaa",
            "bbbbbbbbbbbbbbbbbbbbbb",
        ],
        // graphics
        loadingBg: new gfxArchetype({
            mode: "bg",
            drawFunction: function(ctx, width, height, x0, y0, x1, y1) {
                ctx.fillStyle = "silver";
                ctx.fillRect(x0, y0, x1, y1);
            }
        }),
        loadingBar: new gfxArchetype({
            mode: "bar",
            percentage: 0,
            drawFunction: function(ctx, width, height, x0, y0, x1, y1) {
                var x0=Math.round(width*0.25);
                var y0=Math.round(height*0.8);
                var w=Math.round(width*0.5);
                var h=Math.round(height*0.1);
                var border=2;
                ctx.fillStyle = "black";
                ctx.fillRect(x0,y0,w,h);
                ctx.fillStyle = "white";
                ctx.fillRect(x0+border, y0+border, (w-border*2) * this.percentage, h-border*2);
            }
        }),
        // sounds
        loadingsfx: null,
    }
    var ranges = {
        loadingMinTime: [
            [0, 10000]
        ],
        loadingHints: "object",
        loadingHint: [true, false],
        loadingBg: "object",
        loadingBarFront: "object",
        loadingBarBg: "object",
        loadingsfx: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}