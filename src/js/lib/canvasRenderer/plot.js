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

module.exports = {
    fractalShow: fractalShow
};
