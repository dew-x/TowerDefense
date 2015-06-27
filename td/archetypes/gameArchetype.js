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
        loadingBg: null,
        loadingBarFront: null,
        loadingBarBg: null,
        // sounds
        loadingsfx: null,
    }
    var ranges = {
        loadingMinTime: [
            [0, 10000]
        ],
        loadingHints: "object",
        loadingHint: [true,false],
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