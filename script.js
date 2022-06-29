//board
let cellSize = 25;
let rows = 20;
let cols = 20;
let board;
let context; 

//snake head
let snakeX = cellSize * 10;
let snakeY = cellSize * 10;

//snake moving
let snakeMovingX = 0;
let snakeMovingY = 0;

//snake body
let snakeBody = [];

//food
let foodX;
let foodY;

//point 
let points = 0;

//game result
let gameOver = false;

window.onload = function() {
    board = document.getElementById("snakeBoard");
    board.height = rows * cellSize;
    board.width = cols * cellSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener("keyup", directionMoving);
    setInterval(update, 1000/10); 
}

function update() { 
    if (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, cellSize, cellSize); 

   if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        points += 10;
        placeFood();
        document.getElementById("resultPoints").innerHTML = "Your Score: " + points;
    }

    //moving snake body
    for( let i = snakeBody.length - 1; i > 0; --i){
        snakeBody[i] = snakeBody[i -1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="green";
    snakeX += snakeMovingX * cellSize;
    snakeY += snakeMovingY * cellSize;
    context.fillRect(snakeX, snakeY, cellSize, cellSize);
    
    //increase the snake body by eating food
    for (let i = 0; i < snakeBody.length; ++i) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], cellSize, cellSize);
    }

    //game check
    if (snakeX < 0 || snakeX > cols * cellSize || snakeY < 0 || snakeY > rows * cellSize) {
        gameOver = true;
        alert("Game Over!\n Final score: " + points);
    }

    for(let i = 0; i <snakeBody.length; ++i) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!\n Final score: " + points);
        }
    } 
}
// moving direction for snake
function directionMoving(e) {
    if(e.code == "ArrowUp" && snakeMovingY != 1) {
        snakeMovingX = 0;
        snakeMovingY = -1;
    } else if (e.code == "ArrowDown" && snakeMovingY != -1) {
        snakeMovingX = 0;
        snakeMovingY = 1;
    } else if (e.code == "ArrowLeft" && snakeMovingX != 1) {
        snakeMovingX = -1;
        snakeMovingY = 0;
    } else if (e.code == "ArrowRight" && snakeMovingX != -1) {
        snakeMovingX = 1;
        snakeMovingY = 0;
    }
}

// place food on bord
function placeFood() {    
    foodX = Math.floor(Math.random() * cols) * cellSize;
    foodY = Math.floor(Math.random() * rows) * cellSize;
}