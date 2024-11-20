import {xMove, yMove, xRotate, yRotate, canvas} from "./modules/constants.js"
import {draw} from "./modules/draw.js"
import {resizeCanvas} from "./modules/resizeCanvas.js"
import {handleKeyDown, handleKeyUp} from "./modules/keyboard.js"
import {handleMouseDown, handleMouseMove, handleMouseUp} from "./modules/mouse.js"


xMove.addEventListener("change", draw);
yMove.addEventListener("change", draw);
xRotate.addEventListener("change", draw);
yRotate.addEventListener("change", draw);
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);