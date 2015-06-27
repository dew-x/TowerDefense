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
            drawFunction: function(ctx, width, height, x0, y0, x1, y1) {
                ctx.fillStyle = "silver";
                ctx.fillRect(x0, y0, x1, y1);
            }
        }),
        loadingBarFront: new gfxArchetype({
            drawFunction: function(ctx, width, height, x0, y0, x1, y1) {
                ctx.fillStyle = "white";
                ctx.fillRect(width * 0.255, height * 0.805, width * 0.49 * this.perc, height * 0.09);
            }
        }),
        loadingBarBg: new gfxArchetype({
            drawFunction: function(ctx, width, height, x0, y0, x1, y1) {
                ctx.fillStyle = "black";
                ctx.fillRect(width * 0.25, height * 0.8, width * 0.5, height * 0.1);
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