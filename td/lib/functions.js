function extend(basic, add) {
    var ret = {};
    for (var key in basic) {
        if (basic.hasOwnProperty(key)) {
            if (add.hasOwnProperty(key)) {
                ret[key] = add[key];
            } else {
                ret[key] = basic[key];
            }
        }
    }
    return ret;
}

function _checkRange(value, range) {
    if (typeof range == 'string') {
        if (typeof value != range) {
            throw "Expecting value of type \"" + range + "\"";
        }
    } else {
        if (typeof range[0] != "object") {
            if (range.indexOf(value) == -1) {
                throw "Unknown value \"" + value + "\" expecting [" + range.join(", ") + "]";
            }
        } else {
            var ok = false;
            for (var i = 0; i < range.length; ++i) {
                if (value >= range[i][0] && value <= range[i][1]) ok = true;
            }
            if (!ok) {
                throw "Out of range \"" + value + "\" expecting [" + range.map(function(x) {
                    return x.join("-")
                }).join(", ") + "]";
            }
        }
    }
}

function checkRanges(obj, ranges) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (ranges.hasOwnProperty(key)) {
                try {
                    _checkRange(obj[key], ranges[key]);
                } catch (e) {
                    throw "Bad value for parameter \"" + key + "\". " + e;
                }
            } else {
                throw "Unused parameter: " + key;
            }
        }
    }
    return true;
}

function copy(target, origin) {
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] == 'object') {
                if (Array.isArray(origin[key])) target[key] = [];
                else target[key] = {};
                copy(target[key], origin[key]);
            } else {
                target[key] = origin[key];
            }
        }
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}