function towerArchetype(data) {
    var defaults = {
        // values
        price: -1,
        size: 2,
        range: 2,
        shotsPerMinute: 60,
        buildTime: 0,
        rotateOnAim: false,
        projectyle: null,
        // graphics
        gfx: new gfxArchetype({
            path:"rectangle",
            fillColor: "blue",
        }),
        // sounds
        placesfx: null,
    }
    var ranges = {
        price: [
            [1, 10000],
            [-1, -1]
        ],
        size: [1, 2, 3, 4, 5],
        range: [
            [0.5, 100]
        ],
        shotsPerMinute: [
            [1, 1000]
        ],
        buildTime: [
            [0, 1000]
        ],
        rotateOnAim: [true, false],
        projectyle: "object",
        gfx: "object",
        placesfx: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}