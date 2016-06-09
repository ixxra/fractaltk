"use strict";

function vectorChunck(size){
    let SIZE = 8*size;//Double precision matrix buffer: 64bits = 8bytes.
    let buffer = new ArrayBuffer(SIZE);
    let view = new Float64Array(buffer);
    return view;
}

function vectorToArray(vector){
    return Array.prototype.slice.call(vector);
}

function linspace(xmin, xmax, N){
    let x = vectorChunck(N);
    let delta = (xmax - xmin)/(N - 1);
    let xi = xmin;

    for (var i=0; i<N; i++){
        x[i] = xi;
        xi += delta;
    }

    return x;
}

module.exports = {
    vector: vectorChunck,
    vectorToArray: vectorToArray,
    linspace: linspace
};
