var gen = require('./lib/quarcticFam1');
var m = require('./lib/matrix');
var fractal = require('./lib/fractal');
var palette = require('./lib/canvasRenderer/palette');
var plot = require('./lib/canvasRenderer/plot');

function testIterate(cb){
    let N = 600,
        cx = -0.765,
        cy = 0.12,
        julia = gen.juliaGen(cx, cy),
        x = m.linspace(-4, 4, N),
        y = m.linspace(-4, 4, N),
        inf = 16,
        maxIters = 1000;

    let iters = fractal.juliaMap(julia, x, y, inf, maxIters);
    cb(iters);
}

function paintGradient(canvas, size, height){
    return palette.makePalette(canvas.getContext('2d'), size, height);
}

function paintFractal(data, canvas, paletteInst){
    let paletteSize = paletteInst.r.length;
    plot.fractalShow(data, canvas, paletteInst, paletteSize, palette.linearIndex, 1000);
}

function paintTest(gradCanvas, mapCanvas){
    mapCanvas.width = 600;
    mapCanvas.height = 600;
    let paletteInst = paintGradient(gradCanvas, 256, gradCanvas.height);
    testIterate(function (data) {
        paintFractal(data, mapCanvas, paletteInst);
    });
}

global.testIterate = testIterate;
global.paintGradient = paintGradient;
global.paintFractal = paintFractal;
global.paintTest = paintTest;
