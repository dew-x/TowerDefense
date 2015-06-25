function sfxArchetype(data) {
    var defaults = {
        // values
         
        // graphics
        
        // sounds
        
    }
    var ranges = {
        
    }
    
    if (checkRanges(data, ranges)) {
        var result = extend(defaults, data);
        copy(this, result);
    }
}