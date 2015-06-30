function mapArchetype(data) {
    var defaults = {
        // values
        cols: 21,
        rows: 15,
        ioMap: null,
        // graphics
        bg: new gfxArchetype({
            path: "rectangle",
            fillColor: "silver",
        }),
        // sounds

    }
    var ranges = {
        cols: [
            [1, 100]
        ],
        rows: [
            [1, 100]
        ],
        ioMap: "object",
        bg: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}