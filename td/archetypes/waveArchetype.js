function waveArchetype(data) {
    var defaults = {
        // values
        mode: "1by1",
        duration: 10,
        enemies: null,
        // graphics
        gfx: null,
        // sounds
        begingsfx: null,
        endsfx: null,
    }
    var ranges = {
        mode: ["1by1", "bulk"],
        duration: [
            [1, 1000]
        ],
        enemies: "object",
        gfx: "object",
        beginsfx: "object",
        endsfx: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}