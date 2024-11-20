import { xMove, yMove, xRotate, yRotate } from "./constants.js";
import { draw } from "./draw.js";
import { transformDegrees } from "./mouse.js";

let previousX = [0, 0];
let previousY = [0, 0];

export function handleTouchStart(event) {
    console.log("Touches number:", event.touches.length);
    previousX[0] = event.touches[0].clientX;
    previousY[0] = event.touches[0].clientY;
    if (event.touches.length === 2) {
        previousX[1] = event.touches[1].clientX;
        previousY[1] = event.touches[1].clientY;
    }
}

export function handleTouchMove(event) {

    if (event.touches.length === 1) {
        event.preventDefault();
        console.log(event);
        let deltaX = event.touches[0].clientX - previousX[0];
        let deltaY = event.touches[0].clientY - previousY[0];

        xMove.value = parseInt(xMove.value || "0", 10) + deltaX;
        yMove.value = parseInt(yMove.value || "0", 10) + deltaY;
        previousX[0] = event.touches[0].clientX;
        previousY[0] = event.touches[0].clientY;
        draw();
    }
    else 
    if (event.touches.length === 2) {
        event.preventDefault();
        console.log(event);        
        let deltaX = [event.touches[0].clientX - previousX[0], event.touches[1].clientX - previousX[1]];
        let deltaY = [event.touches[0].clientY - previousY[0], event.touches[1].clientY - previousY[1]];
        xRotate.value = transformDegrees(parseInt(xRotate.value || "0", 10) + (deltaY[0] + deltaY[1]) * 360 / canvas.height);
        yRotate.value = transformDegrees(parseInt(yRotate.value || "0", 10) + (deltaX[0] + deltaX[1]) * 360 / canvas.width);
        draw();
        previousX = [event.touches[0].clientX, event.touches[1].clientX];
        previousY = [event.touches[0].clientY, event.touches[1].clientY];
    }
}