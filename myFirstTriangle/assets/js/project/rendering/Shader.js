class Shader {
    static init(gl) {
        Helper.colorLog("Shaders: Initializing...");

        let vertexShaderText = [
            "precision mediump float;",
            "",
            "attribute vec2 vertexPosition;",
            "",
            "void main() {",
            "   gl_Position = vec4(vertexPosition, 0.0, 1.0);",
            "}"
        ].join('\n');

        let fragmentShaderText = [
            "precision mediump float;",
            "",
            "void main() {",
            "   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
            "}"
        ].join('\n');

        Helper.colorLog("Shaders: Applying shader code...");

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);

        Helper.debug("Shaders: Compiling...");

        gl.compileShader(vertexShader);

        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            Helper.colorLog("FATAL: Shaders: while compiling vertex shader: \n"
                + gl.getShaderInfoLog(vertexShader), "red");
            Helper.colorLog("Shaders: Initializing failed!");
            return;
        }

        gl.compileShader(fragmentShader);

        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            Helper.colorLog("FATAL: Shaders: while compiling fragment shader: \n"
                + gl.getShaderInfoLog(fragmentShader), "red");
            Helper.colorLog("Shaders: Initializing failed!");
            return;
        }

        Helper.colorLog("Shaders: Initializing done!");

        Helper.colorLog("Shaders: Applying shaders...");
        Helper.debug("Shaders: creating program...");
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        Helper.debug("Shaders: Linking program...");
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            Helper.colorLog("FATAL: Shaders: while linking shaders: \n"
                + gl.getProgramInfoLog(program), "red");
            Helper.colorLog("Shaders: Applying failed!");
            return;
        }

        if(Settings.IS_DEV_VERSION) {
            Helper.colorLog("Shaders: Validating program...");
            gl.validateProgram(program);

            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                Helper.colorLog("FATAL: Shaders: while validating shaders program: \n"
                    + gl.getProgramInfoLog(program), "red");
                Helper.colorLog("Shaders: Applying failed!");
                return;
            }
        }

        Helper.colorLog("Shaders: Applying done!");

        return program;
    }
}