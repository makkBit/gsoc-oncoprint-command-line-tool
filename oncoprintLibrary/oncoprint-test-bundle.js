(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = require("./gl-matrix/common.js");
exports.mat2 = require("./gl-matrix/mat2.js");
exports.mat2d = require("./gl-matrix/mat2d.js");
exports.mat3 = require("./gl-matrix/mat3.js");
exports.mat4 = require("./gl-matrix/mat4.js");
exports.quat = require("./gl-matrix/quat.js");
exports.vec2 = require("./gl-matrix/vec2.js");
exports.vec3 = require("./gl-matrix/vec3.js");
exports.vec4 = require("./gl-matrix/vec4.js");
},{"./gl-matrix/common.js":2,"./gl-matrix/mat2.js":3,"./gl-matrix/mat2d.js":4,"./gl-matrix/mat3.js":5,"./gl-matrix/mat4.js":6,"./gl-matrix/quat.js":7,"./gl-matrix/vec2.js":8,"./gl-matrix/vec3.js":9,"./gl-matrix/vec4.js":10}],2:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    glMatrix.ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function(a, b) {
	return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

module.exports = glMatrix;

},{}],3:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
mat2.fromValues = function(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
mat2.set = function(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
mat2.sub = mat2.subtract;

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
mat2.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

module.exports = mat2;

},{"./common.js":2}],4:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
mat2d.fromValues = function(a, b, c, d, tx, ty) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
mat2d.set = function(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
};

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
mat2d.sub = mat2d.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
mat2d.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
};

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
};

module.exports = mat2d;

},{"./common.js":2}],5:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
};

