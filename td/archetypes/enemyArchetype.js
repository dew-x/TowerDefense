function enemyArchetype(data) {
    var defaults = {
        // values
        hp: 10, 
        // graphics
        
        // sounds
        
    }
    var ranges = {
        hp: [1,1000000000],
    }
    
    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}