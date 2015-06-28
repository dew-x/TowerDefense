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
        mainmenuBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "gray",
        }),
        statusBarBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "red",
            xAnchor: 0,
            yAnchor: 0,
            height: 0.07,
            x: 0,
            y: 0,
            text: "Status Bar",
        }),
        minimapBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "red",
            xAnchor: 0,
            yAnchor: 1,
            width: 0.2,
            ratio: 1,
            scaleMode: "fit",
            x: 0,
            y: 1,
            text: "Minimap",
        }),
        buildmenuBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "red",
            xAnchor: 1,
            yAnchor: 1,
            width: 0.2,
            ratio: 1,
            scaleMode: "fit",
            x: 1,
            y: 1,
            text: "Buildmenu",
        }),
        selectedBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "green",
            xAnchor: 0.5,
            yAnchor: 1,
            width: 0.6,
            ratio: 4,
            scaleMode: "fit",
            x: 0.5,
            y: 1,
            text: "Selectedmenu"
        }),
        wavesBg: new gfxArchetype({
            path: "rectangle",
            fillColor: "blue",
            xAnchor: 0,
            yAnchor: 0,
            width: 0.03,
            height: 0.93,
            scaleMode: "fill",
            x: 0,
            y: 0.07,
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
        loadingHint: "object",
        mainmenuBg: "object",
        statusBarBg: "object",
        minimapBg: "object",
        loadingsfx: "object",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}