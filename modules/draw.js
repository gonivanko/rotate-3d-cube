import { xMove, yMove, xRotate, yRotate, canvas, sideX, sideY, sideZ} from "./constants.js";

function multiplyMatrices(matrix1, matrix2) {
    const matrix1Rows = matrix1.length;
    const matrix1Columns = matrix1[0].length;
    const matrix2Rows = matrix2.length;
    const matrix2Columns = matrix2[0].length;
    let result = Array.from({ length: matrix1Rows }, () => Array(matrix2Columns).fill(0));

    if (matrix1Columns != matrix2Rows) {
        // // console.log("Error, can't multiply matrices");
    }
    else {
        for (let i = 0; i < matrix1Rows; i++) {
            for (let j = 0; j < matrix2Columns; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1Columns; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
    }
    return result;
}

function getRadians(degrees) {
    return degrees * Math.PI / 180;
}

function getInitialCube(lengthA=150, lengthB=150, height=150) {
    let a = [
        [0, 0, 0, 1],
        [lengthA, 0, 0, 1],
        [lengthA, lengthB, 0, 1],
        [0, lengthB, 0, 1],
        [0, 0, height, 1],
        [lengthA, 0, height, 1],
        [lengthA, lengthB, height, 1],
        [0, lengthB, height, 1]
    ];
    return a;
}

function getCubeCenter(cube) {
    let x = (cube[0][0] + cube[6][0]) / 2;
    let y = (cube[0][1] + cube[6][1]) / 2;
    let z = (cube[0][2] + cube[6][2]) / 2;
    return [x, y, z];
}

function moveCube(figure, l=0, m=0, n=0) {
    const f = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [l, m, n, 1]
    ];
    const movedFigure = multiplyMatrices(figure, f);
    return movedFigure
}

function axonometricPerspective(figure, thetaX, thetaY) {
    const thetaX1 = getRadians(thetaX);
    const thetaY1 = getRadians(thetaY);

    const xRotationMatrix = [
        [1, 0, 0, 0],
        [0, Math.cos(thetaX1), -Math.sin(thetaX1), 0],
        [0, Math.sin(thetaX1), Math.cos(thetaX1), 0],
        [0, 0, 0, 1]
    ];

    const yRotationMatrix = [
        [Math.cos(thetaY1), 0, Math.sin(thetaY1), 0],
        [0, 1, 0, 0],
        [-Math.sin(thetaY1), 0, Math.cos(thetaY1), 0],
        [0, 0, 0, 1]
    ];
    let rotatedFigure = multiplyMatrices(figure, yRotationMatrix);
    rotatedFigure = multiplyMatrices(rotatedFigure, xRotationMatrix);
    return rotatedFigure
}

export function draw() {
    // let length = sideX.value;
    let cube = getInitialCube(sideX.value, sideY.value, sideZ.value);

    function displayCube(displayedCube) {
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.beginPath();
            ctx.moveTo(displayedCube[0][0], displayedCube[0][1]);
            ctx.lineTo(displayedCube[1][0], displayedCube[1][1]);
            ctx.lineTo(displayedCube[2][0], displayedCube[2][1]);
            ctx.lineTo(displayedCube[3][0], displayedCube[3][1]);
    
            ctx.lineTo(displayedCube[0][0], displayedCube[0][1]);
            ctx.lineTo(displayedCube[4][0], displayedCube[4][1]);
            ctx.lineTo(displayedCube[5][0], displayedCube[5][1]);
            ctx.lineTo(displayedCube[1][0], displayedCube[1][1]);
    
            ctx.lineTo(displayedCube[2][0], displayedCube[2][1]);
            ctx.lineTo(displayedCube[6][0], displayedCube[6][1]);
            ctx.lineTo(displayedCube[7][0], displayedCube[7][1]);
            ctx.lineTo(displayedCube[3][0], displayedCube[3][1]);
    
            ctx.lineTo(displayedCube[2][0], displayedCube[2][1]);
            ctx.lineTo(displayedCube[6][0], displayedCube[6][1]);
            ctx.lineTo(displayedCube[5][0], displayedCube[5][1]);
            ctx.lineTo(displayedCube[4][0], displayedCube[4][1]);
            ctx.lineTo(displayedCube[7][0], displayedCube[7][1]);
            ctx.lineTo(displayedCube[3][0], displayedCube[3][1]);
            ctx.lineTo(displayedCube[0][0], displayedCube[0][1]);
            ctx.closePath();
            ctx.stroke();
        }
    }
    const [cubeX, cubeY, cubeZ] = getCubeCenter(cube);
    // // console.log(cubeX, cubeY, cubeZ);
    cube = moveCube(cube, -cubeX, -cubeY, -cubeZ);
    cube = axonometricPerspective(cube, parseFloat(xRotate.value) || 0, parseFloat(yRotate.value) || 0);
    
    cube = moveCube(cube, parseFloat(xMove.value) + cubeX || cubeX, parseFloat(yMove.value) + cubeY || cubeY);

    
    // console.log(cube);


    displayCube(cube);
    
}