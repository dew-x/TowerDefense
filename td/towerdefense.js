// nasty fix for eventlisteners
var game = null;

function TowerDefense(canvasID, width, height) {
    this.canvasID = canvasID;
    this.width = width;
    this.height = height;
    this.data = {
        projectyles: {},
        enemies: {},
        waves: {},
        maps: {},
        levels: {},
        gfxs: {},
        sfxs: {},
        towers: {},
        game: null,
    }
    this._insert = [];
}

TowerDefense.prototype.loadDefaults = function() {
    this.addProjectyle("missile", {});
    this.addEnemy("enemy", {});
    this.addWave("wave", {
        enemies: [{
            type: "enemy",
            amount: 5
        }, {
            type: "enemy",
            amount: 5
        }]
    });
    this.addMap("map", {});
    this.addTower("tower", {
        projectyle: "missile"
    });
    this.addGame({});
    this.addLevel("Level 1", {
        map: "map",
        waves: [{
            type: "wave"
        }, {
            type: "wave"
        }]
    });
}

TowerDefense.prototype.play = function() {
    try {
        this._parseData();
        console.log(this.data);
        game = new Game(this.data, this.canvasID, this.width, this.height);
        game.play();
        this._attachEvents();
    } catch (e) {
        console.log(e);
    }
}

TowerDefense.prototype.addEnemy = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "enemy",
    });
}

TowerDefense.prototype.addGame = function(data) {
    this._insert.push({
        key: "game",
        data: data,
        type: "game",
    });
}

TowerDefense.prototype.addGfx = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "gfx",
    });
}

TowerDefense.prototype.addSfx = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "sfx",
    });
}

TowerDefense.prototype.addWave = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "wave",
    });
}

TowerDefense.prototype.addMap = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "map",
    });
}

TowerDefense.prototype.addProjectyle = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "projectyle",
    });
}

TowerDefense.prototype.addTower = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "tower",
    });
}

TowerDefense.prototype.addLevel = function(key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "level",
    });
}

TowerDefense.prototype._attachEvents = function() {
    var canvas = document.getElementById(this.canvasID);
    // mouse events
    canvas.addEventListener("mousedown", function(event) {
        game._mousedown(event)
    });
    canvas.addEventListener("mousemove", function(event) {
        game._mousemove(event)
    });
    canvas.addEventListener("mouseup", function(event) {
        game._mouseup(event)
    });
    canvas.addEventListener("wheel", function(event) {
        game._mousewheel(event)
    });
    // touch events
    canvas.addEventListener("touchstart", function(event) {
        game._touchdown(event)
    });
    canvas.addEventListener("touchmove", function(event) {
        game._touchmove(event)
    });
    canvas.addEventListener("touchend", function(event) {
        game._touchup(event)
    });
    canvas.addEventListener("touchcancel", function(event) {
        game._touchup(event)
    });
    canvas.addEventListener("touchleave", function(event) {
        game._touchup(event)
    });
    // keyboard
    document.addEventListener("keydown", function(event) {
        game._keydown(event)
    });
    document.addEventListener("keyup", function(event) {
        game._keyup(event)
    });
    // globals
    window.addEventListener("resize", function(event) {
        game._resize()
    });

    function loop(time) {
        game.loop(time);
        window.requestAnimationFrame(loop);
    }
    loop();
}

TowerDefense.prototype._parseData = function() {
    var functions = {
        projectyle: "_insertProjectyle",
        enemy: "_insertEnemy",
        game: "_insertGame",
        gfx: "_insertGfx",
        sfx: "_insertSfx",
        wave: "_insertWave",
        map: "_insertMap",
        tower: "_insertTower",
        level: "_insertLevel",
    }
    var size = this._insert.length;
    var i = 0;
    var errors = [];
    while (this._insert.length > 0) {
        var element = this._insert.shift();
        if (functions.hasOwnProperty(element.type)) {
            if (!this[functions[element.type]](element, errors)) {
                this._insert.push(element);
            }
        } else {
            throw 'Unknown type "' + element.type + '"';
        }
        ++i;
        if (i == size) {
            if (size == this._insert.length) {
                throw errors.join(", ");
            } else {
                errors = [];
                i = 0;
                size = this._insert.length;
            }
        }
    }
}

TowerDefense.prototype._insertElement = function(element, target, parent, dependencies, errors) {
    var data = element.data;
    for (var key in dependencies) {
        if (dependencies.hasOwnProperty(key) && data.hasOwnProperty(key)) {
            if (Array.isArray(data[key])) {
                for (var i = 0; i < data[key].length; ++i) {
                    if (typeof data[key][i].type != 'object') {
                        if (dependencies[key].hasOwnProperty(data[key][i].type)) {
                            data[key][i].type = dependencies[key][data[key][i].type];
                        } else {
                            errors.push('Missing dependence "' + key + '[' + data[key][i].type + ']" for "' + element.type + '[' + element.key + ']"');
                            return false;
                        }
                    }
                }
            } else if (typeof data[key] != 'object') {
                if (dependencies[key].hasOwnProperty(data[key])) {
                    data[key] = dependencies[key][data[key]];
                } else {
                    errors.push('Missing dependence "' + key + '[' + data[key] + ']" for "' + element.type + '[' + element.key + ']"');
                    return false;
                }
            }
        }
    }
    var obj = null;
    try {
        obj = new parent(data);
    } catch (e) {
        errors.push('Error in "' + element.type + '[' + element.key + ']" -> ' + e);
        return false;
    }
    target[element.key] = obj;
    return true;
}

TowerDefense.prototype._insertProjectyle = function(element, errors) {
    var dependencies = {
        gfx: this.data.gfxs,
        impactgfx: this.data.gfxs,
        launchsfx: this.data.sfxs,
        airsfx: this.data.sfxs,
        impactsfx: this.data.sfxs,
    }
    var parent = projectyleArchetype;
    var target = this.data.projectyles;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertEnemy = function(element, errors) {
    var dependencies = {}
    var parent = enemyArchetype;
    var target = this.data.enemies;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertGame = function(element, errors) {
    var dependencies = {
        loadingBg: this.data.gfxs,
        loadingBarBg: this.data.gfxs,
        loadingBarFront: this.data.gfxs,
        mainmenuBg: this.data.gfxs,
        loadingsfx: this.data.sfxs,
    }
    var parent = gameArchetype;
    var target = this.data;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertGfx = function(element, errors) {
    var dependencies = {}
    var parent = gfxArchetype;
    var target = this.data.gfxs;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertLevel = function(element, errors) {
    var dependencies = {
        map: this.data.maps,
        waves: this.data.waves,
    }
    var parent = levelArchetype;
    var target = this.data.levels;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertSfx = function(element, errors) {
    var dependencies = {}
    var parent = sfxArchetype;
    var target = this.data.sfxs;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertWave = function(element, errors) {
    var dependencies = {
        enemies: this.data.enemies,
    }
    var parent = waveArchetype;
    var target = this.data.waves;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertMap = function(element, errors) {
    var dependencies = {}
    var parent = mapArchetype;
    var target = this.data.maps;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertTower = function(element, errors) {
    var dependencies = {
        projectyle: this.data.projectyles,
        gfx: this.data.gfxs,
        placesfx: this.data.sfxs,
    }
    var parent = towerArchetype;
    var target = this.data.towers;
    return this._insertElement(element, target, parent, dependencies, errors);
}