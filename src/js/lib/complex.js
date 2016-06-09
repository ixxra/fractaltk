"use strict";

function cmult(x1,y1, x2, y2){
    let zx = x1*x2 - y1*y2;
    let zy = x1*y2 + y1*x2;
    return {re: zx, im: zy};
}

function cadd(x1, y1, x2, y2){
    let zx = x1 + x2;
    let zy = y1 + y2;
    return {re: zx, im: zy};
}


function cpow2(x, y){
    let zx = x*x - y*y;
    let zy = 2*x*y;
    return {re: zx, im: zy};
}

function abs2(x, y){
    return x*x + y*y;
}

module.exports = {
    cmult: cmult,
    cadd: cadd,
    cpow2: cpow2,
    abs2: abs2
};
