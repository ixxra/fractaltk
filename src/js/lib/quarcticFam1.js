"use strict";
var complex = require('./complex');



function fam1Generator(bx, by){
    let b2 = complex.pow2(bx, by); //b^2
    let b4 = complex.pow2(b2.re, b2.im);
    function f(x, y){
        let z2 = complex.pow2(x, y);//z^2
        let z4 = complex.pow2(z2.re, z2.im);//z^4
        let bx = bx/2;
        let by = by/2;
        let b4x = b4.re/4;
        let b4y = b4.im/4;
        let b2x = -b2.re/2;
        let b2y = -b2.im/2;
        let z = complex.cmult(b2x, b2y, z2x, z2y);
        z = complex.cadd(z.re, z.im, z4x, z4y);
        z = complex.cadd(z.re, z.im, b4x, b4y);
        z = complex.cadd(z.re, z.im, b2x, b2y);
        return z;
    }
    return f;
}

function juliaGen(cx, cy){
    function f(x, y){
        return {re: x*x - y*y + cx, im: 2*x*y + cy};
    }
    return f;
}


module.exports = {
    fam1Generator: fam1Generator,
    juliaGen: juliaGen
};
