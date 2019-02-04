const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('score');

canvas.width = window.innerHeight;
canvas.height = canvas.width;

window.gridSize = 6;
window.squareSize = Math.floor(canvas.width / gridSize);
window.score = 0;

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);
window.mouseIsDown = false;

setup();

function setup() {
    window.grid = createGrid(gridSize);
    draw();
    update();
}

function update() {
    scoreText.innerHTML = "Score: " + score;
    let prevGrid = copyGrid(grid);
    floodFillAll();
    fall();
    fillEmpty();
    draw();
    if (!gridIsSame(grid, prevGrid)) {
        requestAnimationFrame(update);
    }
}

function mouseDown() {
    mouseIsDown = true;
    window.prevXPos = Math.floor(event.clientX / squareSize);
    window.prevYPos = Math.floor(event.clientY / squareSize);
}

function mouseUp() {
    mouseIsDown = false;
}

function mouseMove() {
    if (mouseIsDown) {
        let xPos = Math.floor(event.clientX / squareSize);
        let yPos = Math.floor(event.clientY / squareSize);

        if (xPos !== prevXPos || yPos !== prevYPos) {
            let temp = grid[prevYPos][prevXPos];
            grid[prevYPos][prevXPos] = grid[yPos][xPos];
            grid[yPos][xPos] = temp;
            window.prevXPos = xPos;
            window.prevYPos = yPos;
            window.mouseIsDown = false;
            update();
        }
    }
}

function createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = Math.floor(Math.random() * 5) + 1;
        }
    }
    return grid;
}

function gridIsSame(grid1, grid2) { // grid1 and grid2 are assumed to be of same size
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid1[j][i] !== grid2[j][i]) {
                return false;
            }
        }
    }
    return true;
}

function copyGrid(grid1) {
    let copy = createGrid(gridSize);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            copy[j][i] = grid1[j][i];
        }
    }
    return copy;
}

function fall() {
    for (let i = 0; i < gridSize; i++) {
        let counter = gridSize - 1;
        for (let j = gridSize - 1; j >= 0; j--) {
            if (grid[j][i] !== 0) {
                grid[counter][i] = grid[j][i];
                if (j !== counter) {
                    grid[j][i] = 0;
                }
                counter--;
            }
        }
    }
}

function fillEmpty() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[j][i] === 0) {
                grid[j][i] = Math.floor(Math.random() * 5) + 1;
            }
        }
    }
}

function floodFill(x, y, target) {
    if (target === 0 || grid[y][x] !== target) {
        return;
    }
    grid[y][x] = 0;
    score++;
    if (x > 0) {
        floodFill(x - 1, y, target, 0);
    }
    if (y > 0) {
        floodFill(x, y - 1, target, 0);
    }
    if (x < gridSize - 1) {
        floodFill(x + 1, y, target, 0);
    }
    if (y < gridSize - 1) {
        floodFill(x, y + 1, target, 0);
    }
}

function floodFillAll() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let neighbours = 0; // a tile is a neighbour if it is an adjacent tile of the same color
            if (i > 0 && grid[j][i] === grid[j][i - 1]) {
                neighbours++;
            }
            if (j > 0 && grid[j][i] === grid[j - 1][i]) {
                neighbours++;
            }
            if (i < gridSize - 1 && grid[j][i] === grid[j][i + 1]) {
                neighbours++;
            }
            if (j < gridSize - 1 && grid[j][i] === grid[j + 1][i]) {
                neighbours++;
            }
            if (neighbours > 1) {
                floodFill(i, j, grid[j][i]);
            }
        }
    }
}

function draw() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            switch (grid[j][i]) {
                case 0:
                    ctx.fillStyle = "#fff";
                    break;
                case 1:
                    ctx.fillStyle = "#f00";
                    break;
                case 2:
                    ctx.fillStyle = "#0f0";
                    break;
                case 3:
                    ctx.fillStyle = "#00f";
                    break;
                case 4:
                    ctx.fillStyle = "#f0f";
                    break;
                case 5:
                    ctx.fillStyle = "#0ff";
                    break;
            }
            ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}