/*
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
};


module.exports = mat3;

},{"./common.js":2}],6:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
  scalar: {},
  SIMD: {},
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function(out, a) {
    var a0, a1, a2, a3,
        tmp01, tmp23,
        out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0,  out0);
    SIMD.Float32x4.store(out, 4,  out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8,  out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function(out, a) {
  var row0, row1, row2, row3,
      tmp1,
      minor0, minor1, minor2, minor3,
      det,
      a0 = SIMD.Float32x4.load(a, 0),
      a1 = SIMD.Float32x4.load(a, 4),
      a2 = SIMD.Float32x4.load(a, 8),
      a3 = SIMD.Float32x4.load(a, 12);

  // Compute matrix adjugate
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  // Compute matrix determinant
  det   = SIMD.Float32x4.mul(row0, minor0);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
  det   = SIMD.Float32x4.sub(
               SIMD.Float32x4.add(tmp1, tmp1),
               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
  if (!det) {
      return null;
  }

  // Compute matrix inverse
  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
  return out;
}

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function(out, a) {
  var a0, a1, a2, a3;
  var row0, row1, row2, row3;
  var tmp1;
  var minor0, minor1, minor2, minor3;

  var a0 = SIMD.Float32x4.load(a, 0);
  var a1 = SIMD.Float32x4.load(a, 4);
  var a2 = SIMD.Float32x4.load(a, 8);
  var a3 = SIMD.Float32x4.load(a, 12);

  // Transpose the source matrix.  Sort of.  Not a true transpose operation
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  SIMD.Float32x4.store(out, 0,  minor0);
  SIMD.Float32x4.store(out, 4,  minor1);
  SIMD.Float32x4.store(out, 8,  minor2);
  SIMD.Float32x4.store(out, 12, minor3);
  return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                        SIMD.Float32x4.add(
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

    if (a !== out) {
        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function(out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(
        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(
        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(
        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) { 
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S; 
    out[2] = (mat[1] - mat[4]) / S; 
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S; 
    out[2] = (mat[8] + mat[2]) / S; 
  } else if (mat[5] > mat[10]) { 
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S; 
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S; 
  } else { 
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
};



module.exports = mat4;

},{"./common.js":2}],7:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");
var mat3 = require("./mat3.js");
var vec3 = require("./vec3.js");
var vec4 = require("./vec4.js");

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

module.exports = quat;

},{"./common.js":2,"./mat3.js":5,"./vec3.js":9,"./vec4.js":10}],8:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

module.exports = vec2;

},{"./common.js":2}],9:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
};

module.exports = vec3;

},{"./common.js":2}],10:[function(require,module,exports){
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = require("./common.js");

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

module.exports = vec4;

},{"./common.js":2}],11:[function(require,module,exports){
var CachedProperty = (function() {
    function CachedProperty(init_val, updateFn) {
	this.value = init_val;
	this.updateFn = updateFn;
	this.bound_properties = [];
    }
    CachedProperty.prototype.update = function() {
	this.value = this.updateFn.apply(null, arguments);
	for (var i=0; i<this.bound_properties.length; i++) {
	    this.bound_properties[i].update();
	}
    }
    CachedProperty.prototype.get = function() {
	return this.value;
    }
    CachedProperty.prototype.updateAndGet = function() {
	this.update();
	return this.get();
    }
    CachedProperty.prototype.addBoundProperty = function(cached_property) {
	this.bound_properties.push(cached_property);
    };
    return CachedProperty;
})();

module.exports = CachedProperty;
},{}],12:[function(require,module,exports){
module.exports = function(array, target_key, keyFn, return_closest_if_not_found) {
    var upper_excl = array.length;
    var lower_incl = 0;
    var middle;
    while (lower_incl < upper_excl) {
	middle = Math.floor((upper_excl + lower_incl) / 2);
	var middle_key = keyFn(array[middle]);
	if (middle_key === target_key) {
	    return middle;
	} else if (target_key > middle_key) {
	    lower_incl = middle + 1;
	} else if (target_key < middle_key) {
	    upper_excl = middle;
	}
    }
    if (return_closest_if_not_found) {
	return lower_incl-1;
    } else {
	return null;
    }
}
},{}],13:[function(require,module,exports){
module.exports = function (tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
	if (attrs.hasOwnProperty(k)) {
	    el.setAttribute(k, attrs[k]);
	}
    }
    return el;
};
},{}],14:[function(require,module,exports){
var OncoprintModel = require('./oncoprintmodel.js');
var OncoprintWebGLCellView = require('./oncoprintwebglcellview.js');
var OncoprintLabelView = require('./oncoprintlabelview.js');
var OncoprintRuleSet = require('./oncoprintruleset.js');
var OncoprintTrackOptionsView = require('./oncoprinttrackoptionsview.js');
var OncoprintLegendView = require('./oncoprintlegendrenderer.js');//TODO: rename
var OncoprintToolTip = require('./oncoprinttooltip.js');
var OncoprintTrackInfoView = require('./oncoprinttrackinfoview.js');
var OncoprintMinimapView = require('./oncoprintminimapview.js');

var svgfactory = require('./svgfactory.js');

var clamp = function(val, lower, upper) {
    return Math.min(Math.max(val, lower), upper);
};

var Oncoprint = (function () {
    // this is the controller
    var nextTrackId = (function () {
	var ctr = 0;
	return function () {
	    ctr += 1;
	    return ctr;
	}
    })();
    function Oncoprint(ctr_selector, width) {
	var self = this;
	this.ctr_selector = ctr_selector;
	
	var $ctr = $('<span></span>').css({'position':'relative', 'display':'inline-block'}).appendTo(ctr_selector);
	var $oncoprint_ctr = $('<div></div>')
			    .css({'position':'relative', 'display':'inline-block'})
			    .appendTo($ctr);
		    
	var $tooltip_ctr = $('<span></span>').css({'position':'absolute'}).appendTo(ctr_selector);
	var $legend_ctr = $('<div></div>').css({'position':'absolute', 'display':'inline-block', 'top':0, 'left':0, 'min-height':1})
			    .appendTo($ctr);
	
	var $label_canvas = $('<canvas></canvas>')
			    .css({'display':'inline-block', 
				'position':'absolute', 
				'left':'0px', 
				'top':'0px'})
			    .addClass("noselect")
			    .attr({'width':'150', 'height':'250'});
		    
	var $track_options_div = $('<div></div>')
				.css({'position':'absolute', 
					'left':'150px', 
					'top':'0px'})
				.addClass("noselect")
				.attr({'width':'50', 'height':'250'});
			
	var $legend_div = $('<div></div>')
			    .css({'position':'absolute', 
				    'top':'250px',
				    'min-height':1})
			    .addClass("noselect");
	
	var $cell_div = $('<div>')
			.css({'width':width,
			    'display':'inline-block', 
			    'position':'absolute', 
			    'left':'200px', 
			    'top':'0px'})
			.addClass("noselect");
		
	var $cell_canvas = $('<canvas></canvas>')
			    .attr('width', width)
			    .css({'position':'absolute', 'top':'0px', 'left':'0px'})
			    .addClass("noselect");
		    
	var $dummy_scroll_div = $('<div>')
				.css({'position':'absolute',
				    'overflow-x':'scroll',
				    'overflow-y':'scroll',
				    'top':'0', 
				    'left':'0px', 
				    'height':'1px',
				});
	
	var $dummy_scroll_div_contents = $('<div>').appendTo($dummy_scroll_div);
				
	var $cell_overlay_canvas = $('<canvas></canvas>')
				    .attr('width', width)
				    .css({'position':'absolute', 
					    'top':'0px', 
					    'left':'0px'})
				    .addClass("noselect");
			    
	var $track_info_div = $('<div>')
				.css({'position':'absolute'});
			
	var $minimap_div = $('<div>').css({'position':'absolute', 'outline':'solid 1px black'}).addClass("noselect");
	
	var $minimap_canvas = $('<canvas></canvas>')
				    .attr('width', 300)
				    .attr('height', 300)
				    .css({'position':'absolute', 'top':'0px', 'left':'0px', 'z-index':0})
				    .addClass("noselect");
	var $minimap_overlay_canvas = $('<canvas></canvas>')
				    .attr('width', 300)
				    .attr('height', 300)
				    .css({'position': 'absolute', 'top':'0px', 'left':'0px', 'z-index':1})
				    .addClass("noselect");
	
	$label_canvas.appendTo($oncoprint_ctr);
	$cell_div.appendTo($oncoprint_ctr);
	$track_options_div.appendTo($oncoprint_ctr);
	$track_info_div.appendTo($oncoprint_ctr);
	
	$legend_div.appendTo($legend_ctr);

	$minimap_div.appendTo($ctr);
	
	$cell_canvas.appendTo($cell_div);
	$cell_overlay_canvas.appendTo($cell_div);
	$dummy_scroll_div.appendTo($cell_div);
	$dummy_scroll_div.on("mousemove mousedown mouseup", function(evt) {
	    $cell_overlay_canvas.trigger(evt);
	});
	$minimap_canvas.appendTo($minimap_div);
	$minimap_overlay_canvas.appendTo($minimap_div);
	
	this.$ctr = $ctr;
	this.$oncoprint_ctr = $oncoprint_ctr;
	this.$cell_div = $cell_div;
	this.$legend_div = $legend_div;
	this.$track_options_div = $track_options_div;
	this.$track_info_div = $track_info_div;
	this.$dummy_scroll_div = $dummy_scroll_div;
	this.$minimap_div = $minimap_div;
	
	
	
	this.$cell_canvas = $cell_canvas;
	this.$cell_overlay_canvas = $cell_overlay_canvas;
	
	this.model = new OncoprintModel();
	
	this.cell_view = new OncoprintWebGLCellView($cell_div, $cell_canvas, $cell_overlay_canvas, $dummy_scroll_div_contents, this.model, new OncoprintToolTip($tooltip_ctr), function(left, right) {
	    var enclosed_ids = self.model.getIdsInLeftInterval(left, right);
	    self.setHorzZoom(self.model.getHorzZoomToFit(self.cell_view.visible_area_width, enclosed_ids));
	    self.$dummy_scroll_div.scrollLeft(self.model.getZoomedColumnLeft(enclosed_ids[0]));
	    self.id_clipboard = enclosed_ids;
	});
	
	this.minimap_view = new OncoprintMinimapView($minimap_div, $minimap_canvas, $minimap_overlay_canvas, this.model, this.cell_view, 150, 150, function(x,y) {
	    self.setScroll(x,y);
	},
	function(vp) {
	    self.setViewport(vp.col,vp.scroll_y_proportion,vp.num_cols, vp.zoom_y);
	});
	
	this.track_options_view = new OncoprintTrackOptionsView($track_options_div,
								function(track_id) { 
								    // move up
								    var tracks = self.model.getContainingTrackGroup(track_id);
								    var index = tracks.indexOf(track_id);
								    if (index > 0) {
									var new_previous_track = null;
									if (index >= 2) {
									    new_previous_track = tracks[index-2];
									}
									self.moveTrack(track_id, new_previous_track);
								    }
								},
								function(track_id) {
								    // move down
								    var tracks = self.model.getContainingTrackGroup(track_id);
								    var index = tracks.indexOf(track_id);
								    if (index < tracks.length - 1) {
									self.moveTrack(track_id, tracks[index+1]);
								    }
								},
								function(track_id) { self.removeTrack(track_id); }, 
								function(track_id, dir) { self.setTrackSortDirection(track_id, dir); });
	this.track_info_view = new OncoprintTrackInfoView($track_info_div);
								
	//this.track_info_view = new OncoprintTrackInfoView($track_info_div);

	this.label_view = new OncoprintLabelView($label_canvas, this.model, new OncoprintToolTip($tooltip_ctr, {noselect: true}));
	this.label_view.setDragCallback(function(target_track, new_previous_track) {
	    self.moveTrack(target_track, new_previous_track);
	});
	
	this.legend_view = new OncoprintLegendView($legend_div, 10, 20);
	
	this.keep_sorted = false;
	
	this.keep_horz_zoomed_to_fit = false;
	this.keep_horz_zoomed_to_fit_ids = [];
	
	// We need to handle scrolling this way because for some reason huge 
	//  canvas elements have terrible resolution.
	var cell_view = this.cell_view;
	var model = this.model;
	
	this.target_dummy_scroll_left = 0;
	this.target_dummy_scroll_top = 0;
	
	(function setUpOncoprintScroll() {
	    $dummy_scroll_div.scroll(function (e) {
		var dummy_scroll_left = $dummy_scroll_div.scrollLeft();
		var dummy_scroll_top = $dummy_scroll_div.scrollTop();
		if (dummy_scroll_left !== self.target_dummy_scroll_left || dummy_scroll_top !== self.target_dummy_scroll_top) {
		    // In setDummyScrollDivScroll, where we intend to set the scroll programmatically without
		    //	triggering the handler, we set target_dummy_scroll_left and target_dummy_scroll_top,
		    //	so if they're not set (we get inside this block), then it's a user-triggered scroll.
		    //	
		    // Set oncoprint scroll to match
		    self.target_dummy_scroll_left = dummy_scroll_left;
		    self.target_dummy_scroll_top = dummy_scroll_top;
		    var maximum_dummy_scroll_div_scroll = maxDummyScrollDivScroll(oncoprint);
		    var maximum_div_scroll_left = maximum_dummy_scroll_div_scroll.left;
		    var maximum_div_scroll_top = maximum_dummy_scroll_div_scroll.top;
		    var scroll_left_prop = maximum_div_scroll_left > 0 ? dummy_scroll_left / maximum_div_scroll_left : 0;
		    var scroll_top_prop = maximum_div_scroll_top > 0 ? dummy_scroll_top / maximum_div_scroll_top : 0;
		    scroll_left_prop = clamp(scroll_left_prop, 0, 1);
		    scroll_top_prop = clamp(scroll_top_prop, 0, 1);
		    var maximum_scroll_left = maxOncoprintScrollLeft(self);
		    var maximum_scroll_top = maxOncoprintScrollTop(self);
		    var scroll_left = Math.round(maximum_scroll_left * scroll_left_prop);
		    var scroll_top = Math.round(maximum_scroll_top * scroll_top_prop);
		    self.keep_horz_zoomed_to_fit = false;
		    self.keep_horz_zoomed_to_fit_ids = [];

		    doSetScroll(self, scroll_left, scroll_top);
		}
	    });
	})();
	
	this.horz_zoom_callbacks = [];
	
	
	$(window).resize(function() {
	    resizeAndOrganize(self);
	});
	
	
	this.id_clipboard = [];
	this.clipboard_change_callbacks = [];
    }

    var _SetLegendTop = function (oncoprint) {
	if (oncoprint.model.rendering_suppressed_depth > 0) {
	    return;
	}
	oncoprint.$legend_div.css({'top': oncoprint.model.getCellViewHeight() + 30});
    };
    var setLegendTopAfterTimeout = function (oncoprint) {
	if (oncoprint.model.rendering_suppressed_depth > 0) {
	    return;
	}
	setTimeout(function () {
	    oncoprint.$ctr.css({'min-height': oncoprint.model.getCellViewHeight() + Math.max(oncoprint.$legend_div.outerHeight(), oncoprint.$minimap_div.outerHeight()) + 30});
	    _SetLegendTop(oncoprint);
	}, 0);
    };
    var resizeAndOrganize = function (oncoprint) {
	if (oncoprint.model.rendering_suppressed_depth > 0) {
	    return;
	}
	var ctr_width = $(oncoprint.ctr_selector).width();
	oncoprint.$track_options_div.css({'left': oncoprint.label_view.getWidth()});
	oncoprint.$track_info_div.css({'left': oncoprint.label_view.getWidth() + oncoprint.track_options_view.getWidth()});
	var cell_div_left = oncoprint.label_view.getWidth() + oncoprint.track_options_view.getWidth() + oncoprint.track_info_view.getWidth();
	oncoprint.$cell_div.css('left', cell_div_left);
	oncoprint.cell_view.setWidth(ctr_width - cell_div_left - 20, oncoprint.model);

	_SetLegendTop(oncoprint);
	oncoprint.$minimap_div.css({'top': oncoprint.model.getCellViewHeight() + 30, 'left': ctr_width - oncoprint.$minimap_div.outerHeight() - 10});
	oncoprint.legend_view.setWidth(ctr_width - oncoprint.$minimap_div.outerHeight() - 20, oncoprint.model);

	oncoprint.$ctr.css({'min-height': oncoprint.model.getCellViewHeight() + Math.max(oncoprint.$legend_div.outerHeight(), oncoprint.$minimap_div.outerHeight()) + 30,
	    'min-width': ctr_width});

	setTimeout(function () {
	    if (oncoprint.keep_horz_zoomed_to_fit) {
		updateHorzZoomToFit(oncoprint);
	    }
	}, 0);
    };

    var resizeAndOrganizeAfterTimeout = function (oncoprint) {
	if (oncoprint.model.rendering_suppressed_depth > 0) {
	    return;
	}
	setTimeout(function () {
	    resizeAndOrganize(oncoprint);
	}, 0);
    };
    
    var maxOncoprintScrollLeft = function(oncoprint) {
	return Math.max(0, oncoprint.model.getOncoprintWidth() - oncoprint.cell_view.getWidth());
    };
    
    var maxOncoprintScrollTop = function(oncoprint) {
	return Math.max(0, oncoprint.model.getOncoprintHeight() - oncoprint.model.getCellViewHeight());
    };
    
    var maxDummyScrollDivScroll = function(oncoprint) {
	var dummy_scroll_div_client_size = oncoprint.cell_view.getDummyScrollDivClientSize();
	var maximum_div_scroll_left = Math.max(0, (oncoprint.$dummy_scroll_div[0].scrollWidth - dummy_scroll_div_client_size.width));
	var maximum_div_scroll_top = Math.max(0, (oncoprint.$dummy_scroll_div[0].scrollHeight - dummy_scroll_div_client_size.height));
	return {'left': maximum_div_scroll_left, 'top': maximum_div_scroll_top};
    };
    
    Oncoprint.prototype.scrollTo = function(left) {
	this.$dummy_scroll_div.scrollLeft(left);
    }
    Oncoprint.prototype.onHorzZoom = function(callback) {
	this.horz_zoom_callbacks.push(callback);
    }
    Oncoprint.prototype.moveTrack = function(target_track, new_previous_track) {
	this.model.moveTrack(target_track, new_previous_track);
	this.cell_view.moveTrack(this.model);
	this.label_view.moveTrack(this.model);
	this.track_options_view.moveTrack(this.model);
	this.track_info_view.moveTrack(this.model);
	this.minimap_view.moveTrack(this.model, this.cell_view);
	
	if (this.keep_sorted) {
	    this.sort();
	}
	
	resizeAndOrganizeAfterTimeout(this);
    }
    
    Oncoprint.prototype.keepSorted = function(keep_sorted) {
	this.keep_sorted = (typeof keep_sorted === 'undefined' ? true : keep_sorted);
	if (this.keep_sorted) {
	    this.sort();
	}
    }
    
    Oncoprint.prototype.addTracks = function (params_list) {
	// Update model
	var track_ids = [];
	params_list = params_list.map(function (o) {
	    o.track_id = nextTrackId();
	    o.rule_set = OncoprintRuleSet(o.rule_set_params);
	    track_ids.push(o.track_id);
	    return o;
	});
	
	this.model.addTracks(params_list);
	// Update views
	this.cell_view.addTracks(this.model, track_ids);
	this.label_view.addTracks(this.model, track_ids);
	this.track_options_view.addTracks(this.model);
	this.track_info_view.addTracks(this.model);
	this.legend_view.addTracks(this.model);
	this.minimap_view.addTracks(this.model, this.cell_view);
	
	if (this.keep_sorted) {
	    this.sort();
	}
	resizeAndOrganizeAfterTimeout(this);
	return track_ids;
    }

    Oncoprint.prototype.removeTrack = function (track_id) {
	// Update model
	this.model.removeTrack(track_id);
	// Update views
	this.cell_view.removeTrack(this.model, track_id);
	this.label_view.removeTrack(this.model, track_id);
	this.track_options_view.removeTrack(this.model, track_id);
	this.track_info_view.removeTrack(this.model);
	this.legend_view.removeTrack(this.model);
	this.minimap_view.removeTrack(this.model, this.cell_view);
	
	if (this.keep_sorted) {
	    this.sort();
	}
	resizeAndOrganizeAfterTimeout(this);
    }
    
    Oncoprint.prototype.removeAllTracks = function() {
	var track_ids = this.model.getTracks();
	for (var i=0; i<track_ids.length; i++) {
	    this.removeTrack(track_ids[i]);
	}
    }

    Oncoprint.prototype.setHorzZoomToFit = function(ids) {
	this.keep_horz_zoomed_to_fit = true;
	this.keep_horz_zoomed_to_fit_ids = ids;
	updateHorzZoomToFit(this);
    }
    Oncoprint.prototype.updateHorzZoomToFitIds = function(ids) {
	this.keep_horz_zoomed_to_fit_ids = ids;
    }
    var updateHorzZoomToFit = function(oncoprint) {
	oncoprint.setHorzZoom(getHorzZoomToFit(oncoprint, oncoprint.keep_horz_zoomed_to_fit_ids));
    };
    var getHorzZoomToFit = function(oncoprint, ids) {
	ids = ids || [];
	return oncoprint.model.getHorzZoomToFit(oncoprint.cell_view.visible_area_width, ids);
    }
    var executeHorzZoomCallbacks = function(oncoprint) {
	for (var i=0; i<oncoprint.horz_zoom_callbacks.length; i++) {
	    oncoprint.horz_zoom_callbacks[i](oncoprint.model.getHorzZoom());
	}
    };
    
    Oncoprint.prototype.getHorzZoom = function () {
	return this.model.getHorzZoom();
    }
    
    Oncoprint.prototype.getMinZoom = function() {
	return this.model.getMinZoom();
    }

    Oncoprint.prototype.setHorzZoom = function (z) {
	this.keep_zoomed_to_fit = false;
	this.keep_zoomed_to_fit_ids = [];
	// Update model
	this.model.setHorzZoom(z);
	// Update views
	this.cell_view.setHorzZoom(this.model);
	this.minimap_view.setHorzZoom(this.model, this.cell_view);

	executeHorzZoomCallbacks(this);
	return this.model.getHorzZoom();
    }
    
    Oncoprint.prototype.getVertZoom = function () {
	return this.model.getVertZoom();
    }

    Oncoprint.prototype.setVertZoom = function (z) {
	// Update model
	this.model.setVertZoom(z);
	// Update views
	this.cell_view.setVertZoom(this.model, z);
	this.label_view.setVertZoom(this.model, z);
	this.track_info_view.setVertZoom(this.model);
	this.track_options_view.setVertZoom(this.model);
	this.minimap_view.setVertZoom(this.model, this.cell_view);
	
	resizeAndOrganizeAfterTimeout(this);
	return this.model.getVertZoom();
    }
    
    var doSetScroll = function(oncoprint, scroll_left, scroll_top) {
	// Update model
	scroll_left = Math.min(scroll_left, maxOncoprintScrollLeft(oncoprint));
	scroll_top = Math.min(scroll_top, maxOncoprintScrollTop(oncoprint));
	oncoprint.model.setScroll(scroll_left, scroll_top);
	// Update views
	
	oncoprint.cell_view.setScroll(oncoprint.model);
	oncoprint.label_view.setScroll(oncoprint.model);
	oncoprint.track_info_view.setScroll(oncoprint.model);
	oncoprint.track_options_view.setScroll(oncoprint.model);
	oncoprint.minimap_view.setScroll(oncoprint.model, oncoprint.cell_view);
    };
 
    var setDummyScrollDivScroll = function(oncoprint) {
	var scroll_left = oncoprint.model.getHorzScroll();
	var scroll_top = oncoprint.model.getVertScroll();
	
	var maximum_scroll_left = maxOncoprintScrollLeft(oncoprint);
	var maximum_scroll_top = maxOncoprintScrollTop(oncoprint);
	var onc_scroll_left_prop = maximum_scroll_left > 0 ? scroll_left/maximum_scroll_left : 0;
	var onc_scroll_top_prop = maximum_scroll_top > 0 ? scroll_top/maximum_scroll_top : 0;
	onc_scroll_left_prop = clamp(onc_scroll_left_prop, 0, 1);
	onc_scroll_top_prop = clamp(onc_scroll_top_prop, 0, 1);
	
	var maximum_dummy_scroll_div_scroll = maxDummyScrollDivScroll(oncoprint);
	var maximum_div_scroll_left = maximum_dummy_scroll_div_scroll.left;
	var maximum_div_scroll_top = maximum_dummy_scroll_div_scroll.top;
	
	oncoprint.target_dummy_scroll_left = Math.round(onc_scroll_left_prop * maximum_div_scroll_left);
	oncoprint.target_dummy_scroll_top = Math.round(onc_scroll_top_prop * maximum_div_scroll_top);
	oncoprint.$dummy_scroll_div.scrollLeft(oncoprint.target_dummy_scroll_left);
	oncoprint.$dummy_scroll_div.scrollTop(oncoprint.target_dummy_scroll_top);
    };
    
    Oncoprint.prototype.setScroll = function(scroll_left, scroll_top) {
	doSetScroll(this, scroll_left, scroll_top);
	setDummyScrollDivScroll(this);
    }
    
    Oncoprint.prototype.setZoom = function(zoom_x, zoom_y) {
	// Update model
	this.model.setZoom(zoom_x, zoom_y);
	// Update views
	this.cell_view.setZoom(this.model);
	this.label_view.setZoom(this.model);
	this.track_info_view.setZoom(this.model);
	this.track_options_view.setZoom(this.model);
	this.minimap_view.setZoom(this.model, this.cell_view);
    }
    
    Oncoprint.prototype.setHorzScroll = function(s) {
	// Update model
	this.model.setHorzScroll(Math.min(s, maxOncoprintScrollLeft(this)));
	// Update views
	this.cell_view.setHorzScroll(this.model);
	this.label_view.setHorzScroll(this.model);
	this.track_info_view.setHorzScroll(this.model);
	this.track_options_view.setHorzScroll(this.model);
	this.minimap_view.setHorzScroll(this.model, this.cell_view);
	
	return this.model.getHorzScroll();
    }
    Oncoprint.prototype.setVertScroll = function(s) {
	// Update model
	this.model.setVertScroll(Math.min(s, maxOncoprintScrollTop(this)));
	// Update views
	this.cell_view.setVertScroll(this.model);
	this.label_view.setVertScroll(this.model);
	this.track_info_view.setVertScroll(this.model);
	this.track_options_view.setVertScroll(this.model);
	this.minimap_view.setVertScroll(this.model, this.cell_view);
	
	return this.model.getVertScroll();
    }
    Oncoprint.prototype.setViewport = function(col, scroll_y_proportion, num_cols, zoom_y) {
	// Zoom
	var zoom_x = this.model.getHorzZoomToFitNumCols(this.cell_view.getWidth(), num_cols);
	this.setZoom(zoom_x, zoom_y);
	// Scroll
	var scroll_left = Math.min(col * (this.model.getCellWidth() + this.model.getCellPadding()), maxOncoprintScrollLeft(this));
	var scroll_top = Math.min(scroll_y_proportion*this.model.getOncoprintHeight(), maxOncoprintScrollTop(this));
	this.setScroll(scroll_left, scroll_top);
	
	executeHorzZoomCallbacks(this);
    }

    Oncoprint.prototype.getTrackData = function (track_id) {
	return this.model.getTrackData(track_id);
    }
    
    Oncoprint.prototype.getTrackDataIdKey = function(track_id) {
	return this.model.getTrackDataIdKey(track_id);
    }
    
    Oncoprint.prototype.setTrackData = function (track_id, data, data_id_key) {
	this.model.setTrackData(track_id, data, data_id_key);
	this.cell_view.setTrackData(this.model, track_id);
	this.legend_view.setTrackData(this.model);
	this.minimap_view.setTrackData(this.model, this.cell_view);
	
	if (this.keep_sorted) {
	    this.sort();
	}
	resizeAndOrganizeAfterTimeout(this);
    }

    Oncoprint.prototype.setTrackGroupSortPriority = function(priority) {
	this.model.setTrackGroupSortPriority(priority);
	this.cell_view.setTrackGroupSortPriority(this.model);
	
	if (this.keep_sorted) {
	    this.sort();
	}
	resizeAndOrganizeAfterTimeout(this);
    }

    Oncoprint.prototype.setTrackSortDirection = function(track_id, dir) {
	if (this.model.isTrackSortDirectionChangeable(track_id)) {
	    this.model.setTrackSortDirection(track_id, dir);
	    
	    if (this.keep_sorted) {
		this.sort();
	    }
	}
	return this.model.getTrackSortDirection(track_id);
    }
    
    Oncoprint.prototype.setTrackSortComparator = function(track_id, sortCmpFn) {
	this.model.setTrackSortComparator(track_id, sortCmpFn);
	if (this.keep_sorted) {
	    this.sort();
	}
    }
    
    Oncoprint.prototype.getTrackSortDirection = function(track_id) {
	return this.model.getTrackSortDirection(track_id);
    }
    
    Oncoprint.prototype.setTrackInfo = function(track_id, msg) {
	this.model.setTrackInfo(track_id, msg);
	this.track_info_view.setTrackInfo(this.model);
    }
    
    Oncoprint.prototype.setTrackTooltipFn = function(track_id, tooltipFn) {
	this.model.setTrackTooltipFn(track_id, tooltipFn);
    }
    
    Oncoprint.prototype.sort = function() {
	this.model.sort();
	this.cell_view.sort(this.model);
	this.minimap_view.sort(this.model, this.cell_view);
    }
    
    Oncoprint.prototype.shareRuleSet = function(source_track_id, target_track_id) {
	this.model.shareRuleSet(source_track_id, target_track_id);
	this.cell_view.shareRuleSet(this.model, target_track_id);
	this.legend_view.shareRuleSet(this.model);
	this.minimap_view.shareRuleSet(this.model, this.cell_view);
    }
    
    Oncoprint.prototype.setRuleSet = function(track_id, rule_set_params) {
	this.model.setRuleSet(track_id, OncoprintRuleSet(rule_set_params));
	this.cell_view.setRuleSet(this.model, track_id);
	this.legend_view.setRuleSet(this.model);
	this.minimap_view.setRuleSet(this.model, this.cell_view);
	resizeAndOrganizeAfterTimeout(this);
    }
    
    Oncoprint.prototype.setSortConfig = function(params) {
	this.model.setSortConfig(params);
	this.cell_view.setSortConfig(this.model);
	
	if (this.keep_sorted) {
	    this.sort();
	}
    }
    Oncoprint.prototype.setIdOrder = function(ids) {
	// Update model
	this.model.setIdOrder(ids);
	// Update views
	this.cell_view.setIdOrder(this.model, ids);
	this.minimap_view.setIdOrder(this.model, this.cell_view);
	
	if (this.keep_sorted) {
	    this.sort();
	}
    }
    
    Oncoprint.prototype.disableInteraction = function() {
	//this.label_view.disableInteraction();
	//this.cell_view.disableInteraction();
	this.track_options_view.disableInteraction();
	//this.track_info_view.disableInteraction();
	//this.legend_view.disableInteraction();
    }
    Oncoprint.prototype.enableInteraction = function() {
	//this.label_view.enableInteraction();
	//this.cell_view.enableInteraction();
	this.track_options_view.enableInteraction();
	//this.track_info_view.enableInteraction();
	//this.legend_view.enableInteraction();
    }
    Oncoprint.prototype.suppressRendering = function() {
	this.model.rendering_suppressed_depth += 1;
	this.label_view.suppressRendering();
	this.cell_view.suppressRendering();
	this.track_options_view.suppressRendering();
	this.track_info_view.suppressRendering();
	this.legend_view.suppressRendering();
	this.minimap_view.suppressRendering();
    }
    
    Oncoprint.prototype.releaseRendering = function() {
	this.model.rendering_suppressed_depth -= 1;
	this.model.rendering_suppressed_depth = Math.max(0, this.model.rendering_suppressed_depth);
	if (this.model.rendering_suppressed_depth === 0) {
	    this.label_view.releaseRendering(this.model);
	    this.cell_view.releaseRendering(this.model);
	    this.track_options_view.releaseRendering(this.model);
	    this.track_info_view.releaseRendering(this.model);
	    this.legend_view.releaseRendering(this.model);
	    this.minimap_view.releaseRendering(this.model, this.cell_view);
	    resizeAndOrganizeAfterTimeout(this);
	}
    }
    
    Oncoprint.prototype.hideIds = function(to_hide, show_others) {
	this.model.hideIds(to_hide, show_others);
	this.cell_view.hideIds(this.model);
	this.minimap_view.hideIds(this.model, this.cell_view);
    }
    
    Oncoprint.prototype.hideTrackLegends = function(track_ids) {
	track_ids = [].concat(track_ids);
	this.model.hideTrackLegends(track_ids);
	this.legend_view.hideTrackLegends(this.model);
	setLegendTopAfterTimeout(this);
    }
    
    Oncoprint.prototype.showTrackLegends = function(track_ids) {
	track_ids = [].concat(track_ids);
	this.model.showTrackLegends(track_ids);
	this.legend_view.showTrackLegends(this.model);
	setLegendTopAfterTimeout(this);
    }
    
    Oncoprint.prototype.setCellPaddingOn = function(cell_padding_on) {
	this.model.setCellPaddingOn(cell_padding_on);
	this.cell_view.setCellPaddingOn(this.model);
    }
    
    Oncoprint.prototype.toSVG = function(with_background) {
	// Returns svg DOM element
	var root = svgfactory.svg(10, 10);
	this.$ctr.append(root);
	var everything_group = svgfactory.group(0,0);
	root.appendChild(everything_group);
	
	var bgrect = svgfactory.bgrect(10,10,'#ffffff');
	
	if (with_background) {
	    everything_group.appendChild(bgrect);
	}
	
	var label_view_group = this.label_view.toSVGGroup(this.model, true, 0, 0);
	everything_group.appendChild(label_view_group);
	var track_info_group_x = label_view_group.getBBox().width + 30;
	var track_info_group = this.track_info_view.toSVGGroup(this.model, track_info_group_x, 0);
	everything_group.appendChild(track_info_group);
	var cell_view_group_x = track_info_group_x + track_info_group.getBBox().width + 10;
	everything_group.appendChild(this.cell_view.toSVGGroup(this.model, cell_view_group_x, 0));
	everything_group.appendChild(this.legend_view.toSVGGroup(this.model, 0, label_view_group.getBBox().y + label_view_group.getBBox().height+20));
	
	var everything_box = everything_group.getBBox();
	var everything_width = everything_box.x + everything_box.width;
	var everything_height = everything_box.y + everything_box.height;
	root.setAttribute('width', everything_width);
	root.setAttribute('height', everything_height);
	
	if (with_background) {
	    bgrect.setAttribute('width', everything_width);
	    bgrect.setAttribute('height', everything_height);
	}
	root.parentNode.removeChild(root);
	
	return root;
    }
    
    Oncoprint.prototype.toCanvas = function(callback, resolution) {
	// Returns data url, requires IE >= 11
	
	var MAX_CANVAS_SIDE = 8192;
	var svg = this.toSVG(true);
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	var width = parseInt(svg.getAttribute('width'), 10);
	var height = parseInt(svg.getAttribute('height'), 10);
	var canvas = document.createElement('canvas');
	
	resolution = resolution || 1;
	var truncated = width*resolution > MAX_CANVAS_SIDE || height*resolution > MAX_CANVAS_SIDE;
	canvas.setAttribute('width', Math.min(MAX_CANVAS_SIDE, width*resolution));
	canvas.setAttribute('height', Math.min(MAX_CANVAS_SIDE, height*resolution));
	
	var container = document.createElement("div");
	container.appendChild(svg);
	var svg_data_str = container.innerHTML;
	var svg_data_uri = "data:image/svg+xml;base64,"+window.btoa(svg_data_str);
	
	var ctx = canvas.getContext('2d');
	ctx.setTransform(resolution,0,0,resolution,0,0);
	var img = new Image();
	
	img.onload = function() {
	    ctx.drawImage(img, 0, 0);
	    callback(canvas, truncated);
	};
	img.onerror = function() {
	    console.log("IMAGE LOAD ERROR");
	};
	
	img.src = svg_data_uri;
	return img;
    }
    
    Oncoprint.prototype.getIdOrder = function(all) {
	return this.model.getIdOrder(all);
    }
    
    Oncoprint.prototype.setIdClipboardContents = function(array) {
	this.id_clipboard = array.slice();
	for (var i=0; i<this.clipboard_change_callbacks.length; i++) {
	    this.clipboard_change_callbacks[i](array);
	}
    }
    Oncoprint.prototype.getIdClipboardContents = function() {
	return this.id_clipboard.slice();
    }
    Oncoprint.prototype.onClipboardChange = function(callback) {
	this.clipboard_change_callbacks.push(callback);
    }
    
    return Oncoprint;
})();
module.exports = Oncoprint;
},{"./oncoprintlabelview.js":15,"./oncoprintlegendrenderer.js":16,"./oncoprintminimapview.js":17,"./oncoprintmodel.js":18,"./oncoprintruleset.js":19,"./oncoprinttooltip.js":23,"./oncoprinttrackinfoview.js":24,"./oncoprinttrackoptionsview.js":25,"./oncoprintwebglcellview.js":26,"./svgfactory.js":27}],15:[function(require,module,exports){
var svgfactory = require('./svgfactory.js');

var OncoprintLabelView = (function () {
    function OncoprintLabelView($canvas, model, tooltip) {
	var view = this;
	
	this.supersampling_ratio = 2;
	
	this.$canvas = $canvas;
	this.base_font_size = 14;
	this.model = model;
	this.tooltip = tooltip;
	this.tooltip.center = false;
	// stuff from model
	this.cell_tops = {};
	this.cell_tops_view_space = {};
	this.cell_heights = {};
	this.cell_heights_view_space = {};
	this.labels = {};
	this.track_descriptions = {};
	this.tracks = [];
	this.minimum_track_height = Number.POSITIVE_INFINITY;
	this.maximum_label_width = Number.NEGATIVE_INFINITY;
	
	this.maximum_label_length = 18;
	this.rendering_suppressed = false;
	
	setUpContext(this);
	
	(function setUpDragging(view) {
	    view.drag_callback = function(target_track, new_previous_track) {};
	    view.dragged_label_track_id = null;
	    view.drag_mouse_y = null;
	    
	    view.$canvas.on("mousedown", function(evt) {
		view.tooltip.hide();
		var track_id = isMouseOnLabel(view, evt.offsetY);
		if (track_id !== null && model.getContainingTrackGroup(track_id).length > 1) {
		    startDragging(view, track_id, evt.offsetY);
		}
	    });
	    
	    view.$canvas.on("mousemove", function(evt) {
		if (view.dragged_label_track_id !== null) {
		    var track_group = model.getContainingTrackGroup(view.dragged_label_track_id);
		    view.drag_mouse_y = Math.min(evt.pageY - view.$canvas.offset().top, view.track_tops[track_group[track_group.length-1]] + model.getTrackHeight(track_group[track_group.length-1]));
		    view.drag_mouse_y = Math.max(view.drag_mouse_y, view.track_tops[track_group[0]]-5);
		    renderAllLabels(view);
		} else {
		    var hovered_track = isMouseOnLabel(view, evt.pageY - view.$canvas.offset().top);
		    if (hovered_track !== null) {
			var tooltip_html_lines = [];
			var offset = view.$canvas.offset();   
			if (isNecessaryToShortenLabel(view, view.labels[hovered_track])) {
			    tooltip_html_lines.push('<b>'+view.labels[hovered_track]+'</b>');
			}
			var track_description = view.track_descriptions[hovered_track].replace("<", "&lt;").replace(">", "&gt;");
			if (track_description.length > 0) {
			    tooltip_html_lines.push(track_description);
			}
			if (model.getContainingTrackGroup(hovered_track).length > 1) {
			    view.$canvas.css('cursor', 'move');
			    tooltip_html_lines.push("<b>hold to drag</b>");
			}
			var tooltip_html = tooltip_html_lines.join("<br>");
			view.tooltip.fadeIn(200, renderedLabelWidth(view, view.labels[hovered_track]) + offset.left, view.cell_tops[hovered_track] + offset.top - view.scroll_y, tooltip_html);
		    } else {
			view.$canvas.css('cursor', 'auto');
			view.tooltip.hide();
		    }
		}
	    });
	    
	    view.$canvas.on("mouseup mouseleave", function(evt) {
		if (view.dragged_label_track_id !== null) {
		    var track_group = model.getContainingTrackGroup(view.dragged_label_track_id);
		    var previous_track_id = getLabelAboveMouseSpace(view, track_group, evt.offsetY, view.dragged_label_track_id);
		    stopDragging(view, previous_track_id);
		}
		view.tooltip.hide();
	    });
	})(this);
	
    }
    var renderedLabelWidth = function(view, label) {
	return view.ctx.measureText(shortenLabelIfNecessary(view, label)).width/view.supersampling_ratio;
    };
    var updateFromModel = function(view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.scroll_y = model.getVertScroll();
	view.track_tops = model.getZoomedTrackTops();
	view.cell_tops = model.getCellTops();
	view.cell_tops_view_space = {};
	view.cell_heights = {};
	view.tracks = model.getTracks();
	view.track_descriptions = {};
	
	view.ctx.font = 'bold '+view.getFontSize()+'px Arial';
	view.minimum_track_height = Number.POSITIVE_INFINITY;
	view.maximum_label_width = 0;
	for (var i=0; i<view.tracks.length; i++) {
	    view.minimum_track_height = Math.min(view.minimum_track_height, model.getTrackHeight(view.tracks[i]));
	    var shortened_label = shortenLabelIfNecessary(view, view.labels[view.tracks[i]]);
	    view.maximum_label_width = Math.max(view.maximum_label_width, view.ctx.measureText(shortened_label).width);
	    
	    view.cell_tops_view_space[view.tracks[i]] = view.cell_tops[view.tracks[i]]*view.supersampling_ratio;
	    view.track_descriptions[view.tracks[i]] = model.getTrackDescription(view.tracks[i]);
	    view.cell_heights[view.tracks[i]] = model.getCellHeight(view.tracks[i]);
	    view.cell_heights_view_space[view.tracks[i]] = view.cell_heights[view.tracks[i]]*view.supersampling_ratio;
	}
    }
    var setUpContext = function(view) {
	view.ctx = view.$canvas[0].getContext('2d');
	view.ctx.textAlign="start";
	view.ctx.textBaseline="middle";
    }
    var resizeAndClear = function(view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	var visible_height = model.getCellViewHeight();
	var visible_width = view.getWidth();
	view.$canvas[0].height = view.supersampling_ratio*visible_height;
	view.$canvas[0].width = view.supersampling_ratio*visible_width;
	view.$canvas[0].style.height = visible_height + 'px';
	view.$canvas[0].style.width = visible_width + 'px';
	setUpContext(view);
    }
    var isNecessaryToShortenLabel = function(view, label) {
	return label.length > view.maximum_label_length;
    };
    var shortenLabelIfNecessary = function(view, label) {
	if (isNecessaryToShortenLabel(view, label)) {
	    return label.substring(0, view.maximum_label_length-3) + '...';
	} else {
	    return label;
	}
    };
    var renderAllLabels = function(view) {
	if (view.rendering_suppressed) {
	    return;
	}
	var font_size = view.getFontSize();
	view.ctx.font = 'bold '+font_size +'px Arial';
	view.ctx.clearRect(0,0,view.$canvas[0].width,view.$canvas[0].height);
	view.ctx.fillStyle = 'black';
	var tracks = view.tracks;
	for (var i=0; i<tracks.length; i++) {
	    view.ctx.fillText(shortenLabelIfNecessary(view, view.labels[tracks[i]]), 0, view.cell_tops_view_space[tracks[i]] + view.cell_heights_view_space[tracks[i]]/2 - view.scroll_y*view.supersampling_ratio);
	}
	if (view.dragged_label_track_id !== null) {
	    view.ctx.fillStyle = 'rgba(255,0,0,0.95)';
	    view.ctx.fillText(shortenLabelIfNecessary(view, view.labels[view.dragged_label_track_id]), 0, view.supersampling_ratio*view.drag_mouse_y);
	    view.ctx.fillStyle = 'rgba(0,0,0,0.15)';
	    var group = view.model.getContainingTrackGroup(view.dragged_label_track_id);
	    var label_above_mouse = getLabelAboveMouseSpace(view, group, view.drag_mouse_y, null);
	    var label_below_mouse = getLabelBelowMouseSpace(view, group, view.drag_mouse_y, null);
	    var rect_y, rect_height;
	    if (label_above_mouse === view.dragged_label_track_id || label_below_mouse === view.dragged_label_track_id) {
		return;
	    }
	    if (label_above_mouse !== null && label_below_mouse !== null) {
		rect_y = view.cell_tops_view_space[label_above_mouse] + view.cell_heights_view_space[label_above_mouse];
		rect_height = view.cell_tops_view_space[label_below_mouse] - rect_y;
	    } else if (label_above_mouse === null) {
		rect_y = view.cell_tops_view_space[group[0]] - view.ctx.measureText("m").width;
		rect_height = view.ctx.measureText("m").width;
	    } else if (label_below_mouse === null) {
		rect_y = view.cell_tops_view_space[group[group.length-1]] + view.cell_heights_view_space[group[group.length-1]];
		rect_height = view.ctx.measureText("m").width;
	    }
	    view.ctx.fillRect(0, rect_y - view.scroll_y*view.supersampling_ratio, view.getWidth()*view.supersampling_ratio, rect_height);
	}
    }
    
    var isMouseOnLabel = function(view, mouse_y) {
	var candidate_track = getLabelAboveMouseSpace(view, view.tracks, mouse_y, null);
	if (candidate_track === null) {
	    return null;
	}
	if (mouse_y <= view.cell_tops[candidate_track] - view.scroll_y + view.cell_heights[candidate_track]) {
	    return candidate_track;
	} else {
	    return null;
	}
    }
    var getLabelAboveMouseSpace = function(view, track_ids, y, track_to_exclude) {
	if (y < view.cell_tops[track_ids[0]] - view.scroll_y) {
	    return null;
	} else {
	    var candidate_track = null;
	    for (var i=0; i<track_ids.length; i++) {
		if (track_to_exclude !== null && track_to_exclude === track_ids[i]) {
		    continue;
		}
		if (view.cell_tops[track_ids[i]] - view.scroll_y > y) {
		    break;
		} else {
		    candidate_track = track_ids[i];
		}
	    }
	    return candidate_track;
	}
    }
    var getLabelBelowMouseSpace = function(view, track_ids, y, track_to_exclude) {
	if (y > view.cell_tops[track_ids[track_ids.length-1]] - view.scroll_y) {
	    return null;
	} else {
	    var candidate_track = null;
	    for (var i=track_ids.length-1; i>=0; i--) {
		if (track_to_exclude !== null && track_to_exclude === track_ids[i]) {
		    continue;
		}
		if (view.cell_tops[track_ids[i]] - view.scroll_y < y) {
		    break;
		} else {
		    candidate_track = track_ids[i];
		}
	    }
	    return candidate_track;
	}
    }
    
    var startDragging = function(view, track_id, mouse_y) {
	view.dragged_label_track_id = track_id;
	view.drag_mouse_y = mouse_y;
	renderAllLabels(view);
    }
    var stopDragging = function(view, new_previous_track_id) {
	view.drag_callback(view.dragged_label_track_id, new_previous_track_id);
	view.dragged_label_track_id = null;
	renderAllLabels(view);
    }
    OncoprintLabelView.prototype.getWidth = function() {
	//return this.maximum_label_width + 20;
	return Math.max(this.maximum_label_width/this.supersampling_ratio + 10, 70);
    }
    OncoprintLabelView.prototype.getFontSize = function(no_supersampling_adjustment) {
	return (no_supersampling_adjustment ? 1 : this.supersampling_ratio) * Math.max(Math.min(this.base_font_size, this.minimum_track_height), 7);
    }
    OncoprintLabelView.prototype.setDragCallback = function(callback) {
	this.drag_callback = callback;
    }
    OncoprintLabelView.prototype.removeTrack = function (model, track_id) {
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this, model);
    }
    OncoprintLabelView.prototype.moveTrack = function (model) {
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this, model);
    }
    OncoprintLabelView.prototype.addTracks = function (model, track_ids) {
	for (var i=0; i<track_ids.length; i++) {
	    this.labels[track_ids[i]] = model.getTrackLabel(track_ids[i]);
	}
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this, model);
    }
    
    OncoprintLabelView.prototype.setScroll = function(model) {
	this.setVertScroll(model);
    }
    
    OncoprintLabelView.prototype.setHorzScroll = function(model) {
    }
    
    OncoprintLabelView.prototype.setViewport = function(model) {
	this.setVertScroll(model);
    }
    
    OncoprintLabelView.prototype.setVertScroll = function(model) {
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this, model);
    }
    
    OncoprintLabelView.prototype.setVertZoom = function(model) {
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this, model);
    }
    
    OncoprintLabelView.prototype.setZoom = function(model) {
	this.setVertZoom(model);
    }
    
    OncoprintLabelView.prototype.suppressRendering = function() {
	this.rendering_suppressed = true;
    }
    
    OncoprintLabelView.prototype.releaseRendering = function(model) {
	this.rendering_suppressed = false;
	updateFromModel(this, model);
	resizeAndClear(this, model);
	renderAllLabels(this);
    }
    
    OncoprintLabelView.prototype.toSVGGroup = function(model, full_labels, offset_x, offset_y) {
	var root = svgfactory.group((offset_x || 0), (offset_y || 0));
	var cell_tops = model.getCellTops();
	var tracks = model.getTracks();
	for (var i=0; i<tracks.length; i++) {
	    var track_id = tracks[i];
	    var y = cell_tops[track_id] + model.getCellHeight(track_id)/2;
	    var label = model.getTrackLabel(track_id);
	    var text_elt = svgfactory.text((full_labels ? label : shortenLabelIfNecessary(this, label)), 0, y, this.getFontSize(true), 'Arial', 'bold', "bottom"); 
	    text_elt.setAttribute("dy", "0.35em");
	    root.appendChild(text_elt);
	}
	return root;
    }

    return OncoprintLabelView;
})();

module.exports = OncoprintLabelView;
},{"./svgfactory.js":27}],16:[function(require,module,exports){
var svgfactory = require('./svgfactory.js');

var nodeIsVisible = function(node) {
    var ret = true;
    while (node.tagName.toLowerCase() !== "html") {
	if ($(node).css('display') === 'none') {
	    ret = false;
	    break;
	}
	node = node.parentNode;
    }
    return ret;
};

var OncoprintLegendView = (function() {
    function OncoprintLegendView($div, base_width, base_height) {
	this.$div = $div;
	this.$svg = $(svgfactory.svg(200,200)).appendTo(this.$div);
	this.base_width = base_width;
	this.base_height = base_height;
	this.rendering_suppressed = false;
	
	this.width = $div.width();
	
	this.rule_set_label_config = {
	    weight: 'bold',
	    size: 12,
	    font: 'Arial'
	};
	this.rule_label_config = {
	    weight: 'normal',
	    size: 12,
	    font: 'Arial'
	};
	
	this.padding_after_rule_set_label = 10;
	this.padding_between_rules = 20;
	this.padding_between_rule_set_rows = 10;
    }
    
    var renderLegend = function(view, model, target_svg, show_all) {
	if (view.rendering_suppressed) {
	    return;
	}
	if (typeof target_svg === 'undefined') {
	    target_svg = view.$svg[0];
	}
	if (!nodeIsVisible(target_svg)) {
	    return;
	}
	$(target_svg).empty();
	
	var everything_group = svgfactory.group(0,0);
	target_svg.appendChild(everything_group);
	
	var rule_sets = model.getRuleSets();
	var y = 0;
	var rule_start_x = 200;
	for (var i=0; i<rule_sets.length; i++) {
	    if (rule_sets[i].exclude_from_legend && !show_all) {
		continue;
	    }
	    var rule_set_group = svgfactory.group(0,y);
	    everything_group.appendChild(rule_set_group);
	    (function addLabel() {
		if ((typeof rule_sets[i].legend_label !== 'undefined') && rule_sets[i].legend_label.length > 0) {
		    var label = svgfactory.text(rule_sets[i].legend_label, 0, 0, 12, 'Arial', 'bold');
		    rule_set_group.appendChild(label);
		    svgfactory.wrapText(label, rule_start_x);
		}
	    })();
	    
	    var x = rule_start_x + view.padding_after_rule_set_label;
	    var in_group_y_offset = 0;
	    
	    var rules = model.getActiveRules(rule_sets[i].rule_set_id);
	    for (var j=0; j<rules.length; j++) {
		var rule = rules[j].rule;
		if (rule.exclude_from_legend) {
		    continue;
		}
		var group = ruleToSVGGroup(rule, view, model, target_svg);
		group.setAttribute('transform', 'translate('+x+','+in_group_y_offset+')');
		rule_set_group.appendChild(group);
		if (x + group.getBBox().width > view.width) {
		    x = rule_start_x + view.padding_after_rule_set_label;
		    in_group_y_offset = rule_set_group.getBBox().height + view.padding_between_rule_set_rows;
		    group.setAttribute('transform', 'translate('+x+','+in_group_y_offset+')');
		}
		x += group.getBBox().width;
		x += view.padding_between_rules;
	    }
	    y += rule_set_group.getBBox().height;
	    y += 3*view.padding_between_rule_set_rows;
	}
	var everything_box = everything_group.getBBox();
	view.$svg[0].setAttribute('width', everything_box.width);
	view.$svg[0].setAttribute('height', everything_box.height);
    };
    
    var ruleToSVGGroup = function(rule, view, model, target_svg) {
	var root = svgfactory.group(0,0);
	var config = rule.getLegendConfig();
	if (config.type === 'rule') {
	    var concrete_shapes = rule.apply(config.target, model.getCellWidth(true), view.base_height);
	    for (var i=0; i<concrete_shapes.length; i++) {
		root.appendChild(svgfactory.fromShape(concrete_shapes[i], 0, 0));
	    }
	    if (typeof rule.legend_label !== 'undefined') {
		var font_size = 12;
		var text_node = svgfactory.text(rule.legend_label, model.getCellWidth(true) + 5, view.base_height/2, font_size, 'Arial', 'normal');
		target_svg.appendChild(text_node);
		var height = text_node.getBBox().height;
		text_node.setAttribute('y', parseFloat(text_node.getAttribute('y')) - height/2);
		target_svg.removeChild(text_node);
		root.appendChild(text_node);
	    }
	} else if (config.type === 'number') {
	    var num_decimal_digits = 2;
	    var display_range = config.range.map(function(x) {
		var num_digit_multiplier = Math.pow(10, num_decimal_digits);
		return Math.round(x * num_digit_multiplier) / num_digit_multiplier;
	    });
	    root.appendChild(svgfactory.text(display_range[0], 0, 0, 12, 'Arial', 'normal'));
	    root.appendChild(svgfactory.text(display_range[1], 50, 0, 12, 'Arial', 'normal'));
	    var mesh = 100;
	    var points = [];
	    points.push([5, 20]);
	    for (var i=0; i<mesh; i++) {
		var t = i/mesh;
		var h = config.interpFn((1-t)*config.range[0] + t*config.range[1]);
		var height = 20*h;
		points.push([5 + 40*i/mesh, 20-height]);
	    }
	    points.push([45, 20]);
	    root.appendChild(svgfactory.path(points, config.color, config.color));
	}
	return root;
    };
    
    OncoprintLegendView.prototype.setWidth = function(w, model) {
	this.width = w;
	renderLegend(this, model);
    }
    OncoprintLegendView.prototype.removeTrack = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.addTracks = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.setTrackData = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.shareRuleSet = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.setRuleSet = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.hideTrackLegends = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.showTrackLegends = function(model) {
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.suppressRendering = function() {
	this.rendering_suppressed = true;
    }
    
    OncoprintLegendView.prototype.releaseRendering = function(model) {
	this.rendering_suppressed = false;
	renderLegend(this, model);
    }
    
    OncoprintLegendView.prototype.toSVGGroup = function(model, offset_x, offset_y) {
	var root = svgfactory.group((offset_x || 0), (offset_y || 0));
	this.$svg.append(root);
	renderLegend(this, model, root, true);
	root.parentNode.removeChild(root);
	return root;
    }
    
    return OncoprintLegendView;
})();

module.exports = OncoprintLegendView;
},{"./svgfactory.js":27}],17:[function(require,module,exports){
var gl_matrix = require('gl-matrix');

var arrayFindIndex = function (arr, callback, start_index) {
    start_index = start_index || 0;
    for (var i = start_index; i < arr.length; i++) {
	if (callback(arr[i])) {
	    return i;
	}
    }
    return -1;
};

var getWebGLCanvasContext = function (view) {
    try {
	var canvas = view.$canvas[0];
	var ctx = canvas.getContext("experimental-webgl", {alpha: false, antialias: true});
	ctx.clearColor(1.0, 1.0, 1.0, 1.0);
	ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
	ctx.viewportWidth = canvas.width;
	ctx.viewportHeight = canvas.height;
	ctx.viewport(0, 0, ctx.viewportWidth, ctx.viewportHeight);
	ctx.enable(ctx.DEPTH_TEST);
	ctx.enable(ctx.BLEND);
	ctx.blendEquation(ctx.FUNC_ADD);
	ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
	ctx.depthMask(false);

	return ctx;
    } catch (e) {
	return null;
    }
};
var createShaderProgram = function (view, vertex_shader, fragment_shader) {
    var program = view.ctx.createProgram();
    view.ctx.attachShader(program, vertex_shader);
    view.ctx.attachShader(program, fragment_shader);

    view.ctx.linkProgram(program);

    var success = view.ctx.getProgramParameter(program, view.ctx.LINK_STATUS);
    if (!success) {
	var msg = view.ctx.getProgramInfoLog(program);
	view.ctx.deleteProgram(program);
	throw "Unable to link shader program: " + msg;
    }

    return program;
};
var createShader = function (view, source, type) {
    var shader = view.ctx.createShader(view.ctx[type]);
    view.ctx.shaderSource(shader, source);
    view.ctx.compileShader(shader);

    var success = view.ctx.getShaderParameter(shader, view.ctx.COMPILE_STATUS);
    if (!success) {
	var msg = view.ctx.getShaderInfoLog(shader);
	view.ctx.deleteShader(shader);
	throw "Unable to compile shader: " + msg;
    }

    return shader;
};
var getWebGLContextAndSetUpMatrices = function (view) {
    view.ctx = getWebGLCanvasContext(view);
    (function initializeMatrices(self) {
	var mvMatrix = gl_matrix.mat4.create();
	gl_matrix.mat4.lookAt(mvMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
	self.mvMatrix = mvMatrix;

	var pMatrix = gl_matrix.mat4.create();
	gl_matrix.mat4.ortho(pMatrix, 0, self.ctx.viewportWidth, self.ctx.viewportHeight, 0, -5, 1000); // y axis inverted so that y increases down like SVG
	self.pMatrix = pMatrix;
    })(view);
};
var getWebGLContextAndSetUpMatricesAndShaders = function (view) {
    getWebGLContextAndSetUpMatrices(view);
    (function initializeShaders(self) {// Initialize shaders
	var vertex_shader_source = ['attribute vec3 aVertexPosition;',
	    'attribute vec4 aVertexColor;',
	    'attribute float aVertexOncoprintColumn;',
	    'uniform float columnWidth;',
	    'uniform float zoomX;',
	    'uniform float zoomY;',
	    'uniform mat4 uMVMatrix;',
	    'uniform mat4 uPMatrix;',
	    'uniform float offsetY;',
	    'varying vec4 vColor;',
	    'void main(void) {',
	    '	gl_Position = vec4(aVertexPosition, 1.0);',
	    '	gl_Position[0] += aVertexOncoprintColumn * columnWidth;',
	    '	gl_Position[1] += offsetY;',
	    '	gl_Position *= vec4(zoomX, zoomY, 1.0, 1.0);',
	    '	gl_Position = uPMatrix * uMVMatrix * gl_Position;',
	    '	vColor = aVertexColor;',
	    '}'].join('\n');
	var fragment_shader_source = ['precision mediump float;',
	    'varying vec4 vColor;',
	    '',
	    'void main(void) {',
	    '   gl_FragColor = vColor;',
	    '}'].join('\n');
	var vertex_shader = createShader(self, vertex_shader_source, 'VERTEX_SHADER');
	var fragment_shader = createShader(self, fragment_shader_source, 'FRAGMENT_SHADER');

	var shader_program = createShaderProgram(self, vertex_shader, fragment_shader);
	shader_program.vertexPositionAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexPosition');
	self.ctx.enableVertexAttribArray(shader_program.vertexPositionAttribute);
	shader_program.vertexColorAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexColor');
	self.ctx.enableVertexAttribArray(shader_program.vertexColorAttribute);
	shader_program.vertexOncoprintColumnAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexOncoprintColumn');
	self.ctx.enableVertexAttribArray(shader_program.vertexOncoprintColumnAttribute);

	shader_program.pMatrixUniform = self.ctx.getUniformLocation(shader_program, 'uPMatrix');
	shader_program.mvMatrixUniform = self.ctx.getUniformLocation(shader_program, 'uMVMatrix');
	shader_program.columnWidthUniform = self.ctx.getUniformLocation(shader_program, 'columnWidth');
	shader_program.zoomXUniform = self.ctx.getUniformLocation(shader_program, 'zoomX');
	shader_program.zoomYUniform = self.ctx.getUniformLocation(shader_program, 'zoomY');
	shader_program.offsetYUniform = self.ctx.getUniformLocation(shader_program, 'offsetY');

	self.shader_program = shader_program;
    })(view);
};

var clamp = function(x, lower, upper) {
    return Math.max(lower, Math.min(upper, x));
};

var OncoprintMinimapView = (function () {

    function OncoprintMinimapView($div, $canvas, $overlay_canvas, model, cell_view, width, height, drag_callback, viewport_callback) {
	this.$div = $div;
	this.$canvas = $canvas;
	this.$overlay_canvas = $overlay_canvas;

	this.padding = 4;
	this.$div.css({'min-width': width + 2*this.padding, 'min-height': height + 2*this.padding,
			'outline':'solid 1px black', 'background-color':'#777777'});
	this.$canvas[0].width = width;
	this.$canvas[0].height = height;
	this.$canvas.css({'top': this.padding, 'left':this.padding});
	this.$overlay_canvas[0].width = width;
	this.$overlay_canvas[0].height = width;
	this.$overlay_canvas.css({'top': this.padding, 'left':this.padding, 'outline':'solid 1px #444444'});
	getWebGLContextAndSetUpMatricesAndShaders(this);
	this.overlay_ctx = $overlay_canvas[0].getContext("2d");

	this.img = new Image();
	this.current_rect = {'top': 0, 'left': 0, 'width': 0, 'height': 0, 'col':0, 'num_cols':0};

	var self = this;
	this.img.onload = function () {
	    self.ctx.drawImage(img, 0, 0);
	};

	// Set up dragging
	var resize_hit_zone = 5;
	var mouseInRectDragZone = function (x, y) {
	    return ((x >= self.current_rect.left + resize_hit_zone) &&
		    (x <= self.current_rect.left + self.current_rect.width - resize_hit_zone) &&
		    (y >= self.current_rect.top + resize_hit_zone) &&
		    (y <= self.current_rect.top + self.current_rect.height - resize_hit_zone));
	};
	var mouseInsideRectHitZone = function(x,y) {
	    return (x >= self.current_rect.left - resize_hit_zone) && 
		    (x <= self.current_rect.left + self.current_rect.width + resize_hit_zone) &&
		    (y >= self.current_rect.top - resize_hit_zone) && 
		    (y <= self.current_rect.top + self.current_rect.height + resize_hit_zone);
	};
	var mouseInRightHorzResizeZone = function (x,y) {
	    return !mouseInTopLeftResizeZone(x,y) && !mouseInTopRightResizeZone(x,y) &&
		    !mouseInBottomLeftResizeZone(x,y) && !mouseInBottomRightResizeZone(x,y) &&
		    mouseInsideRectHitZone(x,y) &&
		    (Math.abs(x - (self.current_rect.left + self.current_rect.width)) < resize_hit_zone);
	};
	var mouseInLeftHorzResizeZone = function (x,y) {
	    return !mouseInTopLeftResizeZone(x,y) && !mouseInTopRightResizeZone(x,y) &&
		    !mouseInBottomLeftResizeZone(x,y) && !mouseInBottomRightResizeZone(x,y) &&
		    mouseInsideRectHitZone(x,y) &&
		    (Math.abs(x - self.current_rect.left) < resize_hit_zone);
	};
	var mouseInTopVertResizeZone = function (x,y) {
	    return !mouseInTopLeftResizeZone(x,y) && !mouseInTopRightResizeZone(x,y) &&
		    !mouseInBottomLeftResizeZone(x,y) && !mouseInBottomRightResizeZone(x,y) &&
		    mouseInsideRectHitZone(x,y) &&
		    (Math.abs(y - self.current_rect.top) < resize_hit_zone);
	};
	var mouseInBottomVertResizeZone = function (x, y) {
	    return !mouseInTopLeftResizeZone(x, y) && !mouseInTopRightResizeZone(x, y) &&
		    !mouseInBottomLeftResizeZone(x, y) && !mouseInBottomRightResizeZone(x, y) &&
		    mouseInsideRectHitZone(x,y) &&
		    (Math.abs(y - (self.current_rect.top + self.current_rect.height)) < resize_hit_zone);
	};
	var mouseInTopLeftResizeZone = function(x,y) {
	    return (Math.abs(y - self.current_rect.top) < resize_hit_zone) &&
		    (Math.abs(x - self.current_rect.left) < resize_hit_zone);
	};
	var mouseInBottomLeftResizeZone = function(x,y) {
	    return (Math.abs(y - (self.current_rect.top + self.current_rect.height)) < resize_hit_zone) &&
		    (Math.abs(x - self.current_rect.left) < resize_hit_zone);
	};
	var mouseInTopRightResizeZone = function(x,y) {
	    return (Math.abs(y - self.current_rect.top) < resize_hit_zone) &&
		    (Math.abs(x - (self.current_rect.left + self.current_rect.width)) < resize_hit_zone);
	};
	var mouseInBottomRightResizeZone = function(x,y) {
	    return (Math.abs(y - (self.current_rect.top + self.current_rect.height)) < resize_hit_zone) &&
		    (Math.abs(x - (self.current_rect.left + self.current_rect.width)) < resize_hit_zone);
	};
	
	this.resize_hover = false;
	var updateRectResizeHoverLocation = function(x,y) {
	    if (typeof x === "undefined") {
		self.resize_hover = false;
	    } else {
		if (mouseInRightHorzResizeZone(x, y)) {
		    self.resize_hover = "r";
		} else if (mouseInLeftHorzResizeZone(x, y)) {
		    self.resize_hover = "l";
		} else if (mouseInTopVertResizeZone(x, y)) {
		    self.resize_hover = "t";
		} else if (mouseInBottomVertResizeZone(x, y)) {
		    self.resize_hover = "b";
		} else if (mouseInTopLeftResizeZone(x, y)) {
		    self.resize_hover = "tl";
		} else if (mouseInBottomRightResizeZone(x, y)) {
		    self.resize_hover = "br";
		} else if (mouseInBottomLeftResizeZone(x, y)) {
		    self.resize_hover = "bl";
		} else if (mouseInTopRightResizeZone(x, y)) {
		    self.resize_hover = "tr";
		} else {
		    self.resize_hover = false;
		}
	    }
	};
	var updateCSSCursor = function(x, y) {
	    var cursor_val;
	    if (typeof x === "undefined") {
		cursor_val = 'auto';
	    } else {
		if (mouseInRectDragZone(x, y)) {
		    cursor_val = 'move';
		} else if (mouseInRightHorzResizeZone(x, y) || mouseInLeftHorzResizeZone(x, y)) {
		    cursor_val = 'ew-resize';
		} else if (mouseInTopVertResizeZone(x, y) || mouseInBottomVertResizeZone(x, y)) {
		    cursor_val = 'ns-resize';
		} else if (mouseInTopLeftResizeZone(x, y) || mouseInBottomRightResizeZone(x, y)) {
		    cursor_val = 'nwse-resize';
		} else if (mouseInBottomLeftResizeZone(x, y) || mouseInTopRightResizeZone(x, y)) {
		    cursor_val = 'nesw-resize';
		} else {
		    cursor_val = 'auto';
		}
	    }
	    $div.css('cursor', cursor_val);
	};
	var getCanvasMouse = function(view, div_mouse_x, div_mouse_y) {
	    var outside = false;
	    if (div_mouse_x < view.padding || div_mouse_x > parseInt(view.$canvas[0].width, 10) + view.padding ||
		    div_mouse_y < view.padding || div_mouse_y > parseInt(view.$canvas[0].height, 10) + view.padding) {
		    outside = true;
	    }
	    //div_mouse_x = clamp(div_mouse_x, view.padding, view.padding + parseInt(view.$canvas[0].width, 10));
	    //div_mouse_y = clamp(div_mouse_y, view.padding, view.padding + parseInt(view.$canvas[0].height, 10));
	    return {'mouse_x': div_mouse_x - view.padding, 
		    'mouse_y': div_mouse_y - view.padding,
		    'outside': outside};
	};
	var dragging = false;
	var drag_type = false;
	var drag_start_col = -1;
	var drag_start_vert_scroll = -1;
	var drag_start_x = -1;
	var drag_start_y = -1;
	var drag_start_vert_zoom = -1;
	var y_ratio = -1;
	$(document).on("mousedown", function (evt) {
	    var offset = self.$div.offset();
	    var overlay_mouse_x = evt.pageX - offset.left;
	    var overlay_mouse_y = evt.pageY - offset.top;
	    var mouse = getCanvasMouse(self, overlay_mouse_x, overlay_mouse_y);
	    
	    if (!mouse.outside) {
		var mouse_x = mouse.mouse_x;
		var mouse_y = mouse.mouse_y;
		dragging = false;
		drag_type = false;


		y_ratio = model.getOncoprintHeight() / parseInt(self.$canvas[0].height, 10);
		if (mouseInRectDragZone(mouse_x, mouse_y)) {
		    drag_type = "move";
		} else if (mouseInRightHorzResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_r";
		} else if (mouseInLeftHorzResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_l";
		} else if (mouseInTopVertResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_t";
		} else if (mouseInBottomVertResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_b";
		} else if (mouseInTopRightResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_tr";
		} else if (mouseInBottomRightResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_br";
		} else if (mouseInTopLeftResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_tl";
		} else if (mouseInBottomLeftResizeZone(mouse_x, mouse_y)) {
		    drag_type = "resize_bl";
		}
		if (drag_type !== false) {
		    dragging = true;
		    drag_start_x = mouse_x;
		    drag_start_y = mouse_y;
		    drag_start_col = Math.floor(model.getHorzScroll() / (model.getCellWidth() + model.getCellPadding()));
		    drag_start_vert_scroll = model.getVertScroll();
		    drag_start_vert_zoom = model.getVertZoom();
		    drag_start_rect = self.current_rect;
		}
	    }
	});
	$(document).on("mousemove", function (evt) {
	    var offset = self.$div.offset();
	    var overlay_mouse_x = evt.pageX - offset.left;
	    var overlay_mouse_y = evt.pageY - offset.top;
	    var mouse = getCanvasMouse(self, overlay_mouse_x, overlay_mouse_y);
	    var mouse_x = mouse.mouse_x;
	    var mouse_y = mouse.mouse_y;
	    var zoom = getZoom(self, model);
	    var cell_width = model.getCellWidth(true)*zoom.x;
	    if (dragging) {
		evt.preventDefault();
		var delta_col = Math.floor(mouse_x / cell_width) - Math.floor(drag_start_x / cell_width);
		var delta_y = mouse_y - drag_start_y;
		if (drag_type === "move") {
		    var delta_y_scroll = delta_y * y_ratio;
		    drag_callback((drag_start_col + delta_col)*(model.getCellWidth() + model.getCellPadding()), drag_start_vert_scroll + delta_y_scroll);
		} else {
		    var render_rect;
		    var zoom = getZoom(self, model);
		    var max_num_cols = model.getIdOrder().length;
		    var min_num_cols = Math.ceil(cell_view.getWidth() / (model.getCellWidth(true) + model.getCellPadding(true, true)));
		    var max_height = model.getOncoprintHeight(true) * zoom.y;
		    var min_height = model.getCellViewHeight() * zoom.y;
		    var drag_start_right_col = drag_start_rect.col + drag_start_rect.num_cols;
		    var drag_start_bottom = drag_start_rect.top + drag_start_rect.height;
		    if (drag_type === "resize_r") {
			// Width must be valid
			delta_col = clamp(delta_col, 
					min_num_cols - drag_start_rect.num_cols,
					max_num_cols - drag_start_rect.num_cols);
			// Right must be valid
			delta_col = Math.min(delta_col, max_num_cols - drag_start_right_col);
			render_rect = {
			    'top': drag_start_rect.top,
			    'col': drag_start_rect.col,
			    'num_cols': drag_start_rect.num_cols + delta_col,
			    'height': drag_start_rect.height
			};
		    } else if (drag_type === "resize_l") {
			// Width must be valid
			delta_col = clamp(delta_col,
					drag_start_rect.num_cols - max_num_cols,
					drag_start_rect.num_cols - min_num_cols);
			// Left must be valid
			delta_col = Math.max(delta_col, -drag_start_rect.col);
			render_rect = {
			    'top': drag_start_rect.top,
			    'col': drag_start_rect.col + delta_col,
			    'num_cols': drag_start_rect.num_cols - delta_col,
			    'height': drag_start_rect.height
			};
		    } else if (drag_type === "resize_t") {
			// Height must be valid
			delta_y = clamp(delta_y,
					drag_start_rect.height - max_height,
					drag_start_rect.height - min_height);
			// Top must be valid
			delta_y = Math.max(delta_y, -drag_start_rect.top);
			render_rect = {
			    'top': drag_start_rect.top + delta_y,
			    'col': drag_start_rect.col,
			    'num_cols': drag_start_rect.num_cols,
			    'height': drag_start_rect.height - delta_y
			};
		    } else if (drag_type === "resize_b") {
			// Height must be valid
			delta_y = clamp(delta_y,
					min_height - drag_start_rect.height,
					max_height - drag_start_rect.height);
			// Bottom must be valid
			delta_y = Math.min(delta_y, max_height - drag_start_bottom);
			render_rect = {
			    'top': drag_start_rect.top,
			    'col': drag_start_rect.col,
			    'num_cols': drag_start_rect.num_cols,
			    'height': drag_start_rect.height + delta_y
			};
		    } else if (drag_type === "resize_tr") {
			// Width must be valid
			delta_col = clamp(delta_col, 
					min_num_cols - drag_start_rect.num_cols,
					max_num_cols - drag_start_rect.num_cols);
			// Right must be valid
			delta_col = Math.min(delta_col, max_num_cols - drag_start_right_col);
			// Height must be valid
			delta_y = clamp(delta_y,
					drag_start_rect.height - max_height,
					drag_start_rect.height - min_height);
			// Top must be valid
			delta_y = Math.max(delta_y, -drag_start_rect.top);
			render_rect = {
			    'top': drag_start_rect.top + delta_y,
			    'col': drag_start_rect.col,
			    'num_cols': drag_start_rect.num_cols + delta_col,
			    'height': drag_start_rect.height - delta_y
			};
		    } else if (drag_type === "resize_tl") {
			// Width must be valid
			delta_col = clamp(delta_col,
					drag_start_rect.num_cols - max_num_cols,
					drag_start_rect.num_cols - min_num_cols);
			// Left must be valid
			delta_col = Math.max(delta_col, -drag_start_rect.col);
			// Height must be valid
			delta_y = clamp(delta_y,
					drag_start_rect.height - max_height,
					drag_start_rect.height - min_height);
			// Top must be valid
			delta_y = Math.max(delta_y, -drag_start_rect.top);
			render_rect = {
			    'top': drag_start_rect.top + delta_y,
			    'col': drag_start_rect.col + delta_col,
			    'num_cols': drag_start_rect.num_cols - delta_col,
			    'height': drag_start_rect.height - delta_y
			};
		    } else if (drag_type === "resize_br") {
			// Height must be valid
			delta_y = clamp(delta_y,
					min_height - drag_start_rect.height,
					max_height - drag_start_rect.height);
			// Bottom must be valid
			delta_y = Math.min(delta_y, max_height - drag_start_bottom);
			// Width must be valid
			delta_col = clamp(delta_col, 
					min_num_cols - drag_start_rect.num_cols,
					max_num_cols - drag_start_rect.num_cols);
			// Right must be valid
			delta_col = Math.min(delta_col, max_num_cols - drag_start_right_col);
			render_rect = {
			    'top': drag_start_rect.top,
			    'col': drag_start_rect.col,
			    'num_cols': drag_start_rect.num_cols + delta_col,
			    'height': drag_start_rect.height + delta_y
			};
		    } else if (drag_type === "resize_bl") {
			// Height must be valid
			delta_y = clamp(delta_y,
					min_height - drag_start_rect.height,
					max_height - drag_start_rect.height);
			// Bottom must be valid
			delta_y = Math.min(delta_y, max_height - drag_start_bottom);		
			// Width must be valid
			delta_col = clamp(delta_col,
					drag_start_rect.num_cols - max_num_cols,
					drag_start_rect.num_cols - min_num_cols);
			// Left must be valid
			delta_col = Math.max(delta_col, -drag_start_rect.col);
			render_rect = {
			    'top': drag_start_rect.top,
			    'col': drag_start_rect.col + delta_col,
			    'num_cols': drag_start_rect.num_cols - delta_col,
			    'height': drag_start_rect.height + delta_y
			};
		    }
		    var cell_width = model.getCellWidth(true)*zoom.x;
		    // Compute render left and width
		    render_rect.left = render_rect.col * cell_width;
		    render_rect.width = render_rect.num_cols * cell_width;
		    drawOverlayRect(self, null, null, render_rect);
		}
	    } else {
		if (mouse.outside) {
		    updateCSSCursor();
		    updateRectResizeHoverLocation();
		} else {
		    updateCSSCursor(mouse_x, mouse_y);
		    updateRectResizeHoverLocation(mouse_x, mouse_y);
		}
		drawOverlayRect(self, model, cell_view);
	    }
	});
	var endDrag = function() {
	    if (dragging) {
		if (["resize_t", "resize_b", "resize_l", "resize_r",
		    "resize_tl", "resize_tr", "resize_bl", "resize_br"].indexOf(drag_type) > -1) {
		    viewport_callback({
			'col': self.current_rect.col,
			'scroll_y_proportion': (self.current_rect.top / parseInt(self.$canvas[0].height, 10)),
			'num_cols': self.current_rect.num_cols,
			'zoom_y': (drag_start_rect.height / self.current_rect.height) * drag_start_vert_zoom
		    });
		}
		dragging = false;
		drag_type = false;
	    }
	};
	$(document).on("mouseup", function (evt) {
	    var offset = self.$div.offset();
	    var overlay_mouse_x = evt.pageX - offset.left;
	    var overlay_mouse_y = evt.pageY - offset.top;
	    endDrag();
	    var mouse = getCanvasMouse(self, overlay_mouse_x, overlay_mouse_y);
	    if (!mouse.outside) {
		var mouse_x = mouse.mouse_x;
		var mouse_y = mouse.mouse_y;
		updateCSSCursor(mouse_x, mouse_y);
		updateRectResizeHoverLocation(mouse_x, mouse_y);
	    } else {
		updateCSSCursor();
		updateRectResizeHoverLocation();
	    }
	    drawOverlayRect(self, model, cell_view);
	});
    }

    var getTrackBuffers = function (view, cell_view, track_id) {
	var vertex_position_buffer = view.ctx.createBuffer();
	var vertex_color_buffer = view.ctx.createBuffer();
	var vertex_position_array = cell_view.vertex_position_array[track_id];
	var vertex_color_array = cell_view.vertex_color_array[track_id];

	view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_position_buffer);
	view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_position_array), view.ctx.STATIC_DRAW);
	vertex_position_buffer.itemSize = 3;
	vertex_position_buffer.numItems = vertex_position_array.length / vertex_position_buffer.itemSize;

	view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_color_buffer);
	view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_color_array), view.ctx.STATIC_DRAW);
	vertex_color_buffer.itemSize = 4;
	vertex_color_buffer.numItems = vertex_color_array.length / vertex_color_buffer.itemSize;

	var vertex_column_buffer = view.ctx.createBuffer();
	var vertex_column_array = cell_view.vertex_column_array[track_id];
	view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_column_buffer);
	view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_column_array), view.ctx.STATIC_DRAW);
	vertex_column_buffer.itemSize = 1;
	vertex_column_buffer.numItems = vertex_column_array.length / vertex_column_buffer.itemSize;

	return {'position': vertex_position_buffer,
	    'color': vertex_color_buffer,
	    'column': vertex_column_buffer};
    };

    var drawOncoprint = function (view, model, cell_view) {
	if (view.rendering_suppressed) {
	    return;
	}

	var zoom = getZoom(view, model);

	view.ctx.clearColor(1.0, 1.0, 1.0, 1.0);
	view.ctx.clear(view.ctx.COLOR_BUFFER_BIT | view.ctx.DEPTH_BUFFER_BIT);

	var tracks = model.getTracks();
	for (var i = 0; i < tracks.length; i++) {
	    var track_id = tracks[i];
	    var cell_top = model.getCellTops(track_id, true);
	    var buffers = getTrackBuffers(view, cell_view, track_id);
	    if (buffers.position.numItems === 0) {
		continue;
	    }

	    view.ctx.useProgram(view.shader_program);
	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.position);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexPositionAttribute, buffers.position.itemSize, view.ctx.FLOAT, false, 0, 0);

	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.color);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexColorAttribute, buffers.color.itemSize, view.ctx.FLOAT, false, 0, 0);

	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.column);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexOncoprintColumnAttribute, buffers.column.itemSize, view.ctx.FLOAT, false, 0, 0);

	    view.ctx.uniformMatrix4fv(view.shader_program.pMatrixUniform, false, view.pMatrix);
	    view.ctx.uniformMatrix4fv(view.shader_program.mvMatrixUniform, false, view.mvMatrix);
	    view.ctx.uniform1f(view.shader_program.columnWidthUniform, model.getCellWidth(true));
	    view.ctx.uniform1f(view.shader_program.zoomXUniform, zoom.x);
	    view.ctx.uniform1f(view.shader_program.zoomYUniform, zoom.y);
	    view.ctx.uniform1f(view.shader_program.offsetYUniform, cell_top);

	    view.ctx.drawArrays(view.ctx.TRIANGLES, 0, buffers.position.numItems);
	}
    };
    var getZoom = function (view, model) {
	var zoom_x = parseInt(view.$canvas[0].width, 10) / model.getOncoprintWidthNoColumnPadding(true);
	var zoom_y = parseInt(view.$canvas[0].height, 10) / model.getOncoprintHeight(true);
	zoom_x = Math.max(0, Math.min(1, zoom_x));
	zoom_y = Math.max(0, Math.min(1, zoom_y));
	return {
	    x: zoom_x,
	    y: zoom_y
	};
    };
    
    var drawOverlayRect = function (view, model, cell_view, opt_rect) {
	if (view.rendering_suppressed) {
	    return;
	}

	var left, width, top, height, col, num_cols;
	if (opt_rect) {
	    left = opt_rect.left;
	    width = opt_rect.width;
	    top = opt_rect.top;
	    height = opt_rect.height;
	    col = opt_rect.col;
	    num_cols = opt_rect.num_cols;
	} else {
	    var cell_width = model.getCellWidth(true);
	    var cell_padding = model.getCellPadding(true);
	    var viewport = cell_view.getViewportOncoprintSpace(model);

	    var zoom = getZoom(view, model);
	    col = Math.floor(viewport.left / (cell_width + cell_padding));
	    num_cols = Math.min(model.getIdOrder().length - col,
				Math.floor(viewport.right / (cell_width + cell_padding)) - Math.floor(viewport.left / (cell_width + cell_padding)));
	    left = col * cell_width * zoom.x;
	    width = num_cols * cell_width * zoom.x;
	    top = viewport.top * zoom.y;
	    height = (viewport.bottom - viewport.top) * zoom.y;
	}

	var ctx = view.overlay_ctx;
	var canv = view.$overlay_canvas[0];
	var canv_width = parseInt(canv.width, 10);
	var canv_height = parseInt(canv.height, 10);
	
	// Clear
	ctx.fillStyle = "rgba(0,0,0,0)";
	ctx.clearRect(0, 0, canv_width, canv_height);
	// Draw rectangle
	ctx.fillStyle = "rgba(255,255,255,0.4)";
	ctx.fillRect(left, top, width, height);
	// Draw border line by line
	var unhover_color = "rgba(0,0,0,0.75)";
	var hover_color = "rgba(255,0,0,1)";
	var unhover_width = 1;
	var hover_width = 2;
	var top_is_hovered = view.resize_hover === "t" || view.resize_hover === "tr" || view.resize_hover === "tl";
	var right_is_hovered = view.resize_hover === "r" || view.resize_hover === "tr" || view.resize_hover === "br";
	var bottom_is_hovered = view.resize_hover === "b" || view.resize_hover === "br" || view.resize_hover === "bl";
	var left_is_hovered = view.resize_hover === "l" || view.resize_hover === "tl" || view.resize_hover === "bl";
	// Draw top border
	ctx.beginPath();
	ctx.moveTo(left, top);
	ctx.strokeStyle = top_is_hovered ? hover_color : unhover_color;
	ctx.lineWidth = top_is_hovered ? hover_width : unhover_width;
	ctx.lineTo(left+width, top);
	ctx.stroke();
	// Draw right border
	ctx.beginPath();
	ctx.moveTo(left+width, top);
	ctx.strokeStyle = right_is_hovered ? hover_color : unhover_color;
	ctx.lineWidth = right_is_hovered ? hover_width : unhover_width;
	ctx.lineTo(left+width, top+height);
	ctx.stroke();
	// Draw bottom border
	ctx.beginPath();
	ctx.moveTo(left+width, top+height);
	ctx.strokeStyle = bottom_is_hovered ? hover_color : unhover_color;
	ctx.lineWidth = bottom_is_hovered ? hover_width : unhover_width;
	ctx.lineTo(left, top+height);
	ctx.stroke();
	// Draw left border
	ctx.beginPath();
	ctx.moveTo(left, top+height);
	ctx.strokeStyle = left_is_hovered ? hover_color : unhover_color;
	ctx.lineWidth = left_is_hovered ? hover_width : unhover_width;
	ctx.lineTo(left, top);
	ctx.stroke();
	
	view.current_rect = {
	    'top':top,
	    'left':left,
	    'width':width,
	    'height':height,
	    'col': col,
	    'num_cols': num_cols
	};
    };
    var drawOncoprintAndOverlayRect = function (view, model, cell_view) {
	if (view.rendering_suppressed) {
	    return;
	}
	drawOncoprint(view, model, cell_view);
	drawOverlayRect(view, model, cell_view);
    };

    OncoprintMinimapView.prototype.moveTrack = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.addTracks = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.removeTrack = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setHorzZoom = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setVertZoom = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setZoom = function(model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setScroll = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setHorzScroll = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setVertScroll = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setViewport = function (model, cell_view) {
	drawOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.sort = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setTrackData = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.shareRuleSet = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setRuleSet = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.setIdOrder = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.suppressRendering = function () {
	this.rendering_suppressed = true;
    }
    OncoprintMinimapView.prototype.releaseRendering = function (model, cell_view) {
	this.rendering_suppressed = false;
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    OncoprintMinimapView.prototype.hideIds = function (model, cell_view) {
	drawOncoprintAndOverlayRect(this, model, cell_view);
    }

    OncoprintMinimapView.prototype.setWidth = function (w, model, cell_view) {
	this.$canvas[0].width = w;
	this.$overlay_canvas[0].width = w;
	getWebGLContextAndSetUpMatricesAndShaders(this);
	this.overlay_ctx = this.$overlay_canvas[0].getContext("2d");

	drawOncoprintAndOverlayRect(this, model, cell_view);
    }
    return OncoprintMinimapView;
})();

module.exports = OncoprintMinimapView;
},{"gl-matrix":1}],18:[function(require,module,exports){
var binarysearch = require('./binarysearch.js');
var CachedProperty = require('./CachedProperty.js');

function ifndef(x, val) {
    return (typeof x === "undefined" ? val : x);
}

var UnionOfSets = (function() {
    // a set, to be passed in as argument, is an object where the values are truthy
    function UnionOfSets() {
	this.union_count = {};
	this.sets = {};
    }
    var setOfKeys = function (obj) {
	var set = {};
	for (var k in obj) {
	    if (typeof obj[k] !== 'undefined') {
		set[k] = true;
	    }
	}
	return set;
    };
    UnionOfSets.prototype.putSet = function(id, set) {
	this.removeSet(id);
	this.sets[id] = set;
	
	var union_count = this.union_count;
	for (var k in set) {
	    if (set[k]) {
		this.union_count[k] = this.union_count[k] || 0;
		this.union_count[k] += 1;
	    }
	}
    }
    UnionOfSets.prototype.removeSet = function(id) {
	var union_count = this.union_count;
	var old_set = this.sets[id] || {};
	for (var k in old_set) {
	    if (old_set[k]) {
		union_count[k] -= 1;
		if (union_count[k] === 0) {
		    delete union_count[k];
		}
	    }
	}
	delete this.sets[id];
    }
    UnionOfSets.prototype.getUnion = function() {
	return setOfKeys(this.union_count);
    }
    return UnionOfSets;
})();

var setUnion = function(list_of_sets) {
    var union = {};
    for (var i=0; i<list_of_sets.length; i++) {
	var set = list_of_sets[i];
	for (var k in set) {
	    if (set.hasOwnProperty(k)) {
		union[k] = true;
	    }
	}
    }
    return union;
};

var objectValues = function(obj) {
    return Object.keys(obj).map(function(key) {
	return obj[key];
    });
};

var arrayUnique = function(arr) {
    var present = {};
    var unique = [];
    for (var i=0; i<arr.length; i++) {
	if (typeof present[arr[i]] === 'undefined') {
	    present[arr[i]] = true;
	    unique.push(arr[i]);
	}
    }
    return unique;
};

var copyShallowObject = function(obj) {
    var copy = {};
    for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
	    copy[key] = obj[key];
	}
    }
    return copy;
};

var clamp = function(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
};

var OncoprintModel = (function () {
    var MIN_ZOOM_PIXELS = 100;
    function OncoprintModel(init_cell_padding, init_cell_padding_on,
	    init_horz_zoom, init_vert_zoom, 
	    init_cell_width, init_track_group_padding) {
		
	var model = this;	
	
	// Global properties
	this.sort_config = {};
	this.rendering_suppressed_depth = 0;
	
	// Rendering Properties
	this.max_height = 500;
	this.cell_width = ifndef(init_cell_width, 6);
	this.horz_zoom = ifndef(init_horz_zoom, 1);
	this.vert_zoom = ifndef(init_vert_zoom, 1);
	this.horz_scroll = 0;
	this.vert_scroll = 0;
	this.bottom_padding = 0;
	this.track_group_padding = ifndef(init_track_group_padding, 10);
	this.cell_padding = ifndef(init_cell_padding, 3);
	this.cell_padding_on = ifndef(init_cell_padding_on, true);
	this.cell_padding_off_cell_width_threshold = 2;
	this.cell_padding_off_because_of_zoom = (this.getCellWidth() < this.cell_padding_off_cell_width_threshold);
	this.id_order = [];
	this.hidden_ids = {};
	
	// Track Properties
	this.track_label = {};
	this.track_description = {};
	this.cell_height = {};
	this.track_padding = {};
	this.track_data_id_key = {};
	this.track_tooltip_fn = {};
	this.track_removable = {};
	this.track_remove_callback = {};
	this.track_sort_cmp_fn = {};
	this.track_sort_direction_changeable = {};
	this.track_sort_direction = {}; // 1: ascending, -1: descending, 0: not
	this.track_data = {};
	this.track_rule_set_id = {}; // track id -> rule set id
	this.track_active_rules = {}; // from track id to active rule map (map with rule ids as keys)
	this.track_info = {};
	
	// Rule Set Properties
	this.rule_sets = {}; // map from rule set id to rule set
	
	// Cached and Recomputed Properties
	this.visible_id_order = new CachedProperty([], function () {
	    var hidden_ids = model.hidden_ids;
	    return model.id_order.filter(function (id) {
		return !hidden_ids[id];
	    });
	});
	this.track_id_to_datum = new CachedProperty({}, function(model, track_id) {
	    var curr = model.track_id_to_datum.get();
	    if (model.getContainingTrackGroup(track_id) !== null) {
		var map = {};
		var data = model.getTrackData(track_id) || [];
		var data_id_key = model.getTrackDataIdKey(track_id) || '';
		for (var i=0; i<data.length; i++) {
		    map[data[i][data_id_key]] = data[i];
		}
		curr[track_id] = map;
	    } else {
		delete curr[track_id];
	    }
	    return curr;
	});
	this.track_present_ids = new CachedProperty(new UnionOfSets(), function(model, track_id) {
	    var union = model.track_present_ids.get();
	    if (model.getContainingTrackGroup(track_id) !== null) {
		var ids = {};
		var data = model.getTrackData(track_id) || [];
		var data_id_key = model.getTrackDataIdKey(track_id) || '';
		for (var i = 0; i < data.length; i++) {
		    ids[data[i][data_id_key]] = true;
		}
		union.putSet(track_id, ids);
	    } else {
		union.removeSet(track_id);
	    }
	    return union;
	});
	this.present_ids = new CachedProperty({}, function() {
	    return model.track_present_ids.get().getUnion();
	});
	this.track_present_ids.addBoundProperty(this.present_ids);
	
	this.id_to_index = new CachedProperty({}, function() {
	    var id_to_index = {};
	    var id_order = model.getIdOrder(true);
	    for (var i=0; i<id_order.length; i++) {
		id_to_index[id_order[i]] = i;
	    }
	    return id_to_index;
	});
	this.visible_id_to_index = new CachedProperty({}, function() {
	    var id_to_index = {};
	    var id_order = model.getIdOrder();
	    for (var i=0; i<id_order.length; i++) {
		id_to_index[id_order[i]] = i;
	    }
	    return id_to_index;
	});
	this.visible_id_order.addBoundProperty(this.visible_id_to_index);
	
	this.track_groups = [];
	this.track_group_sort_priority = [];
	
	this.track_tops = new CachedProperty({}, function () {
	    var tops = {};
	    var groups = model.getTrackGroups();
	    var y = 0;
	    for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		for (var j = 0; j < group.length; j++) {
		    var track_id = group[j];
		    tops[track_id] = y;
		    y += model.getTrackHeight(track_id, true);
		}
		if (group.length > 0) {
		    y += model.getTrackGroupPadding(true);
		}
	    }
	    return tops;
	});
	this.cell_tops = new CachedProperty({}, function() {
	    var track_tops = model.track_tops.get();
	    var cell_tops = {};
	    for (var k in track_tops) {
		if (track_tops.hasOwnProperty(k)) {
		    cell_tops[k] = track_tops[k] + model.getTrackPadding(k, true);
		}
	    }
	    return cell_tops;
	});
	this.label_tops = new CachedProperty({}, function() {
	    return model.cell_tops.get();
	});
	
	this.track_tops.addBoundProperty(this.cell_tops);
	this.cell_tops.addBoundProperty(this.label_tops);
	
	this.track_tops_zoomed = new CachedProperty({}, function () {
	    var tops = {};
	    var groups = model.getTrackGroups();
	    var y = 0;
	    for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		for (var j = 0; j < group.length; j++) {
		    var track_id = group[j];
		    tops[track_id] = y;
		    y += model.getTrackHeight(track_id);
		}
		if (group.length > 0) {
		    y += model.getTrackGroupPadding();
		}
	    }
	    return tops;
	});
	this.cell_tops_zoomed = new CachedProperty({}, function() {
	    var track_tops = model.track_tops_zoomed.get();
	    var cell_tops = {};
	    for (var k in track_tops) {
		if (track_tops.hasOwnProperty(k)) {
		    cell_tops[k] = track_tops[k] + model.getTrackPadding(k);
		}
	    }
	    return cell_tops;
	});
	this.label_tops_zoomed = new CachedProperty({}, function() {
	    return model.cell_tops_zoomed.get();
	});
	
	this.track_tops.addBoundProperty(this.track_tops_zoomed);
	this.track_tops_zoomed.addBoundProperty(this.cell_tops_zoomed);
	this.cell_tops_zoomed.addBoundProperty(this.label_tops_zoomed);
	
	this.column_left = new CachedProperty({}, function() {
	    var cell_width = model.getCellWidth(true);
	    var cell_padding = model.getCellPadding(true);
	    var left = {};
	    var ids = model.getIdOrder();
	    for (var i = 0; i < ids.length; i++) {
		left[ids[i]] = i * (cell_width + cell_padding);
	    }
	    return left;
	});
	
	this.zoomed_column_left = new CachedProperty({}, function() {
	    var cell_width = model.getCellWidth();
	    var cell_padding = model.getCellPadding();
	    var left = {};
	    var ids = model.getIdOrder();
	    for (var i = 0; i < ids.length; i++) {
		left[ids[i]] = i * (cell_width + cell_padding);
	    }
	    return left;
	});
	this.column_left_no_padding = new CachedProperty({}, function() {
	    var cell_width = model.getCellWidth(true);
	    var left = {};
	    var ids = model.getIdOrder();
	    for (var i = 0; i < ids.length; i++) {
		left[ids[i]] = i * cell_width;
	    }
	    return left;
	});
	this.column_left.addBoundProperty(this.zoomed_column_left);
	this.column_left.addBoundProperty(this.column_left_no_padding);
	
	this.precomputed_comparator = new CachedProperty({}, function(model, track_id) {
	    var curr_precomputed_comparator = model.precomputed_comparator.get();
	    curr_precomputed_comparator[track_id] = new PrecomputedComparator(model.getTrackData(track_id),
									    model.getTrackSortComparator(track_id),
									    model.getTrackSortDirection(track_id),
									    model.getTrackDataIdKey(track_id));
	    return curr_precomputed_comparator;
	});// track_id -> PrecomputedComparator
    }

    OncoprintModel.prototype.toggleCellPadding = function () {
	this.cell_padding_on = !this.cell_padding_on;
	this.column_left.update();
	return this.cell_padding_on;
    }

    OncoprintModel.prototype.getCellPadding = function (base, dont_consider_zoom) {
	return (this.cell_padding * (base ? 1 : this.horz_zoom)) * (+this.cell_padding_on) * (dont_consider_zoom ? 1 : +(!this.cell_padding_off_because_of_zoom));
    }

    OncoprintModel.prototype.getHorzZoom = function () {
	return this.horz_zoom;
    }

    OncoprintModel.prototype.getHorzZoomToFitNumCols = function(width, num_cols) {
	var cell_width = this.getCellWidth(true);
	var zoom_if_cell_padding_on = clamp(width / (num_cols*(cell_width + this.cell_padding)),
					    0,1);
	var zoom_if_cell_padding_off = clamp(width / (num_cols*cell_width),
					    0,1);
	var zoom;
	if (!this.cell_padding_on) {
	    zoom = zoom_if_cell_padding_off;
	} else {
	    if (cell_width * zoom_if_cell_padding_on < this.cell_padding_off_cell_width_threshold) {
		if (cell_width * zoom_if_cell_padding_off >= this.cell_padding_off_cell_width_threshold) {
		    // Because of cell padding toggling there's no way to get exactly the desired number of columns.
		    // We can see this by contradiction: if we assume that cell padding is on, and try to fit exactly
		    // our number of columns, we end up turning cell padding off (outer if statement). If we assume that
		    // cell padding is off and try to fit our number of columns, we find that cell padding is on (inner if statement).
		    // Thus, it's impossible to show this exact number of columns - we either under or overshoot it. We
		    // thus should overshoot it by as little as possible, show as few columns as possible while still fitting
		    // this amount. It must be exactly at the threshold for switching.
		    // 
		    var unrounded_zoom = this.cell_padding_off_cell_width_threshold / cell_width;
		    var unrounded_num_cols = width / (unrounded_zoom * cell_width);
		    var rounded_num_cols = Math.ceil(unrounded_num_cols);
		    zoom = width / (rounded_num_cols * cell_width);
		} else {
		    zoom = zoom_if_cell_padding_off;
		}
	    } else {
		zoom = zoom_if_cell_padding_on;
	    }
	}
	return zoom;
    }
    OncoprintModel.prototype.getHorzZoomToFit = function(width, ids) {
	ids = ids || [];
	var id_to_index_map = this.getVisibleIdToIndexMap();
	var indexes = ids.map(function(id) { return id_to_index_map[id]; });
	var max = Math.max.apply(null, indexes);
	var min = Math.min.apply(null, indexes);
	var num_cols = max - min;
	return this.getHorzZoomToFitNumCols(width, num_cols);
    }
    
    OncoprintModel.prototype.getMinZoom = function() {
	return Math.min(MIN_ZOOM_PIXELS / (this.getIdOrder().length*this.getCellWidth(true) + (this.getIdOrder().length-1)*this.getCellPadding(true)), 1);
    }
    
    OncoprintModel.prototype.setHorzScroll = function(s) {
	this.horz_scroll = Math.max(0, s);
	return this.horz_scroll;
    }
    OncoprintModel.prototype.setVertScroll = function(s) {
	this.vert_scroll = Math.max(0, s);
	return this.vert_scroll;
    }
    OncoprintModel.prototype.setScroll = function(h, v) {
	this.setHorzScroll(h);
	this.setVertScroll(v);
    }
    OncoprintModel.prototype.getHorzScroll = function() {
	return this.horz_scroll;
    }
    OncoprintModel.prototype.getVertScroll = function() {
	return this.vert_scroll;
    }
    OncoprintModel.prototype.setZoom = function(zoom_x, zoom_y) {
	this.setHorzZoom(zoom_x);
	this.setVertZoom(zoom_y);
    }
    var setCellPaddingOffBecauseOfZoom = function(model, val) {
	model.cell_padding_off_because_of_zoom = val;
	model.column_left.update();
    };
    OncoprintModel.prototype.setHorzZoom = function (z) {
	var min_zoom = this.getMinZoom();
	if (z <= 1 && z >= min_zoom) {
	    this.horz_zoom = z;
	} else if (z > 1) {
	    this.horz_zoom = 1;
	} else if (z < min_zoom) {
	    this.horz_zoom = min_zoom;
	}
	this.column_left.update();
	
	if (this.getCellWidth() < this.cell_padding_off_cell_width_threshold && !this.cell_padding_off_because_of_zoom) {
	    setCellPaddingOffBecauseOfZoom(this, true);
	} else if (this.getCellWidth() >= this.cell_padding_off_cell_width_threshold && this.cell_padding_off_because_of_zoom) {
	    setCellPaddingOffBecauseOfZoom(this, false);
	}
	return this.horz_zoom;
    }
    
    
    OncoprintModel.prototype.getVertZoom = function() {
	return this.vert_zoom;
    }
    
    OncoprintModel.prototype.setVertZoom = function (z) {
	if (z <= 1 && z >= 0) {
	    this.vert_zoom = z;
	} else if (z > 1) {
	    this.vert_zoom = 1;
	} else if (z < 0) {
	    this.vert_zoom = 0;
	}
	this.track_tops.update();
	return this.vert_zoom;
    }

    OncoprintModel.prototype.hideTrackLegends = function(track_ids) {
	track_ids = [].concat(track_ids);
	for (var i=0; i<track_ids.length; i++) {
	    this.getRuleSet(track_ids[i]).exclude_from_legend = true;
	}
    }
    
    OncoprintModel.prototype.showTrackLegends = function(track_ids) {
	track_ids = [].concat(track_ids);
	for (var i=0; i<track_ids.length; i++) {
	    this.getRuleSet(track_ids[i]).exclude_from_legend = false;
	}
    }

    OncoprintModel.prototype.getIdentifiedShapeListList = function(track_id, use_base_size, sort_by_z) {
	var active_rules = {};
	var data = this.getTrackData(track_id);
	var id_key = this.getTrackDataIdKey(track_id);
	var shapes = this.getRuleSet(track_id).apply(data, this.getCellWidth(use_base_size), this.getCellHeight(track_id, use_base_size), active_rules);
	this.track_active_rules[track_id] = active_rules;
	
	var z_comparator = function(shapeA, shapeB) {
	    var zA = parseFloat(shapeA.z);
	    var zB = parseFloat(shapeB.z);
	    if (zA < zB) {
		return -1;
	    } else if (zA > zB) {
		return 1;
	    } else {
		return 0;
	    }
	};
	return shapes.map(function(shape_list, index) {
	    if (sort_by_z) {
		shape_list.sort(z_comparator);
	    }
	    return {
		id: data[index][id_key],
		shape_list: shape_list
	    };
	});
    }
    
    OncoprintModel.prototype.getActiveRules = function(rule_set_id) {
	var list_of_active_rules_maps = [];
	for (var track_id in this.track_rule_set_id) {
	    if (this.track_rule_set_id.hasOwnProperty(track_id) && this.track_rule_set_id[track_id] === rule_set_id) {
		list_of_active_rules_maps.push(this.track_active_rules[track_id]);
	    }
	}
	var active_rules = setUnion(list_of_active_rules_maps);
	return this.rule_sets[rule_set_id].getRulesWithId().filter(function(rule_with_id) {
	    return !!active_rules[rule_with_id.id];
	});
    }
    
    OncoprintModel.prototype.getRuleSets = function() {
	// return rule sets, sorted by associating each with the lowest track id its on
	var self = this;
	var sorted_tracks = this.getTracks().sort();
	var rule_set_ids = sorted_tracks.map(function(track_id) {
	    return self.track_rule_set_id[track_id];
	});
	var unique_rule_set_ids = arrayUnique(rule_set_ids);
	return unique_rule_set_ids.map(function(rule_set_id) {
	    return self.rule_sets[rule_set_id];
	});
    }

    OncoprintModel.prototype.getCellWidth = function (base) {
	return this.cell_width * (base ? 1 : this.horz_zoom);
    }

    OncoprintModel.prototype.getCellHeight = function (track_id, base) {
	return this.cell_height[track_id] * (base ? 1 : this.vert_zoom);
    }
    
    OncoprintModel.prototype.getTrackInfo = function(track_id) {
	return this.track_info[track_id];
    }
    
    OncoprintModel.prototype.setTrackInfo = function(track_id, msg) {
	this.track_info[track_id] = msg;
    }
    
    OncoprintModel.prototype.getTrackHeight = function(track_id, base) {
	return this.getCellHeight(track_id, base) + 2*this.getTrackPadding(track_id, base);
    }

    OncoprintModel.prototype.getTrackPadding = function (track_id, base) {
	return this.track_padding[track_id] * (base ? 1 : this.vert_zoom);
    }
    OncoprintModel.prototype.getBottomPadding = function() {
	return this.bottom_padding;
    }
    OncoprintModel.prototype.getTrackSortDirection = function(track_id) {
	return this.track_sort_direction[track_id];
    }
    OncoprintModel.prototype.setTrackSortDirection = function(track_id, dir) {
	// see above for dir options
	this.track_sort_direction[track_id] = dir;
	this.precomputed_comparator.update(this, track_id);
    }
    
    OncoprintModel.prototype.setCellPaddingOn = function(cell_padding_on) {
	this.cell_padding_on = cell_padding_on;
	this.column_left.update();
    }
    OncoprintModel.prototype.getIdOrder = function (all) {
	if (all) {
	    return this.id_order; // TODO: should be read-only
	} else {
	    return this.visible_id_order.get();
	}
    }
    OncoprintModel.prototype.getIdToIndexMap = function() {
	return this.id_to_index.get();
    }
    OncoprintModel.prototype.getVisibleIdToIndexMap = function() {
	return this.visible_id_to_index.get();
    }

    OncoprintModel.prototype.getHiddenIds = function () {
	var hidden_ids = this.hidden_ids;
	return this.id_order.filter(function (id) {
	    return !!hidden_ids[id];
	});
    }

    OncoprintModel.prototype.setIdOrder = function (ids) {
	this.id_order = ids.slice();
	Object.freeze(this.id_order);
	this.id_to_index.update();
	this.visible_id_order.update();
	this.column_left.update();
    }

    OncoprintModel.prototype.hideIds = function (to_hide, show_others) {
	if (show_others) {
	    this.hidden_ids = {};
	}
	for (var j = 0, len = to_hide.length; j < len; j++) {
	    this.hidden_ids[to_hide[j]] = true;
	}
	this.visible_id_order.update();
	this.column_left.update();
    }

    OncoprintModel.prototype.moveTrackGroup = function (from_index, to_index) {
	var new_groups = [];
	var group_to_move = this.track_groups[from_index];
	for (var i = 0; i < this.track_groups.length; i++) {
	    if (i !== from_index && i !== to_index) {
		new_groups.push(this.track_groups[i]);
	    }
	    if (i === to_index) {
		new_groups.push(group_to_move);
	    }
	}
	this.track_groups = new_groups;
	this.track_tops.update();
	return this.track_groups;
    }

    OncoprintModel.prototype.addTracks = function (params_list) {
	for (var i = 0; i < params_list.length; i++) {
	    var params = params_list[i];
	    addTrack(this, params.track_id, params.target_group,
		    params.cell_height, params.track_padding,
		    params.data_id_key, params.tooltipFn,
		    params.removable, params.removeCallback, params.label, params.description, params.track_info,
		    params.sortCmpFn, params.sort_direction_changeable, params.init_sort_direction,
		    params.data, params.rule_set);
	}
	this.track_tops.update();
    }
  
    var addTrack = function (model, track_id, target_group,
	    cell_height, track_padding,
	    data_id_key, tooltipFn,
	    removable, removeCallback, label, description, track_info,
	    sortCmpFn, sort_direction_changeable, init_sort_direction,
	    data, rule_set) {
	model.track_label[track_id] = ifndef(label, "Label");
	model.track_description[track_id] = ifndef(description, "");
	model.cell_height[track_id] = ifndef(cell_height, 23);
	model.track_padding[track_id] = ifndef(track_padding, 5);

	model.track_tooltip_fn[track_id] = ifndef(tooltipFn, function (d) {
	    return d + '';
	});
	model.track_removable[track_id] = ifndef(removable, false);
	model.track_remove_callback[track_id] = ifndef(removeCallback, function() {});
	
	model.track_sort_cmp_fn[track_id] = ifndef(sortCmpFn, function () {
	    return 0;
	});
	
	model.track_sort_direction_changeable[track_id] = ifndef(sort_direction_changeable, false);
	model.track_data[track_id] = ifndef(data, []);
	model.track_data_id_key[track_id] = ifndef(data_id_key, 'id');
	
	model.track_info[track_id] = ifndef(track_info, "");
	
	if (typeof rule_set !== 'undefined') {
	    model.rule_sets[rule_set.rule_set_id] = rule_set;
	    model.track_rule_set_id[track_id] = rule_set.rule_set_id;
	}

	model.track_sort_direction[track_id] = ifndef(init_sort_direction, 1);
	
	target_group = ifndef(target_group, 0);
	while (target_group >= model.track_groups.length) {
	    model.track_groups.push([]);
	}
	model.track_groups[target_group].push(track_id);
	
	
	
	model.track_id_to_datum.update(model, track_id);
	model.track_present_ids.update(model, track_id);
	model.precomputed_comparator.update(model, track_id);
	
	model.setIdOrder(Object.keys(model.present_ids.get()));
    }

    var _getContainingTrackGroup = function (oncoprint_model, track_id, return_reference) {
	var group;
	track_id = parseInt(track_id);
	for (var i = 0; i < oncoprint_model.track_groups.length; i++) {
	    if (oncoprint_model.track_groups[i].indexOf(track_id) > -1) {
		group = oncoprint_model.track_groups[i];
		break;
	    }
	}
	if (group) {
	    return (return_reference ? group : group.slice());
	} else {
	    return null;
	}
    }

    var isRuleSetUsed = function(model, rule_set_id) {
	var used = false;
	var tracks = model.getTracks();
	for (var i=0; i<tracks.length; i++) {
	    if (model.track_rule_set_id[tracks[i]] === rule_set_id) {
		used = true;
		break;
	    }
	}
	return used;
    }
   
    OncoprintModel.prototype.removeTrack = function (track_id) {
	var rule_set_id = this.track_rule_set_id[track_id];
	this.track_remove_callback[track_id](track_id);
	
	delete this.track_data[track_id];
	delete this.track_rule_set_id[track_id];
	delete this.track_label[track_id];
	delete this.cell_height[track_id];
	delete this.track_padding[track_id];
	delete this.track_data_id_key[track_id];
	delete this.track_tooltip_fn[track_id];
	delete this.track_removable[track_id];
	delete this.track_remove_callback[track_id];
	delete this.track_sort_cmp_fn[track_id];
	delete this.track_sort_direction_changeable[track_id];
	delete this.track_sort_direction[track_id];
	delete this.track_info[track_id];

	var containing_track_group = _getContainingTrackGroup(this, track_id, true);
	if (containing_track_group !== null) {
	    containing_track_group.splice(
		    containing_track_group.indexOf(track_id), 1);
	}
	this.track_tops.update();
	this.track_present_ids.update(this, track_id);
	this.track_id_to_datum.update(this, track_id);
	this.setIdOrder(Object.keys(this.present_ids.get()));
	
	var rule_set_used = isRuleSetUsed(this, rule_set_id);
	if (!rule_set_used) {
	    delete this.rule_sets[rule_set_id];
	}
    }
    
    OncoprintModel.prototype.getOverlappingCell = function(x,y) {
	// First, see if it's in a column
	var id_order = this.getIdOrder();
	var zoomed_column_left = this.getZoomedColumnLeft();
	var nearest_id_index = binarysearch(id_order, x, function(id) { return zoomed_column_left[id];}, true);
	if (x <= zoomed_column_left[id_order[nearest_id_index]] + this.getCellWidth()) {
	    var id = id_order[nearest_id_index];
	    var tracks = this.getTracks();
	    var cell_tops = this.getCellTops();
	    var nearest_track_index = binarysearch(tracks, y, function(track) { return cell_tops[track];}, true);
	    var nearest_track = tracks[nearest_track_index];
	    if (y < cell_tops[nearest_track] + this.getCellHeight(nearest_track)) {
		return {'id':id, 'track':nearest_track, 'top':cell_tops[nearest_track], 'left':zoomed_column_left[id]};
	    }
	}
	return null;
    };
    
    OncoprintModel.prototype.getTrackDatum = function(track_id, id) {
	var datum = this.track_id_to_datum.get()[track_id][id];
	if (typeof datum === 'undefined') {
	    datum = null;
	}
	return datum;
    }
    
    OncoprintModel.prototype.getTrackTops = function (desired_track_id) {
	if (typeof desired_track_id === 'undefined') {
	    return copyShallowObject(this.track_tops.get());
	} else {
	    return this.track_tops.get()[desired_track_id];
	}
    }
    
    OncoprintModel.prototype.getZoomedTrackTops = function (desired_track_id) {
	if (typeof desired_track_id === 'undefined') {
	    return copyShallowObject(this.track_tops_zoomed.get());
	} else {
	    return this.track_tops_zoomed.get()[desired_track_id];
	}
    }
    
    OncoprintModel.prototype.getCellTops = function(desired_track_id, base) {
	if (typeof desired_track_id === 'undefined') {
	    return copyShallowObject((base ? this.cell_tops : this.cell_tops_zoomed).get());
	} else {
	    return (base ? this.cell_tops : this.cell_tops_zoomed).get()[desired_track_id];
	}
    }
    OncoprintModel.prototype.getLabelTops = function(desired_track_id, base) {
	if (typeof desired_track_id === 'undefined') {
	    return copyShallowObject((base ? this.label_tops : this.label_tops_zoomed).get());
	} else {
	    return (base ? this.label_tops : this.label_tops_zoomed).get()[desired_track_id];
	}
    }
    
    OncoprintModel.prototype.getContainingTrackGroup = function (track_id) {
	return _getContainingTrackGroup(this, track_id, false);
    }

    OncoprintModel.prototype.getTrackGroups = function () {
	// TODO: make read-only
	return this.track_groups;
    }

    OncoprintModel.prototype.getTracks = function () {
	var ret = [];
	for (var i = 0; i < this.track_groups.length; i++) {
	    for (var j = 0; j < this.track_groups[i].length; j++) {
		ret.push(this.track_groups[i][j]);
	    }
	}
	return ret;
    }

    OncoprintModel.prototype.getIdsInLeftInterval = function(left, right) {
	var cell_width = this.getCellWidth();
	var cell_padding = this.getCellPadding();
	var id_order = this.getIdOrder();
	
	// left_id_index and right_id_index are inclusive
	var left_id_index = Math.floor(left/(cell_width + cell_padding));
	var left_remainder = left - left_id_index*(cell_width + cell_padding);
	if (left_remainder > cell_width) {
	    left_id_index += 1;
	}
	var right_id_index = Math.floor(right/(cell_width + cell_padding));
	return id_order.slice(left_id_index, right_id_index+1);
    }
    OncoprintModel.prototype.getColumnLeft = function(id) {
	if (typeof id === 'undefined') {
	    return this.column_left.get();
	} else {
	    return this.column_left.get()[id];
	}
    }
    
    OncoprintModel.prototype.getColumnLeftNoPadding = function(id) {
	if (typeof id === 'undefined') {
	    return this.column_left_no_padding.get();
	} else {
	    return this.column_left_no_padding.get()[id];
	}
    }
    
    OncoprintModel.prototype.getZoomedColumnLeft = function(id) {
	if (typeof id === 'undefined') {
	    return this.zoomed_column_left.get();
	} else {
	    return this.zoomed_column_left.get()[id];
	}
    }
    
    
    OncoprintModel.prototype.getOncoprintHeight = function(base) {
	var tracks = this.getTracks();
	var last_track = tracks[tracks.length-1];
	return (base ? this.getTrackTops(last_track) : this.getZoomedTrackTops(last_track))+this.getTrackHeight(last_track, base)
		    + this.getBottomPadding();
    }
    
    OncoprintModel.prototype.getOncoprintWidth = function(base) {
	return this.getIdOrder().length*(this.getCellWidth(base) + this.getCellPadding(base));
    }
    
    OncoprintModel.prototype.getOncoprintWidthNoColumnPadding = function(base) {
	return this.getIdOrder().length*this.getCellWidth(base);
    }
    
    OncoprintModel.prototype.getCellViewHeight = function() {
	return Math.min(this.max_height, this.getOncoprintHeight());
    }
    OncoprintModel.prototype.getCellViewWidth = function() {
	return this.getOncoprintWidth();
    }
    OncoprintModel.prototype.moveTrack = function (track_id, new_previous_track) {
	var track_group = _getContainingTrackGroup(this, track_id, true);
	if (track_group !== null) {
	    track_group.splice(track_group.indexOf(track_id), 1);
	    var new_position = (new_previous_track === null ? 0 : track_group.indexOf(new_previous_track)+1);
	    track_group.splice(new_position, 0, track_id);
	}
	
	this.track_tops.update();
    }

    OncoprintModel.prototype.getTrackLabel = function (track_id) {
	return this.track_label[track_id];
    }
    
    OncoprintModel.prototype.getTrackDescription = function(track_id) {
	return this.track_description[track_id];
    }

    OncoprintModel.prototype.getTrackTooltipFn = function (track_id) {
	return this.track_tooltip_fn[track_id];
    }
    OncoprintModel.prototype.setTrackTooltipFn = function (track_id, tooltipFn) {
	this.track_tooltip_fn[track_id] = tooltipFn;
    }

    OncoprintModel.prototype.getTrackDataIdKey = function (track_id) {
	return this.track_data_id_key[track_id];
    }

    OncoprintModel.prototype.getTrackGroupPadding = function (base) {
	return this.track_group_padding * (base ? 1 : this.vert_zoom);
    }
    
    OncoprintModel.prototype.isTrackRemovable = function (track_id) {
	return this.track_removable[track_id];
    }
    
    OncoprintModel.prototype.isTrackSortDirectionChangeable = function (track_id) {
	return this.track_sort_direction_changeable[track_id];
    }

    OncoprintModel.prototype.getRuleSet = function (track_id) {
	return this.rule_sets[this.track_rule_set_id[track_id]];
    }

    OncoprintModel.prototype.shareRuleSet = function(source_track_id, target_track_id) {
	var curr_rule_set_id = this.track_rule_set_id[target_track_id];
	var should_delete_curr_rule_set = true;
	for (var track_id in this.track_rule_set_id) {
	    if (this.track_rule_set_id.hasOwnProperty(track_id) && track_id !== source_track_id + '') {
		if (this.track_rule_set_id[track_id] === curr_rule_set_id) {
		    should_delete_curr_rule_set = false;
		    break;
		}
	    }
	}
	if (should_delete_curr_rule_set) {
	    delete this.rule_sets[curr_rule_set_id];
	}
	delete this.track_active_rules[target_track_id];
	this.track_rule_set_id[target_track_id] = this.track_rule_set_id[source_track_id];
    }
    
    OncoprintModel.prototype.setRuleSet = function(track_id, rule_set) {
	var curr_rule_set_id = this.track_rule_set_id[track_id];
	this.rule_sets[rule_set.rule_set_id] = rule_set;
	this.track_rule_set_id[track_id] = rule_set.rule_set_id;
	
	var rule_set_used = isRuleSetUsed(this, curr_rule_set_id);
	if (!rule_set_used) {
	    delete this.rule_sets[curr_rule_set_id];
	}
    }

    OncoprintModel.prototype.getTrackSortComparator = function(track_id) {
	return this.track_sort_cmp_fn[track_id];
    }
    
    OncoprintModel.prototype.setTrackSortComparator = function(track_id, sortCmpFn) {
	this.track_sort_cmp_fn[track_id] = sortCmpFn;
	this.precomputed_comparator.update(this, track_id);
    }
    
    OncoprintModel.prototype.getTrackData = function (track_id) {
	return this.track_data[track_id];
    }
    
    OncoprintModel.prototype.setTrackData = function (track_id, data, data_id_key) {
	this.track_data[track_id] = data;
	this.track_data_id_key[track_id] = data_id_key;
	this.track_id_to_datum.update(this, track_id);
	this.track_present_ids.update(this, track_id);
	this.setIdOrder(Object.keys(this.present_ids.get()));
	this.precomputed_comparator.update(this, track_id);
    }
    
    OncoprintModel.prototype.computeTrackIdToDatum = function(track_id) {
	this.track_id_to_datum[track_id] = {};
	
	var track_data = this.track_data[track_id] || [];
	var track_id_key = this.track_data_id_key[track_id];
	for (var i=0; i<track_data.length; i++) {
	    this.track_id_to_datum[track_id][track_data[i][track_id_key]] = track_data[i];
	}
    }
    
    OncoprintModel.prototype.setTrackGroupSortPriority = function(priority) {
	this.track_group_sort_priority = priority;
	this.sort();
    }
    var sortAlphabetical = function(model) {
	var id_order = model.getIdOrder(true).slice();
	id_order.sort(function(a,b) {
	    return a.localeCompare(b);
	});
	model.setIdOrder(id_order);
    };
    var sortByTracks = function(model) {
	var track_group_sort_priority = model.track_group_sort_priority;
	var track_groups = model.getTrackGroups();
	var track_groups_in_sort_order;
	
	if (track_group_sort_priority.length < track_groups.length) {
	    track_groups_in_sort_order = track_groups;
	} else {
	    track_groups_in_sort_order = track_group_sort_priority.map(function(x) {
		return track_groups[x];
	    });
	}
	
	var track_sort_priority = track_groups_in_sort_order.reduce(function(acc, next) {
	    return acc.concat(next);
	}, []);
	
	var precomputed_comparator = model.precomputed_comparator.get();
	var curr_id_to_index = model.getIdToIndexMap();
	var combinedComparator = function(idA, idB) {
	    var res = 0;
	    for (var i=0; i<track_sort_priority.length; i++) {
		res = precomputed_comparator[track_sort_priority[i]].compare(idA, idB);
		if (res !== 0) {
		    break;
		}
	    }
	    if (res === 0) {
		// stable sort
		res = ( curr_id_to_index[idA] < curr_id_to_index[idB] ? -1 : 1); // will never be the same, no need to check for 0
	    }
	    return res;
	}
	var id_order = model.getIdOrder(true).slice();
	id_order.sort(combinedComparator);
	model.setIdOrder(id_order);
    };
    OncoprintModel.prototype.sort = function() {
	this.sort_config = this.sort_config || {};
	if (this.sort_config.type === "alphabetical") {
	    sortAlphabetical(this);
	} else if (this.sort_config.type === "order") {
	    this.setIdOrder(this.sort_config.order);
	} else {
	    sortByTracks(this);
	}
    }
    
    OncoprintModel.prototype.setSortConfig = function(params) {
	this.sort_config = params;
    }

    return OncoprintModel;
})();

var PrecomputedComparator = (function() {
    function PrecomputedComparator(list, comparator, sort_direction, element_identifier_key) {
	var directed_comparator = function(d1, d2) {
	    if (sort_direction === 0) {
		return 0;
	    }
	    var res = comparator(d1, d2);
	    if (res === 2) {
		return 1;
	    } else if (res === -2) {
		return -1;
	    } else {
		return res*sort_direction;
	    }
	};
	var sorted_list = list.sort(directed_comparator);
	this.change_points = []; // i is a change point iff comp(elt[i], elt[i+1]) !== 0
	for (var i=0; i<sorted_list.length; i++) {
	    if (i === sorted_list.length - 1) {
		break;
	    }
	    if (directed_comparator(sorted_list[i], sorted_list[i+1]) !== 0) {
		this.change_points.push(i);
	    }
	}
	// Note that by this process change_points is sorted
	this.id_to_index = {};
	for (var i=0; i<sorted_list.length; i++) {
	    this.id_to_index[sorted_list[i][element_identifier_key]] = i;
	}
    }
    PrecomputedComparator.prototype.compare = function(idA, idB) {
	var indA = this.id_to_index[idA];
	var indB = this.id_to_index[idB];
	if (typeof indA === 'undefined' && typeof indB === 'undefined') {
	    return 0;
	} else if (typeof indA === 'undefined') {
	    return 1;
	} else if (typeof indB === 'undefined') {
	    return -1;
	}
	
	var should_negate_result = false;
	if (indA === indB) {
	    return 0;
	} else if (indA > indB) {
	    // switch if necessary to make process WLOG
	    var tmp = indA;
	    indA = indB;
	    indB = tmp;
	    should_negate_result = true;
	}
	// See if any changepoints in [indA, indB)
	var upper_bd_excl = this.change_points.length;
	var lower_bd_incl = 0;
	var middle;
	var res = 0;
	while (true) {
	    middle = Math.floor((lower_bd_incl + upper_bd_excl) / 2);
	    if (lower_bd_incl === upper_bd_excl) {
		break;
	    } else if (this.change_points[middle] >= indB) {
		upper_bd_excl = middle;
	    } else if (this.change_points[middle] < indA) {
		lower_bd_incl = middle+1;
	    } else {
		res = -1;
		break;
	    }
	}
	if (should_negate_result) {
	    res = res * -1;
	}
	return res;
    }
    return PrecomputedComparator;
})();
module.exports = OncoprintModel;
},{"./CachedProperty.js":11,"./binarysearch.js":12}],19:[function(require,module,exports){
/* Rule:
 * 
 * condition: function from datum to boolean
 * shapes - a list of Shapes
 * legend_label
 * exclude_from_legend
 * 
 * Shape:
 * type
 * x
 * y
 * ... shape-specific attrs ...
 * 
 * Attrs by shape:
 * 
 * rectangle: x, y, width, height, stroke, stroke-width, fill
 * triangle: x1, y1, x2, y2, x3, y3, stroke, stroke-width, fill
 * ellipse: x, y, width, height, stroke, stroke-width, fill
 * line: x1, y1, x2, y2, stroke, stroke-width
 */

