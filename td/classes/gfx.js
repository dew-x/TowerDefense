function Gfx(archetype) {
	copy(this,archetype);
}
/**
 * Drawing function for a grfic asset
 *
 * @param  ctx html5 2d context
 * @param  width canvas width
 * @param  height canvas height
 * @param  x0 canvas drawing zone left
 * @param  y0 canvas drawing zone top
 * @param  x1 canvas drawing zone right
 * @param  y1 canvas drawing zone bottom
 * @return      none
 */
Gfx.prototype.draw = function(ctx, width, height, x0, y0, x1, y1) {
	if (this.drawFunction==null) {
		if (this.mode=="normal" || this.mode=="button") {

		} else if (this.mode=="text") {

		} else if (this.mode=="bar") {

		} else if (this.mode=="bg") {

		}
	} else {
		this.drawFunction(ctx, width, height, x0, y0, x1, y1);
	}
}

Gfx.prototype.setPercentage = function(perc) {
    this.percentage = clamp(perc, 0, 1);
}