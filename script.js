function multiply_matrices(matrix1, matrix2) {
    const matrix1_rows = matrix1.length;
    const matrix1_columns = matrix1[0].length;
    const matrix2_rows = matrix2.length;
    const matrix2_columns = matrix2[0].length;
    let result = Array.from({ length: matrix1_rows }, () => Array(matrix2_columns).fill(0));

    if (matrix1_columns != matrix2_rows) {
        console.log("Error, can't multiply matrices");
    }
    else {
        for (let i = 0; i < matrix1_rows; i++) {
            for (let j = 0; j < matrix2_columns; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1_columns; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
    }
    return result;
}

function move_cube(figure, l=0, m=0, n=0) {
    const f = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [l, m, n, 1]
    ];
    moved_figure = multiply_matrices(figure, f);
    return moved_figure
}


function get_radians(degrees) {
    return degrees * Math.PI / 180;
}

function axonometric_perspective(figure, theta_x, theta_y) {
    const theta_x1 = get_radians(theta_x);
    const theta_y1 = get_radians(theta_y);
    const f1 = [
        [1, 0, 0, 0],
        [0, Math.cos(theta_x1), Math.sin(theta_x1), 0],
        [0, -Math.sin(theta_x1), Math.cos(theta_x1), 0],
        [0, 0, 0, 1]
    ];

    const figure1 = multiply_matrices(figure, f1);
    const f2 = [
        [Math.cos(theta_y1), 0, -Math.sin(theta_y1), 0],
        [0, 1, 0, 0],
        [Math.sin(theta_y1), 0, Math.cos(theta_y1), 0],
        [0, 0, 0, 1]
    ];

    const figure2 = multiply_matrices(figure1, f2);
    return figure2
}

function get_initial_cube(edge_length) {
    let a = [
        [0, 0, 0, 1],
        [edge_length, 0, 0, 1],
        [edge_length, edge_length, 0, 1],
        [0, edge_length, 0, 1],
        [0, 0, edge_length, 1],
        [edge_length, 0, edge_length, 1],
        [edge_length, edge_length, edge_length, 1],
        [0, edge_length, edge_length, 1]
    ];
    return a;
}

function get_cube_center(cube) {
    let x = (cube[0][0] + cube[6][0]) / 2;
    let y = (cube[0][1] + cube[6][1]) / 2;
    let z = (cube[0][2] + cube[6][2]) / 2;
    console.log("cube[0][0] = " + cube[0][0]);
    console.log("cube[0][0] = " + cube[0][0]);
    return [x, y, z];
}

function draw() {
    let cube = get_initial_cube(length);

    function display_cube(displayed_cube) {
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.beginPath();
            ctx.moveTo(displayed_cube[0][0], displayed_cube[0][1]);
            ctx.lineTo(displayed_cube[1][0], displayed_cube[1][1]);
            ctx.lineTo(displayed_cube[2][0], displayed_cube[2][1]);
            ctx.lineTo(displayed_cube[3][0], displayed_cube[3][1]);
    
            ctx.lineTo(displayed_cube[0][0], displayed_cube[0][1]);
            ctx.lineTo(displayed_cube[4][0], displayed_cube[4][1]);
            ctx.lineTo(displayed_cube[5][0], displayed_cube[5][1]);
            ctx.lineTo(displayed_cube[1][0], displayed_cube[1][1]);
    
            ctx.lineTo(displayed_cube[2][0], displayed_cube[2][1]);
            ctx.lineTo(displayed_cube[6][0], displayed_cube[6][1]);
            ctx.lineTo(displayed_cube[7][0], displayed_cube[7][1]);
            ctx.lineTo(displayed_cube[3][0], displayed_cube[3][1]);
    
            ctx.lineTo(displayed_cube[2][0], displayed_cube[2][1]);
            ctx.lineTo(displayed_cube[6][0], displayed_cube[6][1]);
            ctx.lineTo(displayed_cube[5][0], displayed_cube[5][1]);
            ctx.lineTo(displayed_cube[4][0], displayed_cube[4][1]);
            ctx.lineTo(displayed_cube[7][0], displayed_cube[7][1]);
            ctx.lineTo(displayed_cube[3][0], displayed_cube[3][1]);
            ctx.lineTo(displayed_cube[0][0], displayed_cube[0][1]);
            ctx.closePath();
            ctx.stroke();
        }
    }
    let [cubeX, cubeY, cubeZ] = get_cube_center(cube);
    console.log(cubeX, cubeY, cubeZ);
    cube = move_cube(cube, -cubeX, -cubeY, -cubeZ);
    cube = axonometric_perspective(cube, parseFloat(x_rotate.value) || 0, parseFloat(y_rotate.value) || 0);
    
    cube = move_cube(cube, parseFloat(x_move.value) + cubeX || cubeX, parseFloat(y_move.value) + cubeY || cubeY);

    
    console.log(cube);


    display_cube(cube);
    
}

function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth - 40;
    x_move.max = window.innerWidth - 40 - length;
    
    if (window.innerWidth < 555) {
        canvas.height = window.innerHeight - 220;
        y_move.max = window.innerHeight - 220 - length;
    } 
    else {
        canvas.height = window.innerHeight - 120;
        y_move.max = window.innerHeight - 120 - length;
    }  
    
    draw();
}


const length = 150;

const canvas = document.getElementById("canvas");

const form = document.getElementById("move-rotate-form");
const x_move = document.getElementById("x_move");
const y_move = document.getElementById("y_move");
const x_rotate = document.getElementById("x_rotate");
const y_rotate = document.getElementById("y_rotate");

x_move.addEventListener("change", draw);
y_move.addEventListener("change", draw);
x_rotate.addEventListener("change", draw);
y_rotate.addEventListener("change", draw);
window.addEventListener("load", resizeCanvas);

