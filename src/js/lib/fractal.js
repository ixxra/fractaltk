"use strict";

/**
Applies `fn` iteratively, until it reaches infinity or `maxIter` is reached.
@param fn: Complex function. It is expected to be of the form `(x, y)->{re, im}`.
@param vectorx, vectory: Numeric vectors with real and imaginary parts.
 `juliaMap` will make the cartesian product, and iterate the combinations
 `xi, yj`.
@param inf: Stop iteration if the *square* modulus of the return of `fn` rebases
 this parameter.
@maxIter: Stop if reached `maxIter` iterations.
@returns: if length of `vectorx` is N, returns an Int32Array of N*N representing
 the iteration number where repeated iterations of `fn(xi, yj)` escaped to
 `inf` or `maxIter` instead.
**/
function juliaMap(fn, vectorx, vectory, inf, maxIter){

}
