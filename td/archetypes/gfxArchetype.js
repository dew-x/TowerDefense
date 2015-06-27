function gfxArchetype(data) {
    var defaults = {
        // values
        drawFunction: null,
        // graphics

        // sounds

    }
    var ranges = {
        drawFunction: "function",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}