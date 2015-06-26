function TowerDefense(canvasID, width, height) {
	this.canvasID = canvasID;
	this.width    = width;
	this.height   = height;
    this.data     = {
        projectyles: {},
        enemies: {},
        waves: {},
        maps: {},
        levels: {},
        gfxs: {},
        sfxs: {},
        towers: {},    
    }
    this._insert = [];
}

TowerDefense.prototype.loadDefaults = function () {
	this.addProjectyle("missile",{});
	this.addEnemy("enemy",{});
	this.addWave("wave",{enemies:[{enemy:10}]});
	this.addMap("map",{});
	this.addTower("tower",{projectyle:"missile"});
}

TowerDefense.prototype.play = function() {
    try {
        this._parseData();
        this._attachEvents();
        console.log(this.data);
    } catch (e) {
        console.log(e);
    }
}

TowerDefense.prototype.addProjectyle = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "projectyle",
    });    
}

TowerDefense.prototype.addEnemy = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "enemy",
    });
}

TowerDefense.prototype.addGfx = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "gfx",
    });
}

TowerDefense.prototype.addSfx = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "sfx",
    });
}

TowerDefense.prototype.addWave = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "wave",
    });
}

TowerDefense.prototype.addMap = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "map",
    });
}

TowerDefense.prototype.addTower = function (key, data) {
    this._insert.push({
        key: key,
        data: data,
        type: "tower",
    });
}

TowerDefense.prototype.addLevel = function (key, data) {
	this._insert.push({
        key: key,
        data: data,
        type: "level",
    });
}

TowerDefense.prototype._attachEvents = function () {

}

TowerDefense.prototype._parseData = function () {
    var functions = {
        projectyle: "_insertProjectyle",
        enemy: "_insertEnemy",
        gfx: "_insertGfx",
        sfx: "_insertSfx",
        wave: "_insertWave",
        map: "_insertMap",
        tower: "_insertTower",
        level: "_insertLevel",
    }
    var size=this._insert.length;
    var i=0;
    var errors=[];
    while (this._insert.length > 0) {
        var element = this._insert.shift();
        if (functions.hasOwnProperty(element.type)) {
            if (!this[functions[element.type]](element,errors)) {
                this._insert.push(element);    
            }    
        } else {
            throw 'Unknown type "'+element.type+'"';    
        }      
        ++i;
        if (i==size) {
            if (size==this._insert.length) {
                throw errors.join(", "); 
            } else {
                errors=[];
                i=0;
                size=this._insert.length;
            }
        }
    }
}

TowerDefense.prototype._insertElement = function (element, target, parent, dependencies, errors) {
    var data = element.data;
    for (var key in dependencies) {
        if (dependencies.hasOwnProperty(key) && data.hasOwnProperty(key) && typeof data[key]!='object') {
            if (dependencies[key].hasOwnProperty(data[key])) {
                data[key]=dependencies[key][data[key]];
            } else {
                errors.push('Missing dependence "'+key+'['+data[key]+']" for "'+element.type+'['+element.key+']"');
                return false;
            }       
        }
    }
    var obj = null;
    try {
        obj = new parent(data);
    } catch (e) {
        errors.push('Error in "'+element.type+'['+element.key+']" -> '+e);
        return false;
    }
    target[element.key]=obj;
    return true;    
}

TowerDefense.prototype._insertProjectyle = function (element, errors) {
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

TowerDefense.prototype._insertEnemy = function (element, errors) {
    var dependencies = {
    }
    var parent = enemyArchetype;
    var target = this.data.enemies;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertGfx = function (element, errors) {
    var dependencies = {
    }
    var parent = gfxArchetype;
    var target = this.data.gfxs;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertSfx = function (element, errors) {
    var dependencies = {
    }
    var parent = sfxArchetype;
    var target = this.data.sfxs;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertWave = function (element, errors) {
    var dependencies = {
    }
    var parent = waveArchetype;
    var target = this.data.waves;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertMap = function (element, errors) {
    var dependencies = {
    }
    var parent = mapArchetype;
    var target = this.data.maps;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertTower = function (element, errors) {
    var dependencies = {
        projectyle: this.data.projectyles,
        gfx: this.data.gfxs,
        placesfx: this.data.sfxs,
    }
    var parent = towerArchetype;
    var target = this.data.towers;
    return this._insertElement(element, target, parent, dependencies, errors);
}

TowerDefense.prototype._insertLevel = function (element, errors) {
    var dependencies = {
    }
    var parent = levelArchetype;
    var target = this.data.levels;
    return this._insertElement(element, target, parent, dependencies, errors);
}