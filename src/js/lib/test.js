"use strict";

var gen = require('./quarcticFam1');
var m = require('./matrix');
var complex = require('./complex');

var N = 60;
var x = m.linspace(-4, 4, N);
var y = m.linspace(-4, 4, N);

var zx = m.vector(N*N);
var zy = m.vector(N*N);

let cx = 1.134;
let cy = 0.2134;

let julia = gen.juliaGen(cx, cy);

for (var i=0; i<N; i++){
    for (var j=0; j<N; j++){
        let k = i + j*N,
            zi = julia(x[i], y[j]);
        zx[k] = zi.re,
        zy[k] = zi.im;

    }
}

console.log(zx);
