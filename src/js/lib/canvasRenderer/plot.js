"use strict";

/**
Plots Fractal `data` into `canvas`.

@param data: Escape velocity data to plot.
@param canvas: Canvas where to plot. Must be of the same pixel size than data.
@param palette: Color palette, as returned by `palette.makePalette`.
@param paletteSize: Palette size.
@param coloringFn: Function to convert from iter space to color space, for
       example, `palette.linearColoring`.
@param maxIter: Maximum iteration.
This function returns nothing, but have side effects, painting in `canvas`.
**/
function fractalShow(data, canvas, palette, paletteSize, coloringFn, maxIter){
    let r = palette.r,
        g = palette.g,
        b = palette.b,
        ctx = canvas.getContext('2d'),
        img = ctx.getImageData(0,0,canvas.width, canvas.height),
        pix = img.data,
        N = data.length;

    for (let k=0; k<N; k++){
        let offset = 4*k,
            colorIdx = coloringFn(data[k], paletteSize, maxIter);
        pix[offset] = r[colorIdx];
        pix[offset+1] = g[colorIdx];
        pix[offset+2] = b[colorIdx];
        pix[offset+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}


/**
Draws fractal using `cmap` insead of `palette`.
@param cmap: Colormap as returned with `colormap`
**/
function fractalShowCmap(data, canvas, cmap, paletteSize, coloringFn, maxIter){
    let ctx = canvas.getContext('2d'),
        img = ctx.getImageData(0,0,canvas.width, canvas.height),
        pix = img.data,
        N = data.length;

    for (let k=0; k<N; k++){
        let offset = 4*k,
            colorIdx = coloringFn(data[k], paletteSize, maxIter);
        let rgb = cmap[colorIdx];
        pix[offset] = rgb[0];
        pix[offset+1] = rgb[1];
        pix[offset+2] = rgb[2];
        pix[offset+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}

/**
Converts canvas coordinates to complex plane coordinates.
@param canvas: `canvas` element.
@params x, y: (x, y) coordinates in canvas.
@param cPlane: Complex plane structure.
@return: Coordinates object.
**/
function canvasCoordsToPlaneCoords(canvas, x, y, cPlane){
    let xPlane = cPlane.xmin + x*cPlane.width/canvas.width;
    let yPlane = cPlane.ymin + y*cPlane.height/canvas.height;
    return {x: xPlane, y: yPlane};
}


/**
Maps a subrectangle in canvas to complex plane coordinates.
@param canvas: canvas element.
@params (x, y): Rectangle center coordinates.
@params (rectW, rectH): Rectangle's width and height.
@param cPlane: Complex plane object.
@return: New complex plane object.
**/
function mapRectangleToCPlane(canvas, x, y, rectW, rectH, cPlane){
    let factorX = rectW/canvas.width,
        factorY = rectH/canvas.height,
        zoomFactor = Math.min(factorX, factorY),
        coords = canvasCoordsToPlaneCoords(canvas, x, y, cPlane),
        deltaX = cPlane.width*zoomFactor,
        deltaY = cPlane.height*zoomFactor;

    return {
        xmin: coords.x - deltaX/2,
        ymin: coords.y - deltaY/2,
        width: deltaX,
        height: deltaY
    };
}

module.exports = {
    fractalShow: fractalShow,
    fractalShowCmap: fractalShowCmap,
    mapRectangleToCPlane: mapRectangleToCPlane
};
