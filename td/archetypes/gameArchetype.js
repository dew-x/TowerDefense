function gameArchetype(data) {
    var defaults = {
        // values
        loadingMinTime: 3000,
        loadingShowHint: true,
        loadingHints: [
            "This project is inspired by Warcraft III TD maps",
            "You can get the source in https://github.com/dew-x/TowerDefense/",
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
            border: 2,
            ratio: 20,
            scaleMode: "fit",
            text: "Loading",
            textMargin: 0.2,
            textColor: "white",
        }),
        loadingHint: new gfxArchetype({
            text: "",
            height: 0.05,
            y: 0.9,
            textMargin: 0.2,
        }),
        // sounds
        loadingsfx: null,
    }
    var ranges = {
        loadingMinTime: [
            [0, 10000]
        ],
        loadingShowHint: [true, false],
        loadingHints: "object",
        loadingBg: "object",
        loadingBar: "object",
        loadingsfx: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}