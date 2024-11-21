export function multiplyMatrices(matrix1, matrix2) {
    const matrix1Rows = matrix1.length;
    const matrix1Columns = matrix1[0].length;
    const matrix2Rows = matrix2.length;
    const matrix2Columns = matrix2[0].length;
    let result = Array.from({ length: matrix1Rows }, () => Array(matrix2Columns).fill(0));

    if (matrix1Columns != matrix2Rows) {
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

export function getRadians(degrees) {
    return degrees * Math.PI / 180;
}

export function getInitialFigure(lengthA=150, lengthB=150, height=150, type="parallelepiped") {
    if (type === "parallelepiped") {
        const a = [
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
    else if (type === "pyramid") {
        const a = [
            [0, 0, 0, 1],
            [lengthA, 0, 0, 1],
            [lengthA, lengthB, 0, 1],
            [0, lengthB, 0, 1],
            [lengthA / 2, lengthB / 2, height, 1]
        ];
        return a;
    }
    
}

export function getCenter(figure, type="parallelepiped") {
    let x =0, y = 0, z = 0;
    if (type === "parallelepiped") {
        x = (figure[0][0] + figure[6][0]) / 2;
        y = (figure[0][1] + figure[6][1]) / 2;
        z = (figure[0][2] + figure[6][2]) / 2;
    }
    else if (type === "pyramid") {
        x = ((figure[0][0] + figure[2][0]) / 2 + figure[4][0]) / 2;
        y = ((figure[0][1] + figure[2][1]) / 2 + figure[4][1]) / 2;
        z = ((figure[0][2] + figure[2][2]) / 2 + figure[4][2]) / 2;
    }
    return [x, y, z];
}

export function moveFigure(figure, l=0, m=0, n=0) {
    const f = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [l, m, n, 1]
    ];
    const movedFigure = multiplyMatrices(figure, f);
    return movedFigure
}

export function rotateFigure(figure, thetaX, thetaY) {
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