var Shape = require('./oncoprintshape.js');

function ifndef(x, val) {
    return (typeof x === "undefined" ? val : x);
}

function makeIdCounter() {
    var id = 0;
    return function () {
	id += 1;
	return id;
    };
}

function makeUniqueColorGetter(init_used_colors) {
    init_used_colors = init_used_colors || [];
    var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618",
	"#990099", "#0099c6", "#dd4477", "#66aa00",
	"#b82e2e", "#316395", "#994499", "#22aa99",
	"#aaaa11", "#6633cc", "#e67300", "#8b0707",
	"#651067", "#329262", "#5574a6", "#3b3eac",
	"#b77322", "#16d620", "#b91383", "#f4359e",
	"#9c5935", "#a9c413", "#2a778d", "#668d1c",
	"#bea413", "#0c5922", "#743411"]; // Source: D3
    var index = 0;
    var used_colors = {};
    for (var i=0; i<init_used_colors.length; i++) {
	used_colors[init_used_colors[i]] = true;
    }
    return function() {
	var next_color = colors[index % colors.length];
	while (used_colors[next_color]) {
	    var darker_next_color = darkenHexColor(next_color);
	    if (darker_next_color === next_color) {
		break;
	    }
	    next_color = darker_next_color;
	}
	used_colors[next_color] = true;
	index += 1;
	
	return next_color;
    };
};

