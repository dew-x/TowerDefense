function Gfx(archetype) {
    copy(this, archetype);
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
    if (this.mode == "normal") {
        this.drawNormal(ctx, width, height);
    } else if (this.mode == "bar") {
        this.drawBar(ctx, width, height);
    }
}

Gfx.prototype.setPercentage = function(perc) {
    this.percentage = clamp(perc, 0, 1);
}

Gfx.prototype.drawNormal = function(ctx, width, height) {
    var w = width * this.width;
    var h = height * this.height;
    if (this.scaleMode == "fit") {
        if (w / h > this.ratio) w = h * this.ratio;
        else h = w / this.ratio;
    } else if (this.scaleMode == "expand") {
        if (w / h > this.ratio) h = w / this.ratio;
        else w = h * this.ratio;
    }
    var x = width * this.x;
    var y = height * this.y;
    var x0 = -w * this.xAnchor;
    var y0 = -h * this.yAnchor;
    ctx.save();
    ctx.translate(x, y);
    if (this.alpha != 1) ctx.globalAlpha = this.alpha;
    if (this.rotation != 0) ctx.rotate(this.rotation);
    this._drawObject(this.path, ctx, x0, y0, w, h);
    ctx.restore();
}

Gfx.prototype._drawObject = function(obj, ctx, x, y, w, h) {
    if (obj == "rectangle") {
        if (this.fillColor != null) {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(x, y, w, h);
        }
        if (this.strokeColor != null) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.border || 1;
            ctx.strokeRect(x, y, w, h);
        }
    }
}

Gfx.prototype.drawBar = function(ctx, width, height) {
    var stroke = this.strokeColor;
    var fill = this.fillColor;
    var w = width * this.width;
    var h = height * this.height;
    if (this.scaleMode == "fit") {
        if (w / h > this.ratio) w = h * this.ratio;
        else h = w / this.ratio;
    } else if (this.scaleMode == "expand") {
        if (w / h > this.ratio) h = w / this.ratio;
        else w = h * this.ratio;
    }
    var x = width * this.x;
    var y = height * this.y;
    var x0 = -w * this.xAnchor;
    var y0 = -h * this.yAnchor;
    ctx.save();
    ctx.translate(x, y);
    if (this.alpha != 1) ctx.globalAlpha = this.alpha;
    if (this.rotation != 0) ctx.rotate(this.rotation);
    if (stroke == null || fill == null) {
        // todo
    } else {
        this.strokeColor = null;
        this.fillColor = stroke;
        this._drawObject(this.pathBehind, ctx, x0, y0, w, h);
        this.fillColor = fill;
        this._drawObject(this.path, ctx, x0 + this.border, y0 + this.border, (w - this.border * 2) * this.percentage, h - this.border * 2);
    }
    ctx.restore();
    this.strokeColor = stroke;
    this.fillColor = fill;
}