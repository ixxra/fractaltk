"use strict";

var gen = require('./quarcticFam1');
var m = require('./matrix');
var complex = require('./complex');
var fractal = require('./fractal');

var N = 600;
var x = m.linspace(-4, 4, N);
var y = m.linspace(-4, 4, N);

//let cx = 1.134;
//let cy = 0.2134;

//This map, courtesy of milnor:
let cx = -0.765,
    cy = 0.12;

let julia = gen.juliaGen(cx, cy);
let iters = fractal.juliaMap(julia, x, y, 16, 1000);

console.log(JSON.stringify(m.vectorToArray(iters)));