function shallowExtend(target, source) {
    var ret = {};
    for (var key in target) {
	if (target.hasOwnProperty(key)) {
	    ret[key] = target[key];
	}
    }
    for (var key in source) {
	if (source.hasOwnProperty(key)) {
	    ret[key] = source[key];
	}
    }
    return ret;
}

function objectValues(obj) {
    return Object.keys(obj).map(function(key) { return obj[key]; });
}

var NA_SHAPES = [
    {
	'type': 'rectangle',
	'fill': 'rgba(125, 125, 125, 1)',
	'z': 0,
    },
    /*{
	'type': 'line',
	'x1': '0%',
	'y1': '0%',
	'x2': '100%',
	'y2': '100%',
	'stroke': 'rgba(85, 85, 85, 0.7)',
	'stroke-width': '1',
	'z': '1',
    },*/
];
var NA_STRING = "na";
var NA_LABEL = "N/A";

var extractRGBA = function (str) {
    var ret = [0, 0, 0, 1];
    if (str[0] === "#") {
	// hex, convert to rgba
	var r = parseInt(str[1] + str[2], 16);
	var g = parseInt(str[3] + str[4], 16);
	var b = parseInt(str[5] + str[6], 16);
	str = 'rgba('+r+','+g+','+b+',1)';
    }
    var match = str.match(/^[\s]*rgba\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (match.length === 5) {
	ret = [parseFloat(match[1]) / 255,
	    parseFloat(match[2]) / 255,
	    parseFloat(match[3]) / 255,
	    parseFloat(match[4])];
    }
    return ret;
};

var colorToHex = function(str) {
    var r;
    var g;
    var b;
    var rgba_match = str.match(/^[\s]*rgba\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (rgba_match && rgba_match.length === 5) {
	r = parseInt(rgba_match[1]).toString(16);
	g = parseInt(rgba_match[2]).toString(16);
	b = parseInt(rgba_match[3]).toString(16);
	if (r.length === 1) {
	    r = '0' + r;
	}
	if (g.length === 1) {
	    g = '0' + g;
	}
	if (b.length === 1) {
	    b = '0' + b;
	}
	return '#' + r + g + b;
    }
    
    var rgb_match = str.match(/^[\s]*rgb\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*\)[\s]*$/);
    if (rgb_match && rgb_match.length === 4) {
	r = parseInt(rgb_match[1]).toString(16);
	g = parseInt(rgb_match[2]).toString(16);
	b = parseInt(rgb_match[3]).toString(16);
	if (r.length === 1) {
	    r = '0' + r;
	}
	if (g.length === 1) {
	    g = '0' + g;
	}
	if (b.length === 1) {
	    b = '0' + b;
	}
	return '#' + r + g + b;
    }
    
    return str;
};

var darkenHexColor = function(str) {
    var r = str[1] + str[2];
    var g = str[3] + str[4];
    var b = str[5] + str[6];
    var darkenHexChannel = function(c) {
	c = parseInt(c, 16);
	c *= 0.95;
	c = Math.round(c);
	c = c.toString(16);
	if (c.length === 1) {
	    c = '0' + c;
	}
	return c;
    };
    r = darkenHexChannel(r);
    g = darkenHexChannel(g);
    b = darkenHexChannel(b);
    return '#' + r + g + b;
};

var RuleSet = (function () {
    var getRuleSetId = makeIdCounter();
    var getRuleId = makeIdCounter();

    function RuleSet(params) {
	/* params:
	 * - legend_label
	 * - exclude_from_legend
	 */
	this.rule_set_id = getRuleSetId();
	this.legend_label = params.legend_label;
	this.exclude_from_legend = params.exclude_from_legend;
	this.active_rule_ids = {};
	this.rules_with_id = [];

    }

    RuleSet.prototype.getLegendLabel = function () {
	return this.legend_label;
    }

    RuleSet.prototype.getRuleSetId = function () {
	return this.rule_set_id;
    }

    RuleSet.prototype.addRules = function (list_of_params) {
	var self = this;
	return list_of_params.map(function (params) {
	    return self.addRule(params);
	});
    }

    RuleSet.prototype.addRule = function (params) {
	var rule_id = getRuleId();
	this.rules_with_id.push({id: rule_id, rule: new Rule(params)});
	return rule_id;
    }

    RuleSet.prototype.removeRule = function (rule_id) {
	var index = -1;
	for (var i = 0; i < this.rules_with_id.length; i++) {
	    if (this.rules_with_id[i].id === rule_id) {
		index = i;
		break;
	    }
	}
	if (index > -1) {
	    this.rules_with_id.splice(index, 1);
	}
	delete this.active_rule_ids[rule_id];
    }

    RuleSet.prototype.getRuleWithId = function (rule_id) {
	var ret = null;
	for (var i = 0; i < this.rules_with_id.length; i++) {
	    if (this.rules_with_id[i].id === rule_id) {
		ret = this.rules_with_id[i];
		break;
	    }
	}
	return ret;
    }

    RuleSet.prototype.isExcludedFromLegend = function () {
	return this.exclude_from_legend;
    }

    RuleSet.prototype.getRecentlyUsedRules = function () {
	var self = this;
	return Object.keys(this.active_rule_ids).map(
		function (rule_id) {
		    return self.getRule(rule_id);
		});
    }

    RuleSet.prototype.applyRulesToDatum = function (rules_with_id, datum, cell_width, cell_height) {
	var shapes = [];
	var rules_len = rules_with_id.length;
	for (var j = 0; j < rules_len; j++) {
	    shapes = shapes.concat(rules_with_id[j].rule.apply(datum, cell_width, cell_height));
	}
	return shapes;
    }
    RuleSet.prototype.apply = function (data, cell_width, cell_height, out_active_rules) {
	// Returns a list of lists of concrete shapes, in the same order as data
	var ret = [];
	for (var i = 0; i < data.length; i++) {
	    var rules = this.getRulesWithId(data[i]);
	    if (typeof out_active_rules !== 'undefined') {
		for (var j = 0; j < rules.length; j++) {
		    out_active_rules[rules[j].id] = true;
		}
	    }
	    ret.push(this.applyRulesToDatum(rules, data[i], cell_width, cell_height));
	}
	return ret;
    }

    return RuleSet;
})();

var LookupRuleSet = (function () {
    function LookupRuleSet(params) {
	RuleSet.call(this, params);
	this.lookup_map_by_key_and_value = {};
	this.lookup_map_by_key = {};
	this.universal_rules = [];

	this.rule_id_to_conditions = {};

	this.addRule(NA_STRING, true, {
	    shapes: NA_SHAPES,
	    legend_label: NA_LABEL,
	    exclude_from_legend: false,
	    legend_config: {'type': 'rule', 'target': {'na': true}}
	});
    }
    LookupRuleSet.prototype = Object.create(RuleSet.prototype);

    LookupRuleSet.prototype.getRulesWithId = function (datum) {
	if (typeof datum === 'undefined') {
	    return this.rules_with_id;
	}
	var ret = [];
	ret = ret.concat(this.universal_rules);
	for (var key in datum) {
	    if (typeof datum[key] !== 'undefined') {
		var key_rule = this.lookup_map_by_key[key];
		if (typeof key_rule !== 'undefined') {
		    ret.push(key_rule);
		}
		var key_and_value_rule = (this.lookup_map_by_key_and_value[key] && this.lookup_map_by_key_and_value[key][datum[key]]) || undefined;
		if (typeof key_and_value_rule !== 'undefined') {
		    ret.push(key_and_value_rule);
		}
	    }
	}
	return ret;
    }

    var indexRuleForLookup = function (rule_set, condition_key, condition_value, rule_with_id) {
	if (condition_key === null) {
	    rule_set.universal_rules.push(rule_with_id);
	} else {
	    if (condition_value === null) {
		rule_set.lookup_map_by_key[condition_key] = rule_with_id;
	    } else {
		rule_set.lookup_map_by_key_and_value[condition_key] = rule_set.lookup_map_by_key_and_value[condition_key] || {};
		rule_set.lookup_map_by_key_and_value[condition_key][condition_value] = rule_with_id;
	    }
	}
	rule_set.rule_id_to_conditions[rule_with_id.id] = rule_set.rule_id_to_conditions[rule_with_id.id] || [];
	rule_set.rule_id_to_conditions[rule_with_id.id].push({key: condition_key, value: condition_value});
    };

    LookupRuleSet.prototype.addRule = function (condition_key, condition_value, params) {
	var rule_id = RuleSet.prototype.addRule.call(this, params);

	indexRuleForLookup(this, condition_key, condition_value, this.getRuleWithId(rule_id));

	return rule_id;
    }

    LookupRuleSet.prototype.linkExistingRule = function (condition_key, condition_value, existing_rule_id) {
	indexRuleForLookup(this, condition_key, condition_value, this.getRuleWithId(existing_rule_id));
    }

    LookupRuleSet.prototype.removeRule = function (rule_id) {
	RuleSet.prototype.removeRule.call(this, rule_id);

	while (this.rule_id_to_conditions[rule_id].length > 0) {
	    var condition = this.rule_id_to_conditions[rule_id].pop();
	    if (condition.key === null) {
		var index = -1;
		for (var i = 0; i < this.universal_rules.length; i++) {
		    if (this.universal_rules[i].id === rule_id) {
			index = i;
			break;
		    }
		}
		if (index > -1) {
		    this.universal_rules.splice(index, 1);
		}
	    } else {
		if (condition.value === null) {
		    delete this.lookup_map_by_key[condition.key];
		} else {
		    delete this.lookup_map_by_key_and_value[condition.key][condition.value];
		}
	    }
	}
	delete this.rule_id_to_conditions[rule_id];
    }
    return LookupRuleSet;
})();

var ConditionRuleSet = (function () {
    function ConditionRuleSet(params) {
	RuleSet.call(this, params);
	this.rule_id_to_condition = {};

	this.addRule(function (d) {
	    return d[NA_STRING] === true;
	},
		{shapes: NA_SHAPES,
		    legend_label: NA_LABEL,
		    exclude_from_legend: false,
		    legend_config: {'type': 'rule', 'target': {'na': true}}
		});
    }
    ConditionRuleSet.prototype = Object.create(RuleSet.prototype);

    ConditionRuleSet.prototype.getRulesWithId = function (datum) {
	if (typeof datum === 'undefined') {
	    return this.rules_with_id;
	}
	var ret = [];
	for (var i = 0; i < this.rules_with_id.length; i++) {
	    if (this.rule_id_to_condition[this.rules_with_id[i].id](datum)) {
		ret.push(this.rules_with_id[i]);
	    }
	}
	return ret;
    }

    ConditionRuleSet.prototype.addRule = function (condition, params) {
	var rule_id = RuleSet.prototype.addRule.call(this, params);
	this.rule_id_to_condition[rule_id] = condition;
	return rule_id;
    }

    ConditionRuleSet.prototype.removeRule = function (rule_id) {
	RuleSet.prototype.removeRule.call(this, rule_id);
	delete this.rule_id_to_condition[rule_id];
    }

    return ConditionRuleSet;
})();

var CategoricalRuleSet = (function () {
    function CategoricalRuleSet(params) {
	/* params
	 * - category_key
	 * - categoryToColor
	 */
	LookupRuleSet.call(this, params);
	
	this.category_key = params.category_key;
	this.category_to_color = ifndef(params.category_to_color, {});
	this.getUnusedColor = makeUniqueColorGetter(objectValues(this.category_to_color).map(colorToHex));
	for (var category in this.category_to_color) {
	    if (this.category_to_color.hasOwnProperty(category)) {
		var color = this.category_to_color[category];
		addCategoryRule(this, category, color);
		this.used_colors[colorToHex(color)] = true;
	    }
	}
    }
    CategoricalRuleSet.prototype = Object.create(LookupRuleSet.prototype);

    var addCategoryRule = function (ruleset, category, color) {
	var legend_rule_target = {};
	legend_rule_target[ruleset.category_key] = category;
	var rule_params = {
	    shapes: [{
		    type: 'rectangle',
		    fill: color,
		}],
	    legend_label: category,
	    exclude_from_legend: false,
	    legend_config: {'type': 'rule', 'target': legend_rule_target}
	};
	ruleset.addRule(ruleset.category_key, category, rule_params);
    };

    CategoricalRuleSet.prototype.apply = function (data, cell_width, cell_height, out_active_rules) {
	// First ensure there is a color for all categories
	for (var i = 0, data_len = data.length; i < data_len; i++) {
	    if (data[i][NA_STRING]) {
		continue;
	    }
	    var category = data[i][this.category_key];
	    if (!this.category_to_color.hasOwnProperty(category)) {
		var color = this.getUnusedColor(this);
		
		this.category_to_color[category] = color;
		addCategoryRule(this, category, color);
	    }
	}
	// Then propagate the call up
	return LookupRuleSet.prototype.apply.call(this, data, cell_width, cell_height, out_active_rules);
    };

    return CategoricalRuleSet;
})();

var LinearInterpRuleSet = (function () {
    function LinearInterpRuleSet(params) {
	/* params
	 * - log_scale
	 * - value_key
	 * - value_range
	 */
	ConditionRuleSet.call(this, params);
	this.value_key = params.value_key;
	this.value_range = params.value_range;
	this.log_scale = params.log_scale; // boolean
	this.inferred_value_range;

	this.makeInterpFn = function () {
	    var range = this.getEffectiveValueRange();
	    
	    if (this.log_scale) {
		var shift_to_make_pos = Math.abs(range[0]) + 1;
		var log_range = Math.log(range[1] + shift_to_make_pos) - Math.log(range[0] + shift_to_make_pos);
		var log_range_lower = Math.log(range[0] + shift_to_make_pos);
		return function(val) {
		    val = parseFloat(val);
		    return (Math.log(val + shift_to_make_pos) - log_range_lower)/log_range;
		};
	    } else {
		var range_spread = range[1] - range[0];
		var range_lower = range[0];
		return function (val) {
		    val = parseFloat(val);
		    return (val - range_lower) / range_spread;
		};
	    }
	};
    }
    LinearInterpRuleSet.prototype = Object.create(ConditionRuleSet.prototype);

    LinearInterpRuleSet.prototype.getEffectiveValueRange = function () {
	var ret = (this.value_range && this.value_range.slice()) || [undefined, undefined];
	if (typeof ret[0] === "undefined") {
	    ret[0] = this.inferred_value_range[0];
	}
	if (typeof ret[1] === "undefined") {
	    ret[1] = this.inferred_value_range[1];
	}
	if (ret[0] === ret[1]) {
	    // Make sure non-empty interval
	    ret[0] -= ret[0] / 2;
	    ret[1] += ret[1] / 2;
	}
	return ret;
    };

    LinearInterpRuleSet.prototype.apply = function (data, cell_width, cell_height, out_active_rules) {
	// First find value range
	var value_min = Number.POSITIVE_INFINITY;
	var value_max = Number.NEGATIVE_INFINITY;
	for (var i = 0, datalen = data.length; i < datalen; i++) {
	    var d = data[i];
	    if (isNaN(d[this.value_key])) {
		continue;
	    }
	    value_min = Math.min(value_min, d[this.value_key]);
	    value_max = Math.max(value_max, d[this.value_key]);
	}
	if (value_min === Number.POSITIVE_INFINITY) {
	    value_min = 0;
	}
	if (value_max === Number.NEGATIVE_INFINITY) {
	    value_max = 0;
	}
	this.inferred_value_range = [value_min, value_max];
	this.updateLinearRules();

	// Then propagate the call up
	return ConditionRuleSet.prototype.apply.call(this, data, cell_width, cell_height, out_active_rules);
    };

    LinearInterpRuleSet.prototype.updateLinearRules = function () {
	throw "Not implemented in abstract class";
    };

    return LinearInterpRuleSet;
})();

var GradientRuleSet = (function () {
    function GradientRuleSet(params) {
	/* params
	 * - color_range
	 */
	LinearInterpRuleSet.call(this, params);
	this.color_range;
	(function setUpColorRange(self) {
	    var color_start;
	    var color_end;
	    try {
		color_start = params.color_range[0]
			.match(/rgba\(([\d.,]+)\)/)
			.split(',')
			.map(parseFloat);
		color_end = params.color_range[1]
			.match(/rgba\(([\d.,]+)\)/)
			.split(',')
			.map(parseFloat);
		if (color_start.length !== 4 || color_end.length !== 4) {
		    throw "wrong number of color components";
		}
	    } catch (err) {
		color_start = [0, 0, 0, 1];
		color_end = [255, 0, 0, 1];
	    }
	    self.color_range = color_start.map(function (c, i) {
		return [c, color_end[i]];
	    });
	})(this);
	this.gradient_rule;
    }
    GradientRuleSet.prototype = Object.create(LinearInterpRuleSet.prototype);

    GradientRuleSet.prototype.updateLinearRules = function () {
	if (typeof this.gradient_rule !== "undefined") {
	    this.removeRule(this.gradient_rule);
	}
	var interpFn = this.makeInterpFn();
	var value_key = this.value_key;
	var color_range = this.color_range;
	this.gradient_rule = this.addRule(function (d) {
	    return d[NA_STRING] !== true;
	},
		{shapes: [{
			    type: 'rectangle',
			    fill: function (d) {
				var t = interpFn(d[value_key]);
				return "rgba(" + color_range.map(
					function (arr) {
					    return (1 - t) * arr[0]
						    + t * arr[1];
					}).join(",") + ")";
			    }
			}],
		    exclude_from_legend: false,
		    legend_config: {'type': 'gradient', 'range': this.getEffectiveValueRange()}
		});
    };

    return GradientRuleSet;
})();

var BarRuleSet = (function () {
    function BarRuleSet(params) {
	LinearInterpRuleSet.call(this, params);
	this.bar_rule;
	this.fill = params.fill || 'rgba(156,123,135,1)';
    }
    BarRuleSet.prototype = Object.create(LinearInterpRuleSet.prototype);

    BarRuleSet.prototype.updateLinearRules = function () {
	if (typeof this.bar_rule !== "undefined") {
	    this.removeRule(this.bar_rule);
	}
	var interpFn = this.makeInterpFn();
	var value_key = this.value_key;
	this.bar_rule = this.addRule(function (d) {
	    return d[NA_STRING] !== true;
	},
		{shapes: [{
			    type: 'rectangle',
			    y: function (d) {
				var t = interpFn(d[value_key]);
				return (1 - t) * 100 + "%";
			    },
			    height: function (d) {
				var t = interpFn(d[value_key]);
				return t * 100 + "%";
			    },
			    fill: this.fill,
			}],
		    exclude_from_legend: false,
		    legend_config: {'type': 'number', 
				    'range': this.getEffectiveValueRange(), 
				    'color': this.fill,
				    'interpFn': interpFn}
		});
    };

    return BarRuleSet;
})();

var StackedBarRuleSet = (function() {
    function StackedBarRuleSet(params) {
	/* params
	 * - categories
	 * - value_key
	 * - fills
	 */
	ConditionRuleSet.call(this, params);
	var value_key = params.value_key;
	var fills = params.fills || [];
	var categories = params.categories || [];
	var getUnusedColor = makeUniqueColorGetter(fills);
	
	// Initialize with default values
	while (fills.length < categories.length) {
	    fills.push(getUnusedColor());
	}
	
	var self = this;
	for (var i=0; i < categories.length; i++) {
	    (function(I) {
		var legend_target = {};
		legend_target[value_key] = {};
		for (var j=0; j<categories.length; j++) {
		    legend_target[value_key][categories[j]] = 0;
		}
		legend_target[value_key][categories[I]] = 1;
		self.addRule(function(d) {
		    return d[NA_STRING] !== true;
		},
		{shapes: [{
		    type: 'rectangle',
		    fill: fills[I],
		    width: '100%',
		    height: function(d) {
			var total = 0;
			for (var j=0; j<categories.length; j++) {
			    total += parseFloat(d[value_key][categories[j]]);
			}
			return parseFloat(d[value_key][categories[I]])*100/total + '%';
		    },
		    y: function(d) {
			var total = 0;
			var prev_vals_sum = 0;
			for (var j=0; j<categories.length; j++) {
			    var new_val = parseFloat(d[value_key][categories[j]]);
			    if (j < I) {
				prev_vals_sum += new_val;
			    }
			    total += new_val;
			}
			return prev_vals_sum*100/total + '%';
		    }
		}],
	    exclude_from_legend: false,
	    legend_config: {'type': 'rule', 'target': legend_target},
	    legend_label: categories[I]});
	    })(i);
	}
    }
    StackedBarRuleSet.prototype = Object.create(ConditionRuleSet.prototype);
    return StackedBarRuleSet;
})();
var GeneticAlterationRuleSet = (function () {
    function GeneticAlterationRuleSet(params) {
	/* params:
	 * - rule_params
	 */
	LookupRuleSet.call(this, params);
	(function addRules(self) {
	    var rule_params = params.rule_params;
	    for (var key in rule_params) {
		if (rule_params.hasOwnProperty(key)) {
		    var key_rule_params = rule_params[key];
		    if (key === '*') {
			self.addRule(null, null, shallowExtend(rule_params['*'], {'legend_config': {'type': 'rule', 'target': {}}}));
		    } else {
			for (var value in key_rule_params) {
			    if (key_rule_params.hasOwnProperty(value)) {
				var equiv_values = value.split(",");
				var legend_rule_target = {};
				legend_rule_target[equiv_values[0]] = value;
				var rule_id = self.addRule(key, (equiv_values[0] === '*' ? null : equiv_values[0]), shallowExtend(key_rule_params[value], {'legend_config': {'type': 'rule', 'target': legend_rule_target}}));
				for (var i = 1; i < equiv_values.length; i++) {
				    self.linkExistingRule(key, (equiv_values[i] === '*' ? null : equiv_values[i]), rule_id);
				}
			    }
			}
		    }
		}
	    }
	})(this);
    }
    GeneticAlterationRuleSet.prototype = Object.create(LookupRuleSet.prototype);

    return GeneticAlterationRuleSet;
})();

var Rule = (function () {
    function Rule(params) {
	this.shapes = params.shapes.map(function (shape) {
	    if (shape.type === 'rectangle') {
		return new Shape.Rectangle(shape);
	    } else if (shape.type === 'triangle') {
		return new Shape.Triangle(shape);
	    } else if (shape.type === 'ellipse') {
		return new Shape.Ellipse(shape);
	    } else if (shape.type === 'line') {
		return new Shape.Line(shape);
	    }
	});
	this.legend_label = typeof params.legend_label === "undefined" ? "" : params.legend_label;
	this.exclude_from_legend = params.exclude_from_legend;
	this.legend_config = params.legend_config;// {'type':'rule', 'target': {'mut_type':'MISSENSE'}} or {'type':'number', 'color':'rgba(1,2,3,1), 'range':[lower, upper]} or {'type':'gradient', 'color_range':['rgba(...)' or '#...', 'rgba(...)' or '#...'], 'number_range':[lower, upper]}
    }
    Rule.prototype.getLegendConfig = function () {
	return this.legend_config;
    }
    Rule.prototype.apply = function (d, cell_width, cell_height) {
	// Gets concrete shapes (i.e. computed
	// real values from percentages)
	var concrete_shapes = [];
	for (var i = 0, shapes_len = this.shapes.length; i < shapes_len; i++) {
	    concrete_shapes.push(this.shapes[i].getComputedParams(d, cell_width, cell_height));
	}
	return concrete_shapes;
    }

    Rule.prototype.isExcludedFromLegend = function () {
	return this.exclude_from_legend;
    }

    return Rule;
})();

module.exports = function (params) {
    if (params.type === 'categorical') {
	return new CategoricalRuleSet(params);
    } else if (params.type === 'gradient') {
	return new GradientRuleSet(params);
    } else if (params.type === 'bar') {
	return new BarRuleSet(params);
    } else if (params.type === 'stacked_bar') {
	return new StackedBarRuleSet(params);
    } else if (params.type === 'gene') {
	return new GeneticAlterationRuleSet(params);
    }
}
},{"./oncoprintshape.js":20}],20:[function(require,module,exports){
var Shape = (function() {
    var default_parameter_values = {
	    'width': '100%', 
	    'height': '100%', 
	    'x': '0%', 
	    'y': '0%', 
	    'z': 0,
	    'x1': '0%', 
	    'x2': '0%', 
	    'x3': '0%', 
	    'y1': '0%', 
	    'y2': '0%', 
	    'y3': '0%',
	    'stroke': 'rgba(0,0,0,0)', 
	    'fill': 'rgba(23,23,23,1)', 
	    'stroke-width': '0',
	    'stroke-opacity': '0'
    };
    var parameter_name_to_dimension_index = {
	'stroke-width':0,
	'width': 0,
	'x':0,
	'x1':0,
	'x2':0,
	'x3':0,
	'height':1,
	'y':1,
	'y1':1,
	'y2':1,
	'y3':1
    };
    function Shape(params) {
	this.params = params;
	this.params_with_type = {};
	this.completeWithDefaults();
	this.markParameterTypes();
    }
    Shape.prototype.completeWithDefaults = function() {
	var required_parameters = this.getRequiredParameters();
	for (var i=0; i<required_parameters.length; i++) {
	    var param = required_parameters[i];
	    this.params[param] = (typeof this.params[param] === 'undefined' ? default_parameter_values[param] : this.params[param]);
	}
    }
    Shape.prototype.markParameterTypes = function() {
	var parameters = Object.keys(this.params);
	for (var i=0; i<parameters.length; i++) {
	    var param_name = parameters[i];
	    var param_val = this.params[param_name];
	    if (typeof param_val === 'function') {
		this.params_with_type[param_name] = {'type':'function', 'value':param_val};
	    } else {
		this.params_with_type[param_name] = {'type':'value', 'value': param_val};
	    }
	}
    }
    Shape.prototype.getComputedParams = function(d, base_width, base_height) {
	var computed_params = {};
	var param_names = Object.keys(this.params_with_type);
	var dimensions = [base_width, base_height];
	for (var i=0; i<param_names.length; i++) {
	    var param_name = param_names[i];
	    var param_val_map = this.params_with_type[param_name];
	    var param_val = param_val_map.value;
	    if (param_name !== 'type') {
		if (param_val_map.type === 'function') {
		    param_val = param_val(d);
		}
		if (param_val[param_val.length-1] === '%') {
		    // check a couple of commonly-used special cases to avoid slower parseFloat 
		    if (param_val === '100%') {
			param_val = 1;
		    } else {
			param_val = parseFloat(param_val) / 100;
		    }
		    param_val *= dimensions[parameter_name_to_dimension_index[param_name]];
		}
	    }
	    computed_params[param_name] = param_val;
	}
	return computed_params;
    };
    return Shape;
})();



var Rectangle = (function() {
    function Rectangle(params) {
	Shape.call(this, params);
    }
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.getRequiredParameters = function() {
	return ['width', 'height', 'x', 'y', 'z', 'stroke', 'fill', 'stroke-width']; 
    }
    return Rectangle;
})();

var Triangle = (function() {
    function Triangle(params) {
	Shape.call(this, params);
    }
    Triangle.prototype = Object.create(Shape.prototype);
    Triangle.prototype.getRequiredParameters = function() {
	return ['x1', 'x2', 'x3', 'y1', 'y2', 'y3', 'z', 'stroke', 'fill', 'stroke-width']; 
    }
    return Triangle;
})();

var Ellipse = (function() {
    function Ellipse(params) {
	Shape.call(this, params);
    }
    Ellipse.prototype = Object.create(Shape.prototype);
    Ellipse.prototype.getRequiredParameters = function() {
	return ['width', 'height', 'x', 'y', 'z', 'stroke', 'fill', 'stroke-width']; 
    }
    return Ellipse;
})();

var Line = (function() {
    function Line(params) {
	Shape.call(this, params);
    }
    Line.prototype = Object.create(Shape.prototype);
    Line.prototype.getRequiredParameters = function() {
	return ['x1', 'x2', 'y1', 'y2', 'z', 'stroke', 'stroke-width']; 
    }
    return Line;
})();

module.exports = {
    'Rectangle':Rectangle,
    'Triangle':Triangle,
    'Ellipse':Ellipse,
    'Line':Line
};
},{}],21:[function(require,module,exports){
var makeSVGElement = function (tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
	if (attrs.hasOwnProperty(k)) {
	    el.setAttribute(k, attrs[k]);
	}
    }
    return el;
};

var extractRGBA = function (str) {
    var ret = [0, 0, 0, 1];
    if (str[0] === "#") {
	// hex, convert to rgba
	var r = parseInt(str[1] + str[2], 16);
	var g = parseInt(str[3] + str[4], 16);
	var b = parseInt(str[5] + str[6], 16);
	str = 'rgba('+r+','+g+','+b+',1)';
    }
    var match = str.match(/^[\s]*rgba\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (match && match.length === 5) {
	ret = [parseFloat(match[1]) / 255,
	    parseFloat(match[2]) / 255,
	    parseFloat(match[3]) / 255,
	    parseFloat(match[4])];
    }
    return ret;
};

var extractColor = function(str) {
    if (str.indexOf("rgb(") > -1) {
	return {
	    'rgb': str,
	    'opacity': 1
	};
    }
    var rgba_arr = extractRGBA(str);
    return {
	'rgb': 'rgb('+rgba_arr[0]*255+','+rgba_arr[1]*255+','+rgba_arr[2]*255+')',
	'opacity': rgba_arr[3]
    };
};

var rectangleToSVG = function (params, offset_x, offset_y) {
    var stroke_color = extractColor(params.stroke);
    var fill_color = extractColor(params.fill);
    return makeSVGElement('rect', {
	width: params.width,
	height: params.height,
	x: parseFloat(params.x) + offset_x,
	y: parseFloat(params.y) + offset_y,
	stroke: stroke_color.rgb,
	'stroke-opacity': stroke_color.opacity,
	'stroke-width': params['stroke-width'],
	fill: fill_color.rgb,
	'fill-opacity': fill_color.opacity
    });
};

var triangleToSVG = function (params, offset_x, offset_y) {
    var stroke_color = extractColor(params.stroke);
    var fill_color = extractColor(params.fill);
    return makeSVGElement('polygon', {
	points: [[parseFloat(params.x1) + offset_x, parseFloat(params.y1) + offset_y], [parseFloat(params.x2) + offset_x, parseFloat(params.y2) + offset_y], [parseFloat(params.x3) + offset_x, parseFloat(params.y3) + offset_y]].map(function (a) {
	    return a[0] + ',' + a[1];
	}).join(' '),
	stroke: stroke_color.rgb,
	'stroke-opacity': stroke_color.opacity,
	'stroke-width': params['stroke-width'],
	fill: fill_color.rgb,
	'fill-opacity': fill_color.opacity
    });
};

var ellipseToSVG = function (params, offset_x, offset_y) {
    var stroke_color = extractColor(params.stroke);
    var fill_color = extractColor(params.fill);
    return makeSVGElement('ellipse', {
	rx: parseFloat(params.width) / 2,
	height: parseFloat(params.height) / 2,
	cx: parseFloat(params.x) + offset_x,
	cy: parseFloat(params.y) + offset_y,
	stroke: stroke_color.rgb,
	'stroke-opacity': stroke_color.opacity,
	'stroke-width': params['stroke-width'],
	fill: fill_color.rgb,
	'fill-opacity': fill_color.opacity
    });
};

var lineToSVG = function (params, offset_x, offset_y) {
    var stroke_color = extractColor(params.stroke);
    return makeSVGElement('line', {
	x1: parseFloat(params.x1) + offset_x,
	y1: parseFloat(params.y1) + offset_y,
	x2: parseFloat(params.x2) + offset_x,
	y2: parseFloat(params.y2) + offset_y,
	stroke: stroke_color.rgb,
	'stroke-opacity': stroke_color.opacity,
	'stroke-width': params['stroke-width'],
    });
};

module.exports = function(oncoprint_shape_computed_params, offset_x, offset_y) {
    var type = oncoprint_shape_computed_params.type;
    if (type === 'rectangle') {
	return rectangleToSVG(oncoprint_shape_computed_params, offset_x, offset_y);
    } else if (type === 'triangle') {
	return triangleToSVG(oncoprint_shape_computed_params, offset_x, offset_y);
    } else if (type === 'ellipse') {
	return ellipseToSVG(oncoprint_shape_computed_params, offset_x, offset_y);
    } else if (type === 'line') {
	return lineToSVG(oncoprint_shape_computed_params, offset_x, offset_y);
    }
};
},{}],22:[function(require,module,exports){
var halfsqrt2 = Math.sqrt(2) / 2;

var extractRGBA = function (str) {
    var ret = [0, 0, 0, 1];
    if (str[0] === "#") {
	// hex, convert to rgba
	var r = parseInt(str[1] + str[2], 16);
	var g = parseInt(str[3] + str[4], 16);
	var b = parseInt(str[5] + str[6], 16);
	str = 'rgba('+r+','+g+','+b+',1)';
    }
    var match = str.match(/^[\s]*rgba\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (match && match.length === 5) {
	ret = [parseFloat(match[1]) / 255,
	    parseFloat(match[2]) / 255,
	    parseFloat(match[3]) / 255,
	    parseFloat(match[4])];
    }
    return ret;
};

var addVertexColor = function (vertex_color_array, rgba_str, n_times) {
    var color = extractRGBA(rgba_str);
    for (var h = 0; h < n_times; h++) {
	vertex_color_array.push(color[0], color[1], color[2], color[3]);
    }
};
    
var rectangleToVertexes = function(params, z_index, target_position_array, target_color_array) {
    // Stroke
    var x = parseFloat(params.x), y = parseFloat(params.y), height = parseFloat(params.height), width = parseFloat(params.width);
    var stroke_width = parseFloat(params['stroke-width']);

    target_position_array.push(x, y, z_index);
    target_position_array.push(x + width, y, z_index);
    target_position_array.push(x + width, y + height, z_index);

    target_position_array.push(x, y, z_index);
    target_position_array.push(x + width, y + height, z_index);
    target_position_array.push(x, y + height, z_index);

    addVertexColor(target_color_array, params.fill, 6);

    if (stroke_width > 0) {
	// left side
	target_position_array.push(x, y, z_index);
	target_position_array.push(x + stroke_width, y, z_index);
	target_position_array.push(x + stroke_width, y + height, z_index);

	target_position_array.push(x, y, z_index);
	target_position_array.push(x + stroke_width, y + height, z_index);
	target_position_array.push(x, y + height, z_index);

	// right side
	target_position_array.push(x + width, y, z_index);
	target_position_array.push(x + width - stroke_width, y, z_index);
	target_position_array.push(x + width - stroke_width, y + height, z_index);

	target_position_array.push(x + width, y, z_index);
	target_position_array.push(x + width - stroke_width, y + height, z_index);
	target_position_array.push(x + width, y + height, z_index);

	// top side
	target_position_array.push(x, y, z_index);
	target_position_array.push(x + width, y, z_index);
	target_position_array.push(x + width, y + stroke_width, z_index);

	target_position_array.push(x, y, z_index);
	target_position_array.push(x + width, y + stroke_width, z_index);
	target_position_array.push(x, y + stroke_width, z_index);

	// bottom side
	target_position_array.push(x, y + height, z_index);
	target_position_array.push(x + width, y + height, z_index);
	target_position_array.push(x + width, y + height - stroke_width, z_index);

	target_position_array.push(x, y + height, z_index);
	target_position_array.push(x + width, y + height - stroke_width, z_index);
	target_position_array.push(x, y + height - stroke_width, z_index);

	addVertexColor(target_color_array, params.stroke, 6 * 4);
    }
};
var triangleToVertexes = function(params, z_index, target_position_array, target_color_array) {
    target_position_array.push(parseFloat(params.x1), parseFloat(params.y1), z_index);
    target_position_array.push(parseFloat(params.x2), parseFloat(params.y2), z_index);
    target_position_array.push(parseFloat(params.x3), parseFloat(params.y3), z_index);

    addVertexColor(target_color_array, params.fill, 3);
};
var ellipseToVertexes = function(params, z_index, target_position_array, target_color_array) {
    var center = {x: parseFloat(params.x) + parseFloat(params.width) / 2, y: parseFloat(params.y) + parseFloat(params.height) / 2};
    var horzrad = parseFloat(params.width) / 2;
    var vertrad = parseFloat(params.height) / 2;

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x + horzrad, center.y, z_index);
    target_position_array.push(center.x + halfsqrt2 * horzrad, center.y + halfsqrt2 * vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x + halfsqrt2 * horzrad, center.y + halfsqrt2 * vertrad, z_index);
    target_position_array.push(center.x, center.y + vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x, center.y + vertrad, z_index);
    target_position_array.push(center.x - halfsqrt2 * horzrad, center.y + halfsqrt2 * vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x - halfsqrt2 * horzrad, center.y + halfsqrt2 * vertrad, z_index);
    target_position_array.push(center.x - horzrad, center.y, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x - horzrad, center.y, z_index);
    target_position_array.push(center.x - halfsqrt2 * horzrad, center.y - halfsqrt2 * vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x - halfsqrt2 * horzrad, center.y - halfsqrt2 * vertrad, z_index);
    target_position_array.push(center.x, center.y - vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x, center.y - vertrad, z_index);
    target_position_array.push(center.x + halfsqrt2 * horzrad, center.y - halfsqrt2 * vertrad, z_index);

    target_position_array.push(center.x, center.y, z_index);
    target_position_array.push(center.x + halfsqrt2 * horzrad, center.y - halfsqrt2 * vertrad, z_index);
    target_position_array.push(center.x + horzrad, center.y, z_index);

    addVertexColor(target_color_array, params.fill, 3 * 8);
};
var lineToVertexes = function(params, z_index, target_position_array, target_color_array) {
    // For simplicity of dealing with webGL we'll implement lines as thin triangle pairs
    var x1 = parseFloat(params.x1);
    var x2 = parseFloat(params.x2);
    var y1 = parseFloat(params.y1);
    var y2 = parseFloat(params.y2);

    if (x1 !== x2) {
	// WLOG make x1,y1 the one on the left
	if (Math.min(x1, x2) === x2) {
	    var tmpx1 = x1;
	    var tmpy1 = y1;
	    x1 = x2;
	    y1 = y2;
	    x2 = tmpx1;
	    y2 = tmpy1;
	}
    }

    var perpendicular_vector = [y2 - y1, x1 - x2];
    var perpendicular_vector_length = Math.sqrt(perpendicular_vector[0] * perpendicular_vector[0] + perpendicular_vector[1] * perpendicular_vector[1]);
    var unit_perp_vector = [perpendicular_vector[0] / perpendicular_vector_length, perpendicular_vector[1] / perpendicular_vector_length];

    var half_stroke_width = parseFloat(params['stroke-width']) / 2;
    var direction1 = [unit_perp_vector[0] * half_stroke_width, unit_perp_vector[1] * half_stroke_width];
    var direction2 = [direction1[0] * -1, direction1[1] * -1];
    var A = [x1 + direction1[0], y1 + direction1[1]];
    var B = [x1 + direction2[0], y1 + direction2[1]];
    var C = [x2 + direction1[0], y2 + direction1[1]];
    var D = [x2 + direction2[0], y2 + direction2[1]];

    target_position_array.push(A[0], A[1], z_index);
    target_position_array.push(B[0], B[1], z_index);
    target_position_array.push(C[0], C[1], z_index);

    target_position_array.push(C[0], C[1], z_index);
    target_position_array.push(D[0], D[1], z_index);
    target_position_array.push(B[0], B[1], z_index);

    addVertexColor(target_color_array, params.stroke, 3 * 2);
};
module.exports = function(oncoprint_shape_computed_params, z_index, target_position_array, target_color_array) {
    // target_position_array is an array with 3-d float vertexes
    // target_color_array is an array with rgba values in [0,1]
    // We pass them in to save on concatenation costs
    
    var type = oncoprint_shape_computed_params.type;
    if (type === "rectangle") {
	return rectangleToVertexes(oncoprint_shape_computed_params, z_index, target_position_array, target_color_array);
    } else if (type === "triangle") {
	return triangleToVertexes(oncoprint_shape_computed_params, z_index, target_position_array, target_color_array);
    } else if (type === "ellipse") {
	return ellipseToVertexes(oncoprint_shape_computed_params, z_index, target_position_array, target_color_array);
    } else if (type === "line") {
	return lineToVertexes(oncoprint_shape_computed_params, z_index, target_position_array, target_color_array);
    }
}
},{}],23:[function(require,module,exports){
var OncoprintToolTip = (function() {
    function OncoprintToolTip($container, params) {
	params = params || {};
	this.$container = $container;
	this.$div = $('<div></div>').appendTo($container).css({'background-color':'rgba(255,255,255,1)', 'position':'absolute', 'display':'none', 'border':'1px solid black', 'max-width':300, 'min-width':150});
	if (params.noselect) {
	    this.$div.addClass("noselect");
	}
	this.hide_timeout_id = undefined;
	this.show_timeout_id = undefined;
	this.center = false;
	
	this.shown = false;
	
	var self = this;
	this.$div.on("mousemove", function(evt) {
	    evt.stopPropagation();
	    cancelScheduledHide(self);
	});
	this.$div.on("mouseleave", function(evt) {
	    evt.stopPropagation();
	    self.hide();
	});
    }
    OncoprintToolTip.prototype.show = function(wait, page_x, page_y, html_str, fade) {
	cancelScheduledHide(this);
	
	if (typeof wait !== 'undefined' && !this.shown) {
	    var self = this;
	    cancelScheduledShow(this);
	    this.show_timeout_id = setTimeout(function() {
		doShow(self, page_x, page_y, html_str, fade);
	    }, wait);
	} else {
	    doShow(this, page_x, page_y, html_str, fade);
	}
    }
    var doShow = function(tt, page_x, page_y, html_str, fade) {
	cancelScheduledShow(tt);
	tt.show_timeout_id = undefined;
	tt.$div.html(html_str);
	if (!fade) {
	    tt.$div.show();
	} else {
	    tt.$div.stop().fadeIn('fast');
	}
	var container_offset = tt.$container.offset();
	var x = page_x - container_offset.left - (tt.center ? tt.$div.width()/2 : 0);
	var y = page_y - container_offset.top - tt.$div.height();
	tt.$div.css({'top':y, 'left':x, 'z-index':9999});
	tt.shown = true;
    };
    var doHide = function(tt, fade) {
	cancelScheduledHide(tt);
	tt.hide_timeout_id = undefined;
	if (!fade) {
	    tt.$div.hide();
	} else {
	    tt.$div.fadeOut();
	}
	tt.shown = false;
    };
    var cancelScheduledShow = function(tt) {
	clearTimeout(tt.show_timeout_id);
	tt.show_timeout_id = undefined;
    };
    var cancelScheduledHide = function(tt) {
	clearTimeout(tt.hide_timeout_id);
	tt.hide_timeout_id = undefined;
    };
    OncoprintToolTip.prototype.showIfNotAlreadyGoingTo = function(wait, page_x, page_y, html_str) {
	if (typeof this.show_timeout_id === 'undefined') {
	    this.show(wait, page_x, page_y, html_str);
	}
    }
    OncoprintToolTip.prototype.hideIfNotAlreadyGoingTo = function(wait) {
	if (typeof this.hide_timeout_id === 'undefined') {
	    this.hide(wait);
	}
    };
    OncoprintToolTip.prototype.hide = function(wait) {
	cancelScheduledShow(this);
	
	if (!this.shown) {
	    return;
	}
	
	if (typeof wait !== 'undefined') {
	    var self = this;
	    cancelScheduledHide(this);
	    this.hide_timeout_id = setTimeout(function() {
		doHide(self);
	    }, wait);
	} else {
	    doHide(this);
	}
    }
    OncoprintToolTip.prototype.fadeIn = function(wait, page_x, page_y, html_str) {
	this.show(wait, page_x, page_y, html_str, true);
    }
    return OncoprintToolTip;
})();

module.exports = OncoprintToolTip;
},{}],24:[function(require,module,exports){
var svgfactory = require('./svgfactory.js');

var OncoprintTrackInfoView = (function () {
    function OncoprintTrackInfoView($div) {
	this.$div = $div;
	this.$ctr = $('<div></div>').css({'position': 'absolute', 'overflow-y':'hidden', 'overflow-x':'hidden'}).appendTo(this.$div);
	this.$text_ctr = $('<div></div>').css({'position':'absolute'}).appendTo(this.$ctr);
	this.base_font_size = 12;
	this.font_family = 'Arial';
	this.font_weight = 'bold';
	this.width = 0;

	this.rendering_suppressed = false;
    }

    var renderAllInfo = function (view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.$text_ctr.empty();

	var tracks = model.getTracks();
	view.minimum_track_height = Number.POSITIVE_INFINITY;
	for (var i = 0; i < tracks.length; i++) {
	    view.minimum_track_height = Math.min(view.minimum_track_height, model.getTrackHeight(tracks[i]));
	}

	view.width = 40;

	var label_tops = model.getLabelTops();
	scroll(view, model.getVertScroll());
	var font_size = view.getFontSize();
	for (var i = 0; i < tracks.length; i++) {
	    var $new_label = $('<span>').css({'position': 'absolute',
		'font-family': view.font_family,
		'font-weight': view.font_weight,
		'font-size': font_size})
		    .addClass('noselect');
	    $new_label.text(model.getTrackInfo(tracks[i]));
	    $new_label.appendTo(view.$text_ctr);
	    var top = label_tops[tracks[i]] + (model.getCellHeight(tracks[i]) - $new_label.outerHeight()) / 2;
	    $new_label.css({'top': top + 'px'});
	    view.width = Math.max(view.width, $new_label[0].clientWidth);
	}
    };
    var scroll = function (view, scroll_y) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.$text_ctr.css({'top': -scroll_y});
    };

    var resize = function (view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.$div.css({'width': view.getWidth(), 'height': model.getCellViewHeight()});
	view.$ctr.css({'width': view.getWidth(), 'height': model.getCellViewHeight()});
    };

    OncoprintTrackInfoView.prototype.getFontSize = function () {
	return Math.max(Math.min(this.base_font_size, this.minimum_track_height), 7);
    }
    OncoprintTrackInfoView.prototype.getWidth = function () {
	return this.width + 10;
    }
    OncoprintTrackInfoView.prototype.addTracks = function (model) {
	renderAllInfo(this, model);
	resize(this, model);
    }
    OncoprintTrackInfoView.prototype.moveTrack = function (model) {
	renderAllInfo(this, model);
	resize(this, model);
    }
    OncoprintTrackInfoView.prototype.removeTrack = function (model) {
	renderAllInfo(this, model);
	resize(this, model);
    }
    OncoprintTrackInfoView.prototype.setTrackInfo = function (model) {
	renderAllInfo(this, model);
	resize(this, model);
    }
    OncoprintTrackInfoView.prototype.setScroll = function(model) {
	this.setVertScroll(model);
    }
    OncoprintTrackInfoView.prototype.setHorzScroll = function (model) {
    }
    OncoprintTrackInfoView.prototype.setVertScroll = function (model) {
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackInfoView.prototype.setZoom = function(model) {
	this.setVertZoom(model);
    }
    
    OncoprintTrackInfoView.prototype.setViewport = function(model) {
	renderAllInfo(this, model);
	resize(this, model);
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackInfoView.prototype.setVertZoom = function (model) {
	renderAllInfo(this, model);
	resize(this, model);
    }
    OncoprintTrackInfoView.prototype.suppressRendering = function () {
	this.rendering_suppressed = true;
    }
    OncoprintTrackInfoView.prototype.releaseRendering = function (model) {
	this.rendering_suppressed = false;
	renderAllInfo(this, model);
	resize(this, model);
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackInfoView.prototype.toSVGGroup = function (model, offset_x, offset_y) {
	var root = svgfactory.group((offset_x || 0), (offset_y || 0));
	var cell_tops = model.getCellTops();
	var tracks = model.getTracks();
	for (var i = 0; i < tracks.length; i++) {
	    var track_id = tracks[i];
	    var y = cell_tops[track_id] + model.getCellHeight(track_id) / 2;
	    var info = model.getTrackInfo(track_id);
	    var text_elt = svgfactory.text(info, 0, y, this.font_size, this.font_family, this.font_weight, "bottom");
	    text_elt.setAttribute("dy", "0.35em");
	    root.appendChild(text_elt);
	}
	return root;
    }
    return OncoprintTrackInfoView;
})();

module.exports = OncoprintTrackInfoView;
},{"./svgfactory.js":27}],25:[function(require,module,exports){
var OncoprintTrackOptionsView = (function () {
    function OncoprintTrackOptionsView($div, moveUpCallback, moveDownCallback, removeCallback, sortChangeCallback) {
	// removeCallback: function(track_id)
	var position = $div.css('position');
	if (position !== 'absolute' && position !== 'relative') {
	    console.log("WARNING: div passed to OncoprintTrackOptionsView must be absolute or relative positioned - layout problems will occur");
	}

	this.moveUpCallback = moveUpCallback;
	this.moveDownCallback = moveDownCallback;
	this.removeCallback = removeCallback; // function(track_id) { ... }
	this.sortChangeCallback = sortChangeCallback; // function(track_id, dir) { ... }

	this.$div = $div;
	this.$ctr = $('<div></div>').css({'position': 'absolute', 'overflow-y':'hidden', 'overflow-x':'hidden'}).appendTo(this.$div);
	this.$buttons_ctr = $('<div></div>').css({'position':'absolute'}).appendTo(this.$ctr);
	this.$dropdown_ctr = $('<div></div>').css({'position': 'absolute'}).appendTo(this.$div);

	this.img_size;

	this.rendering_suppressed = false;

	this.track_options_$elts = {};

	this.menu_shown = {};

	var self = this;
	$(document).click(function() {
	    $(self).trigger('oncoprint-track-options-view.click-out');
	});

	this.interaction_disabled = false;
    }

    var renderAllOptions = function (view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	$(view).off('oncoprint-track-options-view.click-out');
	$(view).on('oncoprint-track-options-view.click-out', function() {
	     for (var track_id in view.track_options_$elts) {
		if (view.track_options_$elts.hasOwnProperty(track_id)) {
		    hideTrackMenu(view, track_id);
		}
	    }
	});
	
	view.$buttons_ctr.empty();
	view.$dropdown_ctr.empty();
	scroll(view, model.getVertScroll());

	var tracks = model.getTracks();
	var minimum_track_height = Number.POSITIVE_INFINITY;
	for (var i = 0; i < tracks.length; i++) {
	    minimum_track_height = Math.min(minimum_track_height, model.getTrackHeight(tracks[i]));
	}
	view.img_size = Math.floor(minimum_track_height * 0.75);

	for (var i = 0; i < tracks.length; i++) {
	    renderTrackOptions(view, model, tracks[i]);
	}
    };

    var scroll = function (view, scroll_y) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.$buttons_ctr.css({'top': -scroll_y});
	view.$dropdown_ctr.css({'top': -scroll_y});
    };

    var resize = function (view, model) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.$div.css({'width': view.getWidth(), 'height': model.getCellViewHeight()});
	view.$ctr.css({'width': view.getWidth(), 'height': model.getCellViewHeight()});
    };

    var hideTrackMenu = function (view, track_id) {
	view.menu_shown[track_id] = false;
	var $elts = view.track_options_$elts[track_id];
	$elts.$dropdown.css({'z-index': 1});
	$elts.$dropdown.css({'border': '1px solid rgba(125,125,125,0)'});
	$elts.$img.css({'border': '1px solid rgba(125,125,125,0)'});
	$elts.$dropdown.fadeOut(100);
    };

    var showTrackMenu = function (view, track_id) {
	view.menu_shown[track_id] = true;
	var $elts = view.track_options_$elts[track_id];
	$elts.$dropdown.css({'z-index': 10});
	$elts.$dropdown.css({'border': '1px solid rgba(125,125,125,1)'});
	$elts.$img.css({'border': '1px solid rgba(125,125,125,1)'});
	$elts.$dropdown.fadeIn(100);
    };

    var hideMenusExcept = function (view, track_id) {
	track_id = track_id.toString();
	for (var other_track_id in view.track_options_$elts) {
	    if (view.track_options_$elts.hasOwnProperty(other_track_id)) {
		if (other_track_id === track_id) {
		    continue;
		}
		hideTrackMenu(view, other_track_id);
	    }
	}
    };

    var $makeDropdownOption = function (text, weight, callback) {
	return $('<li>').text(text).css({'font-weight': weight, 'font-size': 12, 'cursor': 'pointer', 'border-bottom': '1px solid rgba(0,0,0,0.3)'})
		.click(callback)
		.hover(function () {
		    $(this).css({'background-color': 'rgb(200,200,200)'});
		}, function () {
		    $(this).css({'background-color': 'rgba(255,255,255,0)'});
		});
    };
    var $makeDropdownSeparator = function () {
	return $('<li>').css({'border-top': '1px solid black'});
    };

    var renderTrackOptions = function (view, model, track_id) {
	var $div, $img, $dropdown;
	var top = model.getZoomedTrackTops(track_id);
	$div = $('<div>').appendTo(view.$buttons_ctr).css({'position': 'absolute', 'left': '0px', 'top': top + 'px'});
	$img = $('<img/>').appendTo($div).attr({'src': 'images/menudots.svg', 'width': view.img_size, 'height': view.img_size}).css({'float': 'left', 'cursor': 'pointer', 'border': '1px solid rgba(125,125,125,0)'});
	$dropdown = $('<ul>').appendTo(view.$dropdown_ctr).css({'position':'absolute', 'width': 120, 'display': 'none', 'list-style-type': 'none', 'padding-left': '6', 'padding-right': '6', 'float': 'right', 'background-color': 'rgb(255,255,255)',
								'left':'0px', 'top': top + view.img_size + 'px'});
	view.track_options_$elts[track_id] = {'$div': $div, '$img': $img, '$dropdown': $dropdown};

	$img.hover(function (evt) {
	    if (!view.menu_shown[track_id]) {
		$(this).css({'border': '1px solid rgba(125,125,125,0.3)'});
	    }
	}, function (evt) {
	    if (!view.menu_shown[track_id]) {
		$(this).css({'border': '1px solid rgba(125,125,125,0)'});
	    }
	});
	$img.click(function (evt) {
	    evt.stopPropagation();
	    if ($dropdown.is(":visible")) {
		hideTrackMenu(view, track_id);
	    } else {
		showTrackMenu(view, track_id);
	    }
	    hideMenusExcept(view, track_id);
	});

	$dropdown.append($makeDropdownOption('Move up', 'normal', function (evt) {
	    evt.stopPropagation();
	    view.moveUpCallback(track_id);
	}));
	$dropdown.append($makeDropdownOption('Move down', 'normal', function (evt) {
	    evt.stopPropagation();
	    view.moveDownCallback(track_id);
	}));
	if (model.isTrackRemovable(track_id)) {
	    $dropdown.append($makeDropdownOption('Remove track', 'normal', function (evt) {
		evt.stopPropagation();
		view.removeCallback(track_id);
	    }));
	}
	if (model.isTrackSortDirectionChangeable(track_id)) {
	    $dropdown.append($makeDropdownSeparator());
	    var $sort_inc_li;
	    var $sort_dec_li;
	    var $dont_sort_li;
	    $sort_inc_li = $makeDropdownOption('Sort a-Z', (model.getTrackSortDirection(track_id) === 1 ? 'bold' : 'normal'), function (evt) {
		evt.stopPropagation();
		$sort_inc_li.css('font-weight', 'bold');
		$sort_dec_li.css('font-weight', 'normal');
		$dont_sort_li.css('font-weight', 'normal');
		view.sortChangeCallback(track_id, 1);
	    });
	    $sort_dec_li = $makeDropdownOption('Sort Z-a', (model.getTrackSortDirection(track_id) === -1 ? 'bold' : 'normal'), function (evt) {
		evt.stopPropagation();
		$sort_inc_li.css('font-weight', 'normal');
		$sort_dec_li.css('font-weight', 'bold');
		$dont_sort_li.css('font-weight', 'normal');
		view.sortChangeCallback(track_id, -1);
	    });
	    $dont_sort_li = $makeDropdownOption('Don\'t sort track', (model.getTrackSortDirection(track_id) === 0 ? 'bold' : 'normal'), function (evt) {
		evt.stopPropagation();
		$sort_inc_li.css('font-weight', 'normal');
		$sort_dec_li.css('font-weight', 'normal');
		$dont_sort_li.css('font-weight', 'bold');
		view.sortChangeCallback(track_id, 0);
	    });
	    $dropdown.append($sort_inc_li);
	    $dropdown.append($sort_dec_li);
	    $dropdown.append($dont_sort_li);
	}
    };

    OncoprintTrackOptionsView.prototype.enableInteraction = function () {
	this.interaction_disabled = false;
    }
    OncoprintTrackOptionsView.prototype.disableInteraction = function () {
	this.interaction_disabled = true;
    }
    OncoprintTrackOptionsView.prototype.suppressRendering = function () {
	this.rendering_suppressed = true;
    }
    OncoprintTrackOptionsView.prototype.releaseRendering = function (model) {
	this.rendering_suppressed = false;
	renderAllOptions(this, model);
	resize(this, model);
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackOptionsView.prototype.setScroll = function(model) {
	this.setVertScroll(model);
    }
    OncoprintTrackOptionsView.prototype.setHorzScroll = function (model) {
    }
    OncoprintTrackOptionsView.prototype.setVertScroll = function (model) {
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackOptionsView.prototype.setZoom = function(model) {
	this.setVertZoom(model);
    }
    OncoprintTrackOptionsView.prototype.setVertZoom = function (model) {
	renderAllOptions(this, model);
	resize(this, model);
    }
    OncoprintTrackOptionsView.prototype.setViewport = function(model) {
	renderAllOptions(this, model);
	resize(this, model);
	scroll(this, model.getVertScroll());
    }
    OncoprintTrackOptionsView.prototype.getWidth = function () {
	return 10 + this.img_size;
    }
    OncoprintTrackOptionsView.prototype.addTracks = function (model) {
	renderAllOptions(this, model);
	resize(this, model);
    }
    OncoprintTrackOptionsView.prototype.moveTrack = function (model) {
	renderAllOptions(this, model);
	resize(this, model);
    }
    OncoprintTrackOptionsView.prototype.removeTrack = function (model, track_id) {
	delete this.track_options_$elts[track_id];
	renderAllOptions(this, model);
	resize(this, model);
    }
    return OncoprintTrackOptionsView;
})();

module.exports = OncoprintTrackOptionsView;
},{}],26:[function(require,module,exports){
var gl_matrix = require('gl-matrix');
var svgfactory = require('./svgfactory.js');
var shapeToVertexes = require('./oncoprintshapetovertexes.js');
var CachedProperty = require('./CachedProperty.js');

// TODO: antialiasing

var sgndiff = function(a,b) {
    if (a < b) {
	return -1;
    } else if (a > b) {
	return 1;
    } else {
	return 0;
    }
};

var arrayFindIndex = function(arr, callback, start_index) {
    start_index = start_index || 0;
    for (var i=start_index; i<arr.length; i++) {
	if (callback(arr[i])) {
	    return i;
	}
    }
    return -1;
};

var getNewCanvas = function(view) {
    var old_canvas = view.$canvas[0];
    var new_canvas = old_canvas.cloneNode();
    var parent_node = old_canvas.parentNode;
    parent_node.removeChild(old_canvas);
    parent_node.insertBefore(new_canvas, view.$overlay_canvas[0]);
    view.$canvas = $(new_canvas);
};
var getWebGLCanvasContext = function (view) {
    try {
	var canvas = view.$canvas[0];
	var ctx = canvas.getContext("experimental-webgl", {alpha: false, antialias: view.antialias});
	ctx.clearColor(1.0, 1.0, 1.0, 1.0);
	ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
	ctx.viewportWidth = canvas.width;
	ctx.viewportHeight = canvas.height;
	ctx.viewport(0, 0, ctx.viewportWidth, ctx.viewportHeight);
	ctx.enable(ctx.DEPTH_TEST);
	ctx.enable(ctx.BLEND);
	ctx.blendEquation(ctx.FUNC_ADD);
	ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
	ctx.depthMask(false);
	
	return ctx;
    } catch (e) {
	return null;
    }
};

var createShaderProgram = function (view, vertex_shader, fragment_shader) {
    var program = view.ctx.createProgram();
    view.ctx.attachShader(program, vertex_shader);
    view.ctx.attachShader(program, fragment_shader);

    view.ctx.linkProgram(program);

    var success = view.ctx.getProgramParameter(program, view.ctx.LINK_STATUS);
    if (!success) {
	var msg = view.ctx.getProgramInfoLog(program);
	view.ctx.deleteProgram(program);
	throw "Unable to link shader program: " + msg;
    }

    return program;
};
var createShader = function (view, source, type) {
    var shader = view.ctx.createShader(view.ctx[type]);
    view.ctx.shaderSource(shader, source);
    view.ctx.compileShader(shader);

    var success = view.ctx.getShaderParameter(shader, view.ctx.COMPILE_STATUS);
    if (!success) {
	var msg = view.ctx.getShaderInfoLog(shader);
	view.ctx.deleteShader(shader);
	throw "Unable to compile shader: " + msg;
    }

    return shader;
};

var OncoprintWebGLCellView = (function () {
    function OncoprintWebGLCellView($container, $canvas, $overlay_canvas, $dummy_scroll_div_contents, model, tooltip, highlight_area_callback) {
	this.$container = $container;
	this.$canvas = $canvas;
	this.$overlay_canvas = $overlay_canvas;
	
	this.supersampling_ratio = 2;
	
	this.antialias = true;
	this.antialias_on_cell_width_thresh = 5;
	
	getWebGLContextAndSetUpMatricesAndShaders(this);
	getOverlayContextAndClear(this);
	this.visible_area_width = $canvas[0].width;
	
	var self = this;
	
	this.tooltip = tooltip;
	this.tooltip.center = true;
	
	this.scroll_x = 0;
	this.scroll_y = 0;
	this.$dummy_scroll_div_contents = $dummy_scroll_div_contents;
	this.dummy_scroll_div_client_size = new CachedProperty({'width':$dummy_scroll_div_contents.parent()[0].clientWidth, 'height':$dummy_scroll_div_contents.parent()[0].clientHeight}, function() {
	    return {'width':$dummy_scroll_div_contents.parent()[0].clientWidth, 'height':$dummy_scroll_div_contents.parent()[0].clientHeight};
	});

	this.identified_shape_list_list = {};

	this.vertex_position_array = {}; // track_id -> vertex list (float list, item size 3)
	this.vertex_color_array = {}; // track_id -> color list (float list, item size 4)
	this.vertex_column_array = {}; // track_id -> number list (float list, item size 1)
	
	this.vertex_position_buffer = {}; // track_id -> gl.createBuffer()
	this.vertex_color_buffer = {}; // track_id -> gl.createBuffer()
	this.vertex_column_buffer = {}; // track_id -> gl.createBuffer()
	
	this.id_to_first_vertex_index = {}; // track_id -> id -> vertex index of first vertex corresponding to this id

	this.rendering_suppressed = false;
	
	this.highlight_area_callback = (typeof highlight_area_callback === 'undefined' ? function() {} : highlight_area_callback); // function(left, right) { ... }
	
	(function initializeOverlayEvents(self) {
	    var dragging = false;
	    var drag_diff_minimum = 10;
	    var drag_start_x;
	    var drag_end_x;
	    var prev_overlapping_cell = null;
	    
	    var dragIsValid = function(drag_start_x, drag_end_x) {
		return Math.abs(drag_start_x - drag_end_x) >= drag_diff_minimum;
	    };
	    var executeDrag = function() {
		if (!dragging) {
		    return;
		}
		dragging = false;
		
		if (!dragIsValid(drag_start_x, drag_end_x)) {
		    return;
		}
		var left = Math.min(drag_start_x, drag_end_x);
		var right = Math.max(drag_start_x, drag_end_x);
		self.highlight_area_callback(left+self.scroll_x, right+self.scroll_x);
	    };
	    
	    $(document).on("mousemove", function () {
		if (self.rendering_suppressed) {
		    return;
		}
		clearOverlay(self);
		tooltip.hide();
	    });
	    var mouseInOverlayCanvas = function(mouse_x, mouse_y) {
		var width = self.$overlay_canvas.width();
		var height = self.$overlay_canvas.height();
		return (mouse_x >= 0 && mouse_x < width && mouse_y >= 0 && mouse_y < height);
	    };
	    self.$overlay_canvas.on("mousemove", function(evt) {
		evt.stopPropagation();
		if (self.rendering_suppressed) {
		    return;
		}
		clearOverlay(self);
		var offset = self.$overlay_canvas.offset();
		var mouseX = evt.pageX - offset.left;
		var mouseY = evt.pageY - offset.top;
		if (!mouseInOverlayCanvas(mouseX, mouseY)) {
		    return;
		}
		if (!dragging) {
		    var overlapping_cell = model.getOverlappingCell(mouseX + self.scroll_x, mouseY + self.scroll_y);
		    var overlapping_datum = (overlapping_cell === null ? null : model.getTrackDatum(overlapping_cell.track, overlapping_cell.id));
		    if (overlapping_datum !== null) {
			var left = model.getZoomedColumnLeft(overlapping_cell.id) - self.scroll_x;
			overlayStrokeRect(self, left, model.getCellTops(overlapping_cell.track) - self.scroll_y, model.getCellWidth(), model.getCellHeight(overlapping_cell.track), "rgba(0,0,0,1)");
			var tracks = model.getTracks();
			for (var i=0; i<tracks.length; i++) {
			    if (model.getTrackDatum(tracks[i], overlapping_cell.id) !== null) {
				overlayStrokeRect(self, left, model.getCellTops(tracks[i]) - self.scroll_y, model.getCellWidth(), model.getCellHeight(tracks[i]), "rgba(0,0,0,0.5)");
			    }
			}
			tooltip.show(250, model.getZoomedColumnLeft(overlapping_cell.id) + model.getCellWidth() / 2 + offset.left - self.scroll_x, model.getCellTops(overlapping_cell.track) + offset.top - self.scroll_y, model.getTrackTooltipFn(overlapping_cell.track)(overlapping_datum));
			prev_overlapping_cell = overlapping_cell;
		    } else {
			tooltip.hideIfNotAlreadyGoingTo(150);
			overlapping_cell = null;
		    }
		} else {
		    overlapping_cell = null;
		    drag_end_x = mouseX;
		    var left = Math.min(mouseX, drag_start_x);
		    var right = Math.max(mouseX, drag_start_x);
		    var drag_rect_fill = dragIsValid(drag_start_x, drag_end_x) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)';
		    overlayFillRect(self, left, 0, right-left, model.getCellViewHeight(), drag_rect_fill);
		}
	    });
	    
	    self.$overlay_canvas.on("mousedown", function(evt) {
		var offset = self.$overlay_canvas.offset();
		var mouseX = evt.pageX - offset.left;
		var mouseY = evt.pageY - offset.top;
		if (!mouseInOverlayCanvas(mouseX, mouseY)) {
		    return;
		}
		dragging = true;
		drag_start_x = evt.pageX - self.$overlay_canvas.offset().left;
		drag_end_x = drag_start_x;
		
		tooltip.hide();
	    });
	    self.$overlay_canvas.on("mouseup", function(evt) {
		var offset = self.$overlay_canvas.offset();
		var mouseX = evt.pageX - offset.left;
		var mouseY = evt.pageY - offset.top;
		if (!mouseInOverlayCanvas(mouseX, mouseY)) {
		    return;
		}
		executeDrag();
	    });
	    self.$overlay_canvas.on("mouseleave", function(evt) {
		executeDrag();
	    });
	    
	})(this);
	
	$dummy_scroll_div_contents.parent().scroll(function() {
	    clearOverlay(self);
	});
    }
    
    var overlayStrokeRect = function(view, x, y, width, height, color) {
	var ctx = view.overlay_ctx;
	ctx.strokeStyle = color;
	ctx.strokeWidth = 10;
	ctx.strokeRect(view.supersampling_ratio*x, view.supersampling_ratio*y, view.supersampling_ratio*width, view.supersampling_ratio*height);
    };
    
    var overlayFillRect = function(view, x, y, width, height, color) {
	var ctx = view.overlay_ctx;
	ctx.fillStyle = color;
	ctx.fillRect(view.supersampling_ratio*x, view.supersampling_ratio*y, view.supersampling_ratio*width, view.supersampling_ratio*height);
    };
    
    var clearOverlay = function(view) {
	view.overlay_ctx.fillStyle = "rgba(0,0,0,0)";
	view.overlay_ctx.clearRect(0,0,view.$overlay_canvas[0].width, view.$overlay_canvas[0].height);
    };
    
    var getOverlayContextAndClear = function(view) {
	view.overlay_ctx = view.$overlay_canvas[0].getContext('2d');
	clearOverlay(view);
    };
    
    var getWebGLContextAndSetUpMatrices = function(view) {
	view.ctx = getWebGLCanvasContext(view);
	(function initializeMatrices(self) {
	    var mvMatrix = gl_matrix.mat4.create();
	    gl_matrix.mat4.lookAt(mvMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
	    self.mvMatrix = mvMatrix;

	    var pMatrix = gl_matrix.mat4.create();
	    gl_matrix.mat4.ortho(pMatrix, 0, self.ctx.viewportWidth, self.ctx.viewportHeight, 0, -5, 1000); // y axis inverted so that y increases down like SVG
	    self.pMatrix = pMatrix;
	})(view);
    };
    var getWebGLContextAndSetUpMatricesAndShaders = function(view) {
	getWebGLContextAndSetUpMatrices(view);
	(function initializeShaders(self) {// Initialize shaders
	    var vertex_shader_source = ['attribute vec3 aVertexPosition;',
		'attribute vec4 aVertexColor;',
		'attribute float aVertexOncoprintColumn;',
		
		'uniform float columnWidth;',
		'uniform float scrollX;',
		'uniform float zoomX;',
		'uniform float scrollY;',
		'uniform float zoomY;',
		'uniform mat4 uMVMatrix;',
		'uniform mat4 uPMatrix;',
		'uniform float offsetY;',
		'uniform float supersamplingRatio;',
		'varying vec4 vColor;',
		'void main(void) {',
		'	gl_Position = vec4(aVertexPosition, 1.0);',
		'	gl_Position[0] += aVertexOncoprintColumn*columnWidth;',
		'	gl_Position *= vec4(zoomX, zoomY, 1.0, 1.0);',
		'	gl_Position[1] += offsetY;', // offset is given zoomed
		'	gl_Position -= vec4(scrollX, scrollY, 0.0, 0.0);',
		'	gl_Position[0] *= supersamplingRatio;',
		'	gl_Position[1] *= supersamplingRatio;',
		'	gl_Position = uPMatrix * uMVMatrix * gl_Position;',
		'	vColor = aVertexColor;',
		'}'].join('\n');
	    var fragment_shader_source = ['precision mediump float;',
		'varying vec4 vColor;',
		'',
		'void main(void) {',
		'   gl_FragColor = vColor;',
		'}'].join('\n');
	    var vertex_shader = createShader(self, vertex_shader_source, 'VERTEX_SHADER');
	    var fragment_shader = createShader(self, fragment_shader_source, 'FRAGMENT_SHADER');

	    var shader_program = createShaderProgram(self, vertex_shader, fragment_shader);
	    shader_program.vertexPositionAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexPosition');
	    self.ctx.enableVertexAttribArray(shader_program.vertexPositionAttribute);
	    shader_program.vertexColorAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexColor');
	    self.ctx.enableVertexAttribArray(shader_program.vertexColorAttribute);
	    shader_program.vertexOncoprintColumnAttribute = self.ctx.getAttribLocation(shader_program, 'aVertexOncoprintColumn');
	    self.ctx.enableVertexAttribArray(shader_program.vertexOncoprintColumnAttribute);

	    shader_program.pMatrixUniform = self.ctx.getUniformLocation(shader_program, 'uPMatrix');
	    shader_program.mvMatrixUniform = self.ctx.getUniformLocation(shader_program, 'uMVMatrix');
	    shader_program.columnWidthUniform = self.ctx.getUniformLocation(shader_program, 'columnWidth');
	    shader_program.scrollXUniform = self.ctx.getUniformLocation(shader_program, 'scrollX');
	    shader_program.scrollYUniform = self.ctx.getUniformLocation(shader_program, 'scrollY');
	    shader_program.zoomXUniform = self.ctx.getUniformLocation(shader_program, 'zoomX');
	    shader_program.zoomYUniform = self.ctx.getUniformLocation(shader_program, 'zoomY');
	    shader_program.offsetYUniform = self.ctx.getUniformLocation(shader_program, 'offsetY');
	    shader_program.supersamplingRatioUniform = self.ctx.getUniformLocation(shader_program, 'supersamplingRatio');

	    self.shader_program = shader_program;
	})(view);
    };

    var resizeAndClear = function(view, model) {
	var height = model.getCellViewHeight();
	var total_width = view.getTotalWidth(model);
	var visible_area_width = view.visible_area_width;
	var scrollbar_slack = 20;
	view.$dummy_scroll_div_contents.css({'min-width':total_width, 'min-height':model.getOncoprintHeight()});
	view.$dummy_scroll_div_contents.parent().css({'height': height + scrollbar_slack, 'width': visible_area_width + scrollbar_slack}); // add space for scrollbars
	view.dummy_scroll_div_client_size.update();
	view.$canvas[0].height = view.supersampling_ratio*height;
	view.$canvas[0].style.height = height + 'px';
	view.$overlay_canvas[0].height = view.supersampling_ratio*height;
	view.$overlay_canvas[0].style.height = height + 'px';
	view.$canvas[0].width = view.supersampling_ratio*visible_area_width;
	view.$canvas[0].style.width = visible_area_width + 'px';
	view.$overlay_canvas[0].width = view.supersampling_ratio*visible_area_width;
	view.$overlay_canvas[0].style.width = visible_area_width + 'px';
	view.$container.css('height', height);
	view.$container.css('width', visible_area_width);
	getWebGLContextAndSetUpMatrices(view);
	getOverlayContextAndClear(view);
    };
    var renderAllTracks = function (view, model, dont_resize) {
	if (view.rendering_suppressed) {
	    return;
	}
	
	var scroll_x = view.scroll_x;
	var scroll_y = view.scroll_y;
	var zoom_x = model.getHorzZoom();
	var zoom_y = model.getVertZoom();
	
	var viewport = view.getViewportOncoprintSpace(model);
	var window_left = viewport.left;
	var window_right = viewport.right;
	var window_top = viewport.top;
	var window_bottom = viewport.bottom;
	var id_to_left = model.getColumnLeft();
	var id_order = model.getIdOrder();
	var horz_first_id_in_window_index = arrayFindIndex(id_order, function(id) { return id_to_left[id] >= window_left; });
	var horz_first_id_after_window_index = arrayFindIndex(id_order, function(id) { return id_to_left[id] > window_right; }, horz_first_id_in_window_index+1);
	var horz_first_id_in_window = (horz_first_id_in_window_index < 1 ? id_order[0] : id_order[horz_first_id_in_window_index - 1]);
	var horz_first_id_after_window = (horz_first_id_after_window_index === -1 ? null : id_order[horz_first_id_after_window_index]);
	
	if (!dont_resize) {
	    resizeAndClear(view, model);
	}
	view.ctx.clearColor(1.0,1.0,1.0,1.0);
	view.ctx.clear(view.ctx.COLOR_BUFFER_BIT | view.ctx.DEPTH_BUFFER_BIT);
	
	var tracks = model.getTracks();
	for (var i = 0; i < tracks.length; i++) {
	    var track_id = tracks[i];
	    var cell_top = model.getCellTops(track_id);
	    var cell_height = model.getCellHeight(track_id);
	    if ((cell_top / zoom_y) >= window_bottom || ((cell_top + cell_height)/zoom_y) < window_top) {
		// vertical clipping
		continue;
	    }
	    var buffers = getTrackBuffers(view, track_id);
	    if (buffers.position.numItems === 0) {
		continue;
	    }
	    var first_index = view.id_to_first_vertex_index[track_id][horz_first_id_in_window];
	    var first_index_out = horz_first_id_after_window === null ? buffers.position.numItems : view.id_to_first_vertex_index[track_id][horz_first_id_after_window];
	    
	    view.ctx.useProgram(view.shader_program);
	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.position);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexPositionAttribute, buffers.position.itemSize, view.ctx.FLOAT, false, 0, 0);

	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.color);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexColorAttribute, buffers.color.itemSize, view.ctx.FLOAT, false, 0, 0);
	    
	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, buffers.column);
	    view.ctx.vertexAttribPointer(view.shader_program.vertexOncoprintColumnAttribute, buffers.column.itemSize, view.ctx.FLOAT, false, 0, 0);

	    view.ctx.uniformMatrix4fv(view.shader_program.pMatrixUniform, false, view.pMatrix);
	    view.ctx.uniformMatrix4fv(view.shader_program.mvMatrixUniform, false, view.mvMatrix);
	    view.ctx.uniform1f(view.shader_program.columnWidthUniform, model.getCellWidth(true) + model.getCellPadding(true));
	    view.ctx.uniform1f(view.shader_program.scrollXUniform, scroll_x);
	    view.ctx.uniform1f(view.shader_program.scrollYUniform, scroll_y);
	    view.ctx.uniform1f(view.shader_program.zoomXUniform, zoom_x);
	    view.ctx.uniform1f(view.shader_program.zoomYUniform, zoom_y);
	    view.ctx.uniform1f(view.shader_program.offsetYUniform, cell_top);
	    view.ctx.uniform1f(view.shader_program.supersamplingRatioUniform, view.supersampling_ratio);
	    
	    view.ctx.drawArrays(view.ctx.TRIANGLES, first_index, first_index_out - first_index);
	}
    };
    
    var clearTrackPositionAndColorBuffers = function(view, model, track_id) {
	var tracks_to_clear;
	if (typeof track_id === 'undefined') {
	    tracks_to_clear = model.getTracks();
	} else {
	    tracks_to_clear = [track_id];
	}
	for (var i=0; i<tracks_to_clear.length; i++) {
	    if (view.vertex_position_buffer[tracks_to_clear[i]]) {
		delete view.vertex_position_buffer[tracks_to_clear[i]];
	    }
	    if (view.vertex_color_buffer[tracks_to_clear[i]]) {
		delete view.vertex_color_buffer[tracks_to_clear[i]];
	    }
	}
    };
    
     var clearTrackColumnBuffers = function(view, model, track_id) {
	var tracks_to_clear;
	if (typeof track_id === 'undefined') {
	    tracks_to_clear = model.getTracks();
	} else {
	    tracks_to_clear = [track_id];
	}
	for (var i=0; i<tracks_to_clear.length; i++) {
	    if (view.vertex_column_buffer[tracks_to_clear[i]]) {
		delete view.vertex_column_buffer[tracks_to_clear[i]];
	    }
	}
    };
    
    
    var getTrackBuffers = function(view, track_id) {
	if (typeof view.vertex_position_buffer[track_id] === 'undefined') {
	    var vertex_position_buffer = view.ctx.createBuffer();
	    var vertex_color_buffer = view.ctx.createBuffer();
	    var vertex_position_array = view.vertex_position_array[track_id];
	    var vertex_color_array = view.vertex_color_array[track_id];
	    
	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_position_buffer);
	    view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_position_array), view.ctx.STATIC_DRAW);
	    vertex_position_buffer.itemSize = 3;
	    vertex_position_buffer.numItems = vertex_position_array.length / vertex_position_buffer.itemSize;

	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_color_buffer);
	    view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_color_array), view.ctx.STATIC_DRAW);
	    vertex_color_buffer.itemSize = 4;
	    vertex_color_buffer.numItems = vertex_color_array.length / vertex_color_buffer.itemSize;
	    
	    view.vertex_position_buffer[track_id] = vertex_position_buffer;
	    view.vertex_color_buffer[track_id] = vertex_color_buffer;
	}
	
	if (typeof view.vertex_column_buffer[track_id] === 'undefined') {
	    var vertex_column_buffer = view.ctx.createBuffer();
	    var vertex_column_array = view.vertex_column_array[track_id];
	    view.ctx.bindBuffer(view.ctx.ARRAY_BUFFER, vertex_column_buffer);
	    view.ctx.bufferData(view.ctx.ARRAY_BUFFER, new Float32Array(vertex_column_array), view.ctx.STATIC_DRAW);
	    vertex_column_buffer.itemSize = 1;
	    vertex_column_buffer.numItems = vertex_column_array.length / vertex_column_buffer.itemSize;
	    
	    view.vertex_column_buffer[track_id] = vertex_column_buffer;
	}
	return {'position':view.vertex_position_buffer[track_id],
		'color': view.vertex_color_buffer[track_id],
		'column': view.vertex_column_buffer[track_id]};
    };
    
    var computeVertexColumns = function(view, model, track_id) {
	if (view.rendering_suppressed) {
	    return;
	}
	var num_items = view.vertex_position_array[track_id].length / 3;
	var id_to_first_vertex_index = view.id_to_first_vertex_index[track_id];
	var id_to_index = model.getVisibleIdToIndexMap();
	var id_and_first_vertex = Object.keys(id_to_first_vertex_index).map(function(id) { return [id, id_to_first_vertex_index[id]]; })
				.sort(function(a,b) { return sgndiff(a[1], b[1]); });
	var vertex_column_array = [];
	for (var i=0; i<id_and_first_vertex.length; i++) {
	    var num_to_add = (i === id_and_first_vertex.length - 1 ? num_items : id_and_first_vertex[i+1][1]) - id_and_first_vertex[i][1];
	    var column = id_to_index[id_and_first_vertex[i][0]];
	    for (var j=0; j<num_to_add; j++) {
		vertex_column_array.push(column);
	    }
	}
	view.vertex_column_array[track_id] = vertex_column_array;
	clearTrackColumnBuffers(view, model, track_id);
    };
    
    var computeVertexPositionsAndVertexColors = function (view, model, track_id) {
	if (view.rendering_suppressed) {
	    return;
	}
	var identified_shape_list_list = view.identified_shape_list_list[track_id];
	var id_to_index = model.getIdToIndexMap();
	identified_shape_list_list.sort(function(a, b) {
	    return sgndiff(id_to_index[a.id], id_to_index[b.id]);
	});
	var halfsqrt2 = Math.sqrt(2) / 2;
	// Compute vertex and color arrays
	var vertex_position_array = [];
	var vertex_color_array = [];
	var id_to_first_vertex_index = {};
	
	for (var i = 0; i < identified_shape_list_list.length; i++) {
	    var shape_list = identified_shape_list_list[i].shape_list;
	    var id = identified_shape_list_list[i].id;

	    id_to_first_vertex_index[id] = vertex_position_array.length / 3;
	    
	    for (var j = 0; j < shape_list.length; j++) {
		var shape = shape_list[j];
		shapeToVertexes(shape, j, vertex_position_array, vertex_color_array);
	    }
	}
	view.vertex_position_array[track_id] = vertex_position_array;//track to vertex_position_array;
	view.vertex_color_array[track_id] = vertex_color_array;//track to vertex_color_array;
	view.id_to_first_vertex_index[track_id] = id_to_first_vertex_index;
	
	clearTrackPositionAndColorBuffers(view, model, track_id);
    };
    
    var getShapes = function(view, model, track_id) {
	if (view.rendering_suppressed) {
	    return;
	}
	view.identified_shape_list_list[track_id] = model.getIdentifiedShapeListList(track_id, true, true);
    };
    
    var refreshCanvas = function(view, model) {
	clearTrackPositionAndColorBuffers(view, model); // whenever you get a new context, you have to get new buffers
	clearTrackColumnBuffers(view, model);
	getNewCanvas(view);
	getWebGLContextAndSetUpMatricesAndShaders(view, model);
    };
    
    OncoprintWebGLCellView.prototype.getViewportOncoprintSpace = function(model) {
	var scroll_x = this.scroll_x;
	var scroll_y = this.scroll_y;
	var zoom_x = model.getHorzZoom();
	var zoom_y = model.getVertZoom();
	
	var window_left = Math.round(scroll_x / zoom_x);
	var window_right = Math.round((scroll_x + this.visible_area_width) / zoom_x);
	var window_top = Math.round(scroll_y / zoom_y);
	var window_bottom = Math.round((scroll_y + model.getCellViewHeight()) / zoom_y);
	
	return {
	    'top': window_top,
	    'bottom': window_bottom,
	    'left': window_left,
	    'right': window_right
	};
    }
    OncoprintWebGLCellView.prototype.isUsable = function () {
	return this.ctx !== null;
    }
    OncoprintWebGLCellView.prototype.removeTrack = function (model, track_id) {
	if (this.rendering_suppressed) {
	    return;
	};
	delete this.identified_shape_list_list[track_id];
	delete this.vertex_position_array[track_id];
	delete this.vertex_color_array[track_id];
	delete this.vertex_column_array[track_id];
	delete this.id_to_first_vertex_index[track_id];
	delete this.vertex_position_buffer[track_id];
	delete this.vertex_color_buffer[track_id];
	delete this.vertex_column_buffer[track_id];
	
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.moveTrack = function (model) {
	if (this.rendering_suppressed) {
	    return;
	};
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.addTracks = function (model, track_ids) {
	if (this.rendering_suppressed) {
	    return;
	};
	for (var i=0; i<track_ids.length; i++) {
	    getShapes(this, model, track_ids[i]);
	    computeVertexPositionsAndVertexColors(this, model, track_ids[i]);
	    computeVertexColumns(this, model, track_ids[i]);
	}
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.setIdOrder = function(model, ids) {
	if (this.rendering_suppressed) {
	    return;
	};
	var track_ids = model.getTracks();
	for (var i=0; i<track_ids.length; i++) {
	    computeVertexColumns(this, model, track_ids[i]);
	}
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.setTrackGroupSortPriority = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.sort = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	var track_ids = model.getTracks();
	for (var i=0; i<track_ids.length; i++) {
	    computeVertexPositionsAndVertexColors(this, model, track_ids[i]); // need to recompute because the vertexes are in sorted order for clipping
	    computeVertexColumns(this, model, track_ids[i]);
	}
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.suppressRendering = function() {
	this.rendering_suppressed = true;
    }
    OncoprintWebGLCellView.prototype.releaseRendering = function(model) {
	this.rendering_suppressed = false;
	var track_ids = model.getTracks();
	for (var i=0; i<track_ids.length; i++) {
	    getShapes(this, model, track_ids[i]);
	    computeVertexPositionsAndVertexColors(this, model, track_ids[i]);
	    computeVertexColumns(this, model, track_ids[i]);
	}
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.hideIds = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	var track_ids = model.getTracks();
	for (var i=0; i<track_ids.length; i++) {
	    computeVertexColumns(this, model, track_ids[i]);
	}
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.setTrackData = function(model, track_id) {
	if (this.rendering_suppressed) {
	    return;
	};
	getShapes(this, model, track_id);
	computeVertexPositionsAndVertexColors(this, model, track_id);
	computeVertexColumns(this, model, track_id);
	renderAllTracks(this, model);
    }
     OncoprintWebGLCellView.prototype.setRuleSet = function(model, target_track_id) {
	 if (this.rendering_suppressed) {
	    return;
	};
	getShapes(this, model, target_track_id);
	computeVertexPositionsAndVertexColors(this, model, target_track_id);
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.shareRuleSet = function(model, target_track_id) {
	if (this.rendering_suppressed) {
	    return;
	};
	getShapes(this, model, target_track_id);
	computeVertexPositionsAndVertexColors(this, model, target_track_id);
	renderAllTracks(this, model);
    }
    OncoprintWebGLCellView.prototype.setSortConfig = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	this.sort(model);
    }
    
    OncoprintWebGLCellView.prototype.setHorzScroll = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	this.setScroll(model);
    }
    
    OncoprintWebGLCellView.prototype.setVertScroll = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	this.setScroll(model);
    }
    
    OncoprintWebGLCellView.prototype.setScroll = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	this.scroll_x = model.getHorzScroll();
	this.scroll_y = model.getVertScroll();
	renderAllTracks(this, model, true);
    }
    
    var updateAntialiasSetting = function(view, model) {
	var cell_width = model.getCellWidth();
	if (cell_width < view.antialias_on_cell_width_thresh) {
	    if (!view.antialias) {
		view.antialias = true;
		refreshCanvas(view, model);
	    }
	} else {
	    if (view.antialias) {
		view.antialias = false;
		refreshCanvas(view, model);
	    }
	}
    };
    
    OncoprintWebGLCellView.prototype.setZoom = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	updateAntialiasSetting(this, model);
	renderAllTracks(this, model);
    }
    
    OncoprintWebGLCellView.prototype.setHorzZoom = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	updateAntialiasSetting(this, model);
	renderAllTracks(this, model);
    }
    
    OncoprintWebGLCellView.prototype.setVertZoom = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	renderAllTracks(this, model);
    }
    
    OncoprintWebGLCellView.prototype.setViewport = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	this.scroll_x = model.getHorzScroll();
	this.scroll_y = model.getVertScroll();
	updateAntialiasSetting(this, model);
	renderAllTracks(this, model);
    }
    
    OncoprintWebGLCellView.prototype.getTotalWidth = function(model, base) {
	return (model.getCellWidth(base) + model.getCellPadding(base))*model.getIdOrder().length;
    }
    
    OncoprintWebGLCellView.prototype.getWidth = function() {
	return this.visible_area_width;
    }
    
    OncoprintWebGLCellView.prototype.setWidth = function(w, model) {
	this.visible_area_width = w;
	if (this.rendering_suppressed) {
	    return;
	};
	renderAllTracks(this, model); // in the process it will call resizeAndClear
    }
    
    OncoprintWebGLCellView.prototype.setCellPaddingOn = function(model) {
	if (this.rendering_suppressed) {
	    return;
	};
	renderAllTracks(this, model);
    }
    
    OncoprintWebGLCellView.prototype.getDummyScrollDivClientSize = function() {
	return this.dummy_scroll_div_client_size.get();
    }
    
    OncoprintWebGLCellView.prototype.toSVGGroup = function(model, offset_x, offset_y) {
	var root = svgfactory.group((offset_x || 0), (offset_y || 0));
	var cell_tops = model.getCellTops();
	var tracks = model.getTracks();
	var zoomedColumnLeft = model.getZoomedColumnLeft();
	for (var i=0; i<tracks.length; i++) {
	    var track_id = tracks[i];
	    var offset_y = cell_tops[track_id];
	    var identified_shape_list_list = model.getIdentifiedShapeListList(track_id, false, true);
	    for (var j=0; j<identified_shape_list_list.length; j++) {
		var id_sl = identified_shape_list_list[j];
		var id = id_sl.id;
		var sl = id_sl.shape_list;
		var offset_x = zoomedColumnLeft[id];
		if (typeof offset_x === 'undefined') {
		    // hidden id
		    continue;
		}
		for (var h=0; h<sl.length; h++) {
		    root.appendChild(svgfactory.fromShape(sl[h], offset_x, offset_y));
		}
	    }
	}
	return root;
    }
    return OncoprintWebGLCellView;
})();

