function Gfx(archetype) {
    this.perc = 0;
    if (archetype.drawFunction != null) {
        this.draw = archetype.drawFunction;
    }
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

}

Gfx.prototype.setPerc = function(perc) {
    this.perc = clamp(perc, 0, 1);
}