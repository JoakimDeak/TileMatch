const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerHeight - 10;
canvas.height = canvas.width;

window.gridSize = 5;
window.squareSize = Math.floor(canvas.width / gridSize);

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);

setup();

function setup() {
    window.grid = createGrid(gridSize);
    draw();
}

function update() {

    requestAnimationFrame(update);
}

function mouseDown() {

}

function mouseUp() {

}

function mouseMove() {

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
    fillEmpty();
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
    let matchingNeighbours = 0;
    if (x > 0 && grid[y][x - 1]) {
        matchingNeighbours++;
    }
    if (y > 0 && grid[y - 1][x]) {
        matchingNeighbours++;
    }
    if (x < gridSize - 1 && grid[y][x + 1]) {
        matchingNeighbours++;
    }
    if (y < gridSize - 1 && grid[y + 1][x]) {
        matchingNeighbours++;
    }
    if (matchingNeighbours > 1) {
        grid[y][x] = 0;
    }
    if (matchingNeighbours > 0) {
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

}

function floodFillAll() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            floodFill(i, j, grid[j][i]);
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