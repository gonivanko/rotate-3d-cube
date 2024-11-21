import { xMove, yMove, xRotate, yRotate, canvas, sideX, sideY, height, figureSelect} from "./constants.js";

import { getInitialFigure, multiplyMatrices, getCenter, moveFigure, rotateFigure } from "./mathFunctions.js";

export function draw() {
    // let length = sideX.value;
    let figureType = figureSelect.value;
    let figure = getInitialFigure(sideX.value, sideY.value, height.value, figureType);
    

    function displayParallelepiped(displayedCube) {
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
    function displayPyramid(displayedPyramid) {
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.beginPath();
            ctx.moveTo(displayedPyramid[0][0], displayedPyramid[0][1]);
            ctx.lineTo(displayedPyramid[1][0], displayedPyramid[1][1]);
            ctx.lineTo(displayedPyramid[2][0], displayedPyramid[2][1]);
            ctx.lineTo(displayedPyramid[3][0], displayedPyramid[3][1]);
    
            ctx.lineTo(displayedPyramid[0][0], displayedPyramid[0][1]);
            ctx.lineTo(displayedPyramid[4][0], displayedPyramid[4][1]);
            ctx.lineTo(displayedPyramid[1][0], displayedPyramid[1][1]);
    
            ctx.lineTo(displayedPyramid[4][0], displayedPyramid[4][1]);
            ctx.lineTo(displayedPyramid[2][0], displayedPyramid[2][1]);

            ctx.lineTo(displayedPyramid[4][0], displayedPyramid[4][1]);
            ctx.lineTo(displayedPyramid[3][0], displayedPyramid[3][1]);

            ctx.lineTo(displayedPyramid[4][0], displayedPyramid[4][1]);
            ctx.lineTo(displayedPyramid[0][0], displayedPyramid[0][1]);
            ctx.closePath();
            ctx.stroke();
        }
    }
    
    const [figureX, figureY, figureZ] = getCenter(figure, figureType);
    figure = moveFigure(figure, -figureX, -figureY, -figureZ);
    figure = rotateFigure(figure, parseFloat(xRotate.value) || 0, parseFloat(yRotate.value) || 0);
    
    figure = moveFigure(figure, parseFloat(xMove.value) + figureX || figureX, parseFloat(yMove.value) + figureY || figureY);

    if (figureType === "parallelepiped") displayParallelepiped(figure);
    else if (figureType === "pyramid") displayPyramid(figure);
    
}