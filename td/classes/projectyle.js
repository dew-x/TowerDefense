/**
 * Projectyle of class archetype from origin to taregt  
 *
 * @param  archetype class of the projectyle
 * @param  origin entity who fired the projectyle 
 * @param  target entity that will recieve the projectyle
 * @return      none
 */
function Projectyle(archetype,origin,target) {
    this.archetype = archetype;
    this.origin    = origin;
    this.target    = target;
    // internal values
    this._currentPosition = {x:0,y:0};
    this._targetPosition = {x:0,y:0};
    // prepare
    this._prepare();
}

Projectyle.prototype._prepare = function () {
        
}

Projectyle.prototype.draw = function () {
    
}