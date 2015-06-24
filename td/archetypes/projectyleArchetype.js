function projectyleArchetype(data) {
    var defaults = {
        // values
        speed: 10, // squares per minute
        mode: "linear", // "homing", "parabola", "laser", "aoe", 
        // graphics
        gfx: null, // custom grafic effects  
        impactgfx: null, // explosion gfx
        // sounds
        launchsfx: null, // sound on fire (once)
        airsfx: null, // sound during air (looped)
        impactsfx: null, // sound on impact (once)
    }
    var ranges = {
        speed: [
            [1, 1000],
        ],
        mode: ["linear", "homing", "parabola", "laser", "aoe"],
        gfx: "object",
        imactgfx: "object",
        launchsfx: "object",
        airsfx: "object",
        impactsfx: "object",
    }
    
    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}