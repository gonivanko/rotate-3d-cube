import { canvas, xMove, yMove } from "./constants.js";
import { draw } from "./draw.js";
import { sideX, sideY } from "./constants.js";
export function resizeCanvas() {
    const padding = 20;
    const gap = 20;
    const mediumFormSize = 120;
    canvas.width = window.innerWidth - padding * 2;
    xMove.max = window.innerWidth - padding * 2 - sideX.value;
    
    if (window.innerWidth < 750) {
        canvas.height = window.innerHeight - mediumFormSize - 2 * padding - gap;
        yMove.max = window.innerHeight - mediumFormSize - 2 * padding - gap - sideY.value;
    } 
    else {
        canvas.height = window.innerHeight - padding * 2 - gap - mediumFormSize / 2;
        yMove.max = window.innerHeight - padding * 2 - gap - mediumFormSize / 2 - sideY.value;
    }  
    // console.log("resize canvas");
    
    draw();
    // console.log("draw called");
}