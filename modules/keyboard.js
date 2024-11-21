import { xMove, yMove, movementDownKeys, movementUpKeys, movementLeftKeys, movementRightKeys } from "./constants.js";
import { draw } from "./draw.js";
let intervalId;
const keysPressed = new Set(); 
let movementX = 0;
let movementY = 0;
const movementValue = 2;

function setHasValues(set, valuesArray) {
    return valuesArray.some(value => set.has(value));
}

function deleteSetValues(set, valuesArray) {
    valuesArray.forEach(value => set.delete(value));
}

export function handleKeyDown(event) {
    keysPressed.add(event.key);

    if (setHasValues(keysPressed, movementUpKeys)) {
        movementY = -movementValue;
    }
    else if (setHasValues(keysPressed, movementDownKeys)) {
        movementY = movementValue;
    }

    if (setHasValues(keysPressed, movementLeftKeys)) {
        movementX = -movementValue;
    }
    else if (setHasValues(keysPressed, movementRightKeys)) {
        movementX = movementValue;
    }
    if (!intervalId) { 
        intervalId = setInterval(() => {
            xMove.value = parseInt(xMove.value || "0", 10) + movementX;
            yMove.value = parseInt(yMove.value || "0", 10) + movementY;
            draw();
        }, 16);
    }
}

export function handleKeyUp(event) {

    let verticalKeys = movementDownKeys.concat(movementUpKeys);
    let horizontalKeys = movementLeftKeys.concat(movementRightKeys);
    let movementKeys = movementUpKeys.concat(movementDownKeys).concat(movementLeftKeys).concat(movementRightKeys);

    if (movementKeys.includes(event.key)) {
        stopInterval(intervalId);
    }
    if (verticalKeys.includes(event.key)) {
        deleteSetValues(keysPressed, verticalKeys);
        movementY = 0;
    }
    else if (horizontalKeys.includes(event.key)) {
        deleteSetValues(keysPressed, horizontalKeys);
        movementX = 0;
    }
    if (setHasValues(keysPressed, movementKeys)) {
        intervalId = setInterval(() => {
            xMove.value = parseInt(xMove.value || "0", 10) + movementX;
            yMove.value = parseInt(yMove.value || "0", 10) + movementY;
            draw();
        }, 16);
    }
}

function stopInterval(id) {
    clearInterval(id);
    intervalId = null;
}