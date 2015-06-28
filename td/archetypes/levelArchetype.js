function levelArchetype(data) {
    var defaults = {
        // values
        map: null,
        waves: null,
        // graphics
        button: new gfxArchetype({
            ratio: 1,
            scaleMode: "fit",
            width: 0.1,
            height: 0.1,
            x: 0.5,
            y: 0.5,
            path: "circle",
            strokeColor: "black",
            fillColor: "black",
        }),
        // sounds

    }
    var ranges = {
        map: "object",
        waves: "object",
        button: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}