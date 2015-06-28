function gfxArchetype(data) {
    var defaults = {
        // values
        mode: "normal",
        percentage: 1,
        // position
        alpha: 1,
        rotation: 0,
        x: 0.5,
        y: 0.5,
        xAnchor: 0.5,
        yAnchor: 0.5,
        width: 1,
        height: 1,
        scaleMode: "fill",
        strokeColor: null,
        fillColor: null,
        // graphics
        path: null,
        pathBehind: null,
        pathFront: null,
        // text
        text: "",
        textMargin: 0,
        textFont: '"Lucida Console", Monaco, monospace',
        textColor: "black",
    }
    var ranges = {
        mode: ["rectangle","bar"],
        percentage: [
            [0, 1]
        ],
        alpha: [[0,1]],
        rotation: [[-Math.PI,Math.PI]],
        x: [[0,1]],
        y: [[0,1]],
        xAnchor: [[0,1]],
        yAnchor: [[0,1]],
        width: [[0,1]],
        height: [[0,1]],
        scaleMode: ["fill","fit","expand"],
        strokeColor: "string",
        fillColor: "string",
        path: "string",
        pathBehind: "string",
        pathFront: "string",
        text: "string",
        textMargin: [[0,1],[1,1000]],
        textFont: "string",
        textColor: "string",
    }

    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}