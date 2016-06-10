"use strict";

/**
Creates a color palete from a canvas context.
@param ctx: Canvas context.
@param size: Palette size.
@param height: Optional, if defined, fill canvas' rectangle up to `height`.
@return: object with three Uint8ClampedArray of the same `size`, r, g, b.
**/
function makePalette(ctx, size, height) {
    let gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "yellow");
    ctx.fillStyle = gradient;
    if (!height) height = 1;
    ctx.fillRect(0, 0, size, height);
    let r = new Uint8ClampedArray(size),
        g = new Uint8ClampedArray(size),
        b = new Uint8ClampedArray(size),
        data = ctx.getImageData(0,0,size,1).data;
    for (let i=0; i<size; i++){
        let idx = 4*i;
        r[i] = data[idx];
        g[i] = data[idx+1];
        b[i] = data[idx+2];
    }
    return {r: r, g:g, b:b};
}


/**
Converts from iteration space to color space.
@param m: Integer in the range 0 <= m < `maxIter`.
@param paletteSize: palette size.
@param maxIter: Maximum possible number of iterations.
@return: Integer in the range 0 <= `paletteSize`
**/
function linearIndex(m, paletteSize, maxIter){
    return Math.floor((paletteSize - 1)*m/maxIter);
}


/**
Converts from iteration space to color space, changing scale logaritmically.
@param m: Integer in the range 0 <= m < `maxIter`.
@param paletteSize: palette size.
@param maxIter: Maximum possible number of iterations.
@return: Integer in the range 0 <= `paletteSize`
**/
function logIndex(m, paletteSize, maxIter){
    let d1 = Math.log(m + 1),
        d2 = Math.log(maxIter);

    return Math.floor((paletteSize - 1)*d1/d2);
}


module.exports = {
    makePalette: makePalette,
    linearIndex: linearIndex,
    logIndex: logIndex
};
