function minimumFillingRectangle(rect, rectList) {
    var currentRectangles = [rect];
    for (var i = 0; i < rectList.length; ++i) {
        var nextRectangles = [];
        for (var j = 0; j < currentRectangles.length; ++j) {
            nextRectangles = nextRectangles.concat(do8rects(currentRectangles[j], rectList[i]));
        }
        currentRectangles = nextRectangles;
    }
    var minx = currentRectangles[0].x;
    var maxx = currentRectangles[0].x + currentRectangles[0].w;
    var miny = currentRectangles[0].y;
    var maxy = currentRectangles[0].y + currentRectangles[0].h;
    for (var i = 1; i < currentRectangles.length; ++i) {
        minx = Math.min(minx, currentRectangles[i].x);
        maxx = Math.max(maxx, currentRectangles[i].x + currentRectangles[i].w);
        miny = Math.min(miny, currentRectangles[i].y);
        maxy = Math.max(maxy, currentRectangles[i].y + currentRectangles[i].h);
    }
    return {
        x: minx,
        y: miny,
        w: maxx - minx,
        h: maxy - miny,
    }
}

function do8rects(bounding, middle) {
    var ret = [];
    if (rectangleInside(bounding, middle)) return [];
    if (!rectangleCollide(bounding, middle)) return [bounding];
    var x = [
        bounding.x,
        Math.max(bounding.x, middle.x),
        middle.x + middle.w,
        Math.max(bounding.x + bounding.w, middle.x + middle.w),
    ];
    var y = [
        bounding.y,
        Math.max(bounding.y, middle.y),
        middle.y + middle.h,
        Math.max(bounding.y + bounding.h, middle.y + middle.h)
    ];
    for (var i = 0; i < x.length - 1; ++i) {
        for (var j = 0; j < y.length - 1; ++j) {
            if (!(i == 1 && j == 1)) {
                var rect = {
                    x: x[i],
                    y: y[j],
                    w: x[i + 1] - x[i],
                    h: y[j + 1] - y[j],
                }
                if (rect.w >= 1 && rect.h >= 1) ret.push(rect);
            }
        }
    }
    return ret;
}

function rectangleInside(rect, outside) {
    return rect.x >= outside.x && rect.x + rect.w <= outside.x + outside.w && rect.y >= outside.y && rect.y + rect.h <= outside.y + outside.h;
}

function rectangleCollide(rectA, rectB) {
    return rectA.x < rectB.x + rectB.w &&
        rectA.x + rectA.w > rectB.x &&
        rectA.y < rectB.y + rectB.h &&
        rectA.h + rectA.y > rectB.y;
}