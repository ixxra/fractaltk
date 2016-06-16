"use strict";

var gen = require('./lib/quarcticFam1');
var m = require('./lib/matrix');
var fractal = require('./lib/fractal');
var palette = require('./lib/canvasRenderer/palette');
var plot = require('./lib/canvasRenderer/plot');
var colormap = require('colormap');


function setupRectangleInteraction(cPlane, canvas, rectangle){
    canvas.addEventListener('click', function (event) {
        rectangle.style.top = (event.pageY - 50) + 'px';
        rectangle.style.left = (event.pageX - 50) + 'px';
        rectangle.hidden = false;
        cPlane = plot.mapRectangleToCPlane(canvas, event.pageX,
                                      event.pageY, 100, 100, cPlane);
        console.log(cPlane);
        paintTestCmapCPlane(cPlane, canvas, function(){
            rectangle.hidden = true;
        });
    });
}


function paintTestCmapCPlane(cPlane, canvas, cb){
    let paletteSize = 256;
    canvas.width = 600;
    canvas.height = 600;
    let julia = gen.juliaGen(-0.765,0.12);

    fractal.generateIterations(cPlane, julia, function (iters) {
        let maxIter = iters.reduce((prev, curr) => Math.max(prev, curr));
        let cmap = colormap({colormap: 'jet',
                             nshades:paletteSize,
                             format:'rgb',
                             alpha: [0, 1]
                            });
        plot.fractalShowCmap(iters,
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
        setupRectangleInteraction(cPlane, canvas, rect);
    });
}

global.testUI = testUI;
