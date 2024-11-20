import { canvas, xMove, yMove } from "./constants.js";
import { draw } from "./draw.js";
import { sideX, sideY } from "./constants.js";
export function resizeCanvas() {
    // let length = firstSideLength.value;
    canvas.width = window.innerWidth - 40;
    xMove.max = window.innerWidth - 40 - sideX.value;
    
    if (window.innerWidth < 555) {
        canvas.height = window.innerHeight - 220;
        yMove.max = window.innerHeight - 220 - sideY.value;
    } 
    else {
        canvas.height = window.innerHeight - 120;
        yMove.max = window.innerHeight - 120 - sideY.value;
    }  
    // console.log("resize canvas");
    
    draw();
    // console.log("draw called");
}