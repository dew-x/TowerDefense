function doLine(ctx,x0,y0,x1,y1,color,lineWidth) {
	ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.strokeColor = color || "black";
    ctx.lineWidth = lineWidth || 1;
    ctx.stroke();
}