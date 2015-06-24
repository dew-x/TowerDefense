function TowerDefense(canvasID, width, height) {
	this.canvasID = canvasID;
	this.width    = width;
	this.height   = height;
}

TowerDefense.prototype.loadDefaults = function () {
	this.addProjectyle("missile",{});
	this.addEnemy("enemy",{});
	this.addWave("wave",{enemies:["enemy":10]});
	this.addMap("map",{});
	this.addTower("tower",{projectyle:"missile"});
}

TowerDefense.prototype.play = function() {
	this._attachEvents();
}

TowerDefense.prototype.addProjectyle = function (key, data) {

}

TowerDefense.prototype.addEnemy = function (key, data) {

}

TowerDefense.prototype.addGfx = function (key, data) {

}

TowerDefense.prototype.addSfx = function (key, data) {

}

TowerDefense.prototype.addWave = function (key, data) {

}

TowerDefense.prototype.addMap = function (key, data) {

}

TowerDefense.prototype.addTower = function (key, data) {

}

TowerDefense.prototype.addLevel = function (key, data) {
	
}

TowerDefense.prototype._attachEvents = function () {

}