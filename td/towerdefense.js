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

TowerDefense.prototype._parseData = function () {
    var functions = {
        projectyle: this._insertProjectyle,
        enemy: this._insertEnemy,
        gfx: this._insertGfx,
        sfx: this._insertSfx,
        wave: this._insertWave,
        map: this._insertMap,
        tower: this._insertTower,
        level: this._insertLevel,
    }
    var size=this._insert.length;
    var i=0;
    var errors=[];
    while (this._insert.length > 0) {
        var element = this._insert.shift();
        if (functions.hasOwnProperty(element.type)) {
            if (!functions[element.type](element,errors)) {
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

TowerDefense.prototype._attachEvents = function () {

}

TowerDefense.prototype._insertElement = function (element, target, parent, dependencies, errors) {
    var data = element.data;
    for (var key in dependencies) {
        if (dependencies.hasOwnProperty(key) && data.hasOwnProperty(key) && data[key]!=null) {
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
        obj = parent(data);
    } catch (e) {
        errors.push('Error in "'+element.type+'['+element.key+']": '+e);
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
    this._insertElement(element, target, parent, dependencies, errors);    
}

TowerDefense.prototype._insertEnemy = function (element, errors) {

}

TowerDefense.prototype._insertGfx = function (element, errors) {

}

TowerDefense.prototype._insertSfx = function (element, errors) {

}

TowerDefense.prototype._insertWave = function (element, errors) {

}

TowerDefense.prototype._insertMap = function (element, errors) {

}

TowerDefense.prototype._insertTower = function (element) {

}

TowerDefense.prototype._insertLevel = function (element) {

}