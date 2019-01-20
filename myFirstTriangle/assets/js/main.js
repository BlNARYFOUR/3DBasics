"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(e) {
    let vars = initWebGL();
    initResizing(vars.canvas, vars.gl);
    EventHandlers.onResize(null, vars.canvas, vars.gl);

    let renderProgram = Shader.init(vars.gl);
    drawTriangle(vars.gl, renderProgram);
}

function initWebGL() {
    Helper.colorLog("WebGL: Initializing...");

    let canvas = document.querySelector("canvas");
    let gl = canvas.getContext("webgl");

    if(!gl) {
        console.warn("WebGL not supported, falling back on experimental-WebGL...");
        gl = canvas.getContext("experimental-webgl");
    }

    if(!gl) {
        Helper.colorLog("FATAL: Your browser does not support WebGL!", "red");
        Helper.colorLog("WebGL: Initializing failed!");
        return;
    }

    Helper.colorLog("WebGL: Initialization done!");

    return {canvas: canvas, gl: gl};
}

function initResizing(canvas, gl) {
    Helper.debug("Resizing: Initializing...");
    window.addEventListener("resize", (e) => EventHandlers.onResize(e, canvas, gl));
    Helper.debug("Resizing: Initializing done!");
}

function drawTriangle(gl, program) {
    gl.clearColor(0.66, 0.90, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    Helper.debug("Rendering: Creating buffer...");

    // X, Y
    let triangleVertices = [
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ];

    let triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    Helper.debug("Rendering: Buffer created!");

    Helper.debug("Rendering: Applying vertices...");

    let positionAttribLocation = gl.getAttribLocation(program, "vertexPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,                 // Attribute location
        2,                                      // Number of elements per attribute
        gl.FLOAT,                               // Type of elements
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,     // Size of an individual vertex
        0                                       // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);

    Helper.debug("Rendering: Vertices applied!");

    Helper.debug("Rendering: Rendering...");
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}



