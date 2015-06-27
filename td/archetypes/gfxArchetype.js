function gfxArchetype(data) {
    var defaults = {
        // values
        mode: "normal",
        percentage: 1,
        // graphics
        drawFunction: null,
        path: null,
        pathBehind: null,
        pathFront: null,
    }
    var ranges = {
        mode: ["normal", "button", "text", "bar", "bg"],
        percentage: [
            [0, 1]
        ],
        drawFunction: "function",
        path: "string",
        pathBehind: "string",
        pathFront: "string",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}