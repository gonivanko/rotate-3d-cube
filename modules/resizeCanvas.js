import { canvas, xMove, yMove } from "./constants.js";
import { draw } from "./draw.js";
export function resizeCanvas() {
    canvas.width = window.innerWidth - 40;
    xMove.max = window.innerWidth - 40 - length;
    
    if (window.innerWidth < 555) {
        canvas.height = window.innerHeight - 220;
        yMove.max = window.innerHeight - 220 - length;
    } 
    else {
        canvas.height = window.innerHeight - 120;
        yMove.max = window.innerHeight - 120 - length;
    }  
    // console.log("resize canvas");
    
    draw();
    // console.log("draw called");
}