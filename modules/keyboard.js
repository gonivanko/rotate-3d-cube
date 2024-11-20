import { xMove, yMove } from "./constants.js";
import { draw } from "./draw.js";
let intervalId;
const keysPressed = new Set(); 
let movementX = 0;
let movementY = 0;
const movementValue = 2;

export function handleKeyDown(event) {
    keysPressed.add(event.key);
    
    // }
    if (keysPressed.has("w")) {
        movementY = -movementValue;
    }
    else if (keysPressed.has("s")) {
        movementY = movementValue;
    }

    if (keysPressed.has("a")) {
        movementX = -movementValue;
    }
    else if (keysPressed.has("d")) {
        movementX = movementValue;
    }
    if (!intervalId) { 
        intervalId = setInterval(() => {
            xMove.value = parseInt(xMove.value || "0", 10) + movementX;
            yMove.value = parseInt(yMove.value || "0", 10) + movementY;
            draw(); // Redraw the cube
            // console.log("xMove.value, yMove.value:", xMove.value, yMove.value);
        }, 16); // Increment every 100ms
    }
}

export function handleKeyUp(event) {
    if (event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") {
        stopInterval(intervalId);
    }
    if (event.key === "w" || event.key === "s") {
        keysPressed.delete("w");
        keysPressed.delete("s");
        movementY = 0;
    }
    else if (event.key === "a" || event.key === "d") {
        keysPressed.delete("a");
        keysPressed.delete("d");
        movementX = 0;
    }
    if (keysPressed.has("w") || keysPressed.has("a") || keysPressed.has("s") || keysPressed.has("d")) {
        intervalId = setInterval(() => {
            xMove.value = parseInt(xMove.value || "0", 10) + movementX;
            yMove.value = parseInt(yMove.value || "0", 10) + movementY;
            draw();
            // console.log("xMove.value, yMove.value:", xMove.value, yMove.value);
        }, 16);
    }
}

function stopInterval(id) {
    clearInterval(id);
    intervalId = null;
}