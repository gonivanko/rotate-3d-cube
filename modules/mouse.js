import { xRotate, yRotate } from "./constants.js";
import { draw } from "./draw.js";
let previousX = 0;
let previousY = 0;
let isRotating = false;


export function handleMouseDown(e) {
    previousX = e.offsetX;
    previousY = e.offsetY;
    isRotating = true;
}

export function transformDegrees(degrees) {
    return degrees >= 0 ? degrees % 360 : Math.ceil(-degrees / 360) * 360 + degrees;
}

export function handleMouseMove(e) {
    if (isRotating) {
        const deltaX = e.offsetX - previousX;
        const deltaY = e.offsetY - previousY;

        yRotate.value = transformDegrees(parseInt(yRotate.value) + deltaX * 360 / canvas.width);
        xRotate.value = transformDegrees(parseInt(xRotate.value) + deltaY * 360 / canvas.height);
        
        previousX = e.offsetX;
        previousY = e.offsetY;
        draw();
    }
}

export function handleMouseUp() {
    if (isRotating) {
        isRotating = false;
    }
}