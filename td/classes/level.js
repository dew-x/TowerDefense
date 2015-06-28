function Level (archetype) {
	copy(this, archetype);
}

Level.prototype.getMap = function () {
	return this.map;
}