module.exports = OncoprintWebGLCellView;

},{"./CachedProperty.js":11,"./oncoprintshapetovertexes.js":22,"./svgfactory.js":27,"gl-matrix":1}],27:[function(require,module,exports){
var makeSVGElement = require('./makesvgelement.js');
var shapeToSVG = require('./oncoprintshapetosvg.js');

var extractRGBA = function (str) {
    var ret = [0, 0, 0, 1];
    if (str[0] === "#") {
	// hex, convert to rgba
	var r = parseInt(str[1] + str[2], 16);
	var g = parseInt(str[3] + str[4], 16);
	var b = parseInt(str[5] + str[6], 16);
	str = 'rgba('+r+','+g+','+b+',1)';
    }
    var match = str.match(/^[\s]*rgba\([\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9]+)[\s]*,[\s]*([0-9.]+)[\s]*\)[\s]*$/);
    if (match && match.length === 5) {
	ret = [parseFloat(match[1]) / 255,
	    parseFloat(match[2]) / 255,
	    parseFloat(match[3]) / 255,
	    parseFloat(match[4])];
    }
    return ret;
};

var extractColor = function(str) {
    if (str.indexOf("rgb(") > -1) {
	return {
	    'rgb': str,
	    'opacity': 1
	};
    }
    var rgba_arr = extractRGBA(str);
    return {
	'rgb': 'rgb('+rgba_arr[0]*255+','+rgba_arr[1]*255+','+rgba_arr[2]*255+')',
	'opacity': rgba_arr[3]
    };
};

module.exports = {
    text: function(content,x,y,size,family,weight,alignment_baseline) {
	size = size || 12;
	var alignment_baseline_y_offset = size;
	if (alignment_baseline === "middle") {
	    alignment_baseline_y_offset = size/2;
	} else if (alignment_baseline === "bottom") {
	    alignment_baseline_y_offset = 0;
	}
	var elt = makeSVGElement('text', {
	    'x':(x || 0),
	    'y':(y || 0) + alignment_baseline_y_offset,
	    'font-size':size,
	    'font-family':(family || 'serif'),
	    'font-weight':(weight || 'normal'),
	    'text-anchor':'start',
	});
	elt.textContent = content + '';
	return elt;
    },
    group: function(x,y) {
	x = x || 0;
	y = y || 0;
	return makeSVGElement('g', {
	    'transform':'translate('+x+','+y+')',
	    'x':x,
	    'y':y
	});
    },
    svg: function(width, height) {
	return makeSVGElement('svg', {
	    'width':(width || 0), 
	    'height':(height || 0),
	});
    },
    wrapText: function(in_dom_text_svg_elt, width) {
	var text = in_dom_text_svg_elt.textContent;
	in_dom_text_svg_elt.textContent = "";
	
	var words = text.split(" ");
	var dy = 0;
	var tspan = makeSVGElement('tspan', {'x':'0', 'dy':dy});
	in_dom_text_svg_elt.appendChild(tspan);
	
	var curr_tspan_words = [];
	for (var i=0; i<words.length; i++) {
	    curr_tspan_words.push(words[i]);
	    tspan.textContent = curr_tspan_words.join(" ");
	    if (tspan.getComputedTextLength() > width) {
		tspan.textContent = curr_tspan_words.slice(0, curr_tspan_words.length-1).join(" ");
		dy = in_dom_text_svg_elt.getBBox().height;
		curr_tspan_words = [words[i]];
		tspan = makeSVGElement('tspan', {'x':'0', 'dy':dy});
		in_dom_text_svg_elt.appendChild(tspan);
		tspan.textContent = words[i];
	    }
	}
    },
    fromShape: function(oncoprint_shape_computed_params, offset_x, offset_y) {
	return shapeToSVG(oncoprint_shape_computed_params, offset_x, offset_y);
    },
    polygon: function(points, fill) {
	return makeSVGElement('polygon', {'points': points, 'fill':fill});
    },
    rect: function(x,y,width,height,fill) {
	return makeSVGElement('rect', {'x':x, 'y':y, 'width':width, 'height':height, 'fill':fill});
    },
    bgrect: function(width, height, fill) {
	return makeSVGElement('rect', {'width':width, 'height':height, 'fill':fill});
    },
    path: function(points, stroke, fill) {
	points = points.map(function(pt) { return pt.join(","); });
	points[0] = 'M'+points[0];
	for (var i=1; i<points.length; i++) {
	    points[i] = 'L'+points[i];
	}
	stroke = extractColor(stroke);
	fill = extractColor(fill);
	return makeSVGElement('path', {
	    'd': points.join(" "),
	    'stroke': stroke.rgb,
	    'stroke-opacity': stroke.opacity,
	    'fill': fill.rgb,
	    'fill-opacity': fill.opacity
	});
    }
};



},{"./makesvgelement.js":13,"./oncoprintshapetosvg.js":21}],28:[function(require,module,exports){
var Oncoprint = require('./oncoprint.js');
$(document).ready(function() {
	window.oncoprint = new Oncoprint('#oncoprint');
	var data = [];
	while (data.length < 1000) {
		data.push({'sample':Math.random(), data:Math.random()*10});
	}
	var rule_set_params = {
		type: 'bar',
		value_key: 'data',
		value_range:[0,10],
		legend_label: 'Data'
	};
	window.oncoprint.addTracks([{'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
		    {'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
		    {'data':data, 'rule_set_params': rule_set_params, 'data_id_key':'sample'},
		    {'data':data, 'rule_set_params': rule_set_params, 'target_group':1, 'data_id_key':'sample'},
		    {'data':data, 'rule_set_params':rule_set_params, 'target_group':2, 'data_id_key':'sample'}]);
		
	window.addTracks = function() {
	    var tracks_to_add = [];
	    for (var i=0; i<30; i++) {
		tracks_to_add.push({'data':data, 'rule_set_params':rule_set_params, 'target_group':3, 'data_id_key':'sample'});
	    }
	    window.oncoprint.addTracks(tracks_to_add);
	}
});

},{"./oncoprint.js":14}]},{},[28]);
