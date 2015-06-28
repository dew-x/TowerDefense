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
            path: "rectangle",
            fillColor: "silver",
            text: "libTD v0.0.1",
            textMargin: 0.2,
        }),
        loadingBar: new gfxArchetype({
            width: 0.5,
            height: 0.1,
            x: 0.5,
            y: 0.8,
            mode: "bar",
            percentage: 0,
            path: "rectangle",
            pathBehind: "rectangle",
            fillColor: "white",
            strokeColor: "black",
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