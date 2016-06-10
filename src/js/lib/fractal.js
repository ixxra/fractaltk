"use strict";
var complex = require('./complex');


/**
Applies `fn` iteratively, until it reaches infinity or `maxIter` is reached.
@param fn: Complex function. It is expected to be of the form `(x, y)->{re, im}`.
@param vectorx, vectory: Numeric vectors with real and imaginary parts.
 `juliaMap` will make the cartesian product, and iterate the combinations
 `xi, yj`.
@param inf: Stop iteration if the *square* modulus of the return of `fn` rebases
 this parameter.
@param maxIter: Stop if reached `maxIter` iterations.
@returns: if length of `vectorx` is N, returns an Int32Array of N*N integers, representing
 the iteration number where repeated iterations of `fn(xi, yj)` escaped to
 `inf` or `maxIter` instead.
**/
function juliaMap(fn, vectorx, vectory, inf, maxIter){
    let N = vectorx.length,
        SIZE = 4*N*N,
        buffer = new ArrayBuffer(SIZE),
        iters = new Int32Array(buffer);

    for (let i=0; i<N; i++){
        for (let j=0; j<N; j++){
            let xi = vectorx[i],
                yj = vectory[j],
                zk = 0,
                iter = 0;
            for (; iter<maxIter; iter++){
                if (complex.abs2(xi, yj) >= inf){
                    break;
                } else {
                    zk = fn(xi, yj);
                    xi = zk.re;
                    yj = zk.im;
                }
            }
            let k = i + j*N;
            iters[k] = iter;
        }
    }
    return iters;
}

module.exports = {
    juliaMap: juliaMap
};
