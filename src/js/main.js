"use strict";

var gen = require('./lib/quarcticFam1');
var m = require('./lib/matrix');
var fractal = require('./lib/fractal');
var palette = require('./lib/canvasRenderer/palette');
var plot = require('./lib/canvasRenderer/plot');
var colormap = require('colormap');


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

function testIterateWithCPlane(cPlane, cb){
    let N = 600,
        cx = -0.765,
        cy = 0.12,
        julia = gen.juliaGen(cx, cy),
        inf = 16,
        maxIter = 1000,
        xmin = cPlane.xmin,
        xmax = xmin + cPlane.width,
        ymin = cPlane.ymin,
        ymax = ymin + cPlane.height,
        x = m.linspace(xmin, xmax, N),
        y = m.linspace(ymin, ymax, N);

    let iters = fractal.juliaMap(julia, x, y, inf, maxIter);
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

function canvasCoordsToPlaneCoords(canvas, x, y, cPlane){
    let xPlane = cPlane.xmin + x*cPlane.width/canvas.width;
    let yPlane = cPlane.ymin + y*cPlane.height/canvas.height;
    return {x: xPlane, y: yPlane};
}

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

function moveRectangle(canvas, rectangle){
    canvas.addEventListener('click', function (event) {
        rectangle.style.top = (event.pageY - 50) + 'px';
        rectangle.style.left = (event.pageX - 50) + 'px';
        rectangle.hidden = false;
        console.log(event.pageX, event.pageY);
        console.log(mapRectangleToCPlane(canvas, event.pageX,
                                         event.pageY, 100, 100, {
                                             xmin: -4,
                                             ymin: -4,
                                             width: 8,
                                             height: 8
                                         }));
    });
}

function moveRectangleCPlane(cPlane, canvas, rectangle){
    canvas.addEventListener('click', function (event) {
        rectangle.style.top = (event.pageY - 50) + 'px';
        rectangle.style.left = (event.pageX - 50) + 'px';
        rectangle.hidden = false;
        console.log(event.pageX, event.pageY);
        cPlane = mapRectangleToCPlane(canvas, event.pageX,
                                      event.pageY, 100, 100, cPlane);
        console.log(cPlane);
    });
}


function paintTestCmap(canvas, cb){
    let paletteSize = 256;
    canvas.width = 600;
    canvas.height = 600;
    testIterate(function (data) {
        let maxIter = data.reduce((prev, curr) => Math.max(prev, curr));
        let cmap = colormap({colormap: 'jet',
                             nshades:paletteSize,
                             format:'rgb',
                             alpha: [0, 1]
                            });
        plot.fractalShowCmap(data,
                              canvas,
                              cmap,
                              paletteSize,
                              palette.linearIndex,
                              maxIter
                            );
        cb();
    });
}

function paintTestCmapCPlane(cPlane, canvas, cb){
    let paletteSize = 256;
    canvas.width = 600;
    canvas.height = 600;
    testIterateCPlane(cPlane, function (data) {
        let maxIter = data.reduce((prev, curr) => Math.max(prev, curr));
        let cmap = colormap({colormap: 'jet',
                             nshades:paletteSize,
                             format:'rgb',
                             alpha: [0, 1]
                            });
        plot.fractalShowCmap(data,
                              canvas,
                              cmap,
                              paletteSize,
                              palette.linearIndex,
                              maxIter
                            );
        cb();
    });
}

function testUI(){
    let canvas = global.document.getElementById('fractal');
    let rect = global.document.getElementById('rectangle');
    let cPlane = {xmin: -4, ymin: -4, width: 8, height: 8};
    global.FractalNS = new Object();
    global.FractalNS.cPlane = cPlane;
    paintTestCmapCPlane(cPlane, canvas, function () {
        rect.style.position = 'absolute';
        rect.hidden = true;
        moveRectangleCPlane(cPlane, canvas, rect);
    });
}

global.testIterate = testIterate;
global.paintGradient = paintGradient;
global.paintFractal = paintFractal;
global.paintTest = paintTest;
global.paintTestCmap = paintTestCmap;
global.moveRectangle = moveRectangle;
global.testUI = testUI;
