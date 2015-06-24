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
}