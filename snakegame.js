// Set up canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up game variables
var gridSize = 10;
var width = canvas.width / gridSize;
var height = canvas.height / gridSize;
var snake = [{x: width / 2, y: height / 2}];
var food = {x: 0, y: 0};
var direction = "right";
var score = 0;
var interval = 100;

// Set up key listener for arrow keys
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37 && direction != "right") {
    direction = "left";
  } else if (event.keyCode == 38 && direction != "down") {
    direction = "up";
  } else if (event.keyCode == 39 && direction != "left") {
    direction = "right";
  } else if (event.keyCode == 40 && direction != "up") {
    direction = "down";
  }
});

// Randomly place food on grid
function placeFood() {
  food.x = Math.floor(Math.random() * width);
  food.y = Math.floor(Math.random() * height);
  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x == food.x && snake[i].y == food.y) {
      placeFood();
      return;
    }
  }
}

// Check if snake collides with wall or itself
function checkCollision() {
  if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
    return true;
  }
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  return false;
}

// Update game state and draw grid
function update() {
  // Move snake
  for (var i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  if (direction == "left") {
    snake[0].x--;
  } else if (direction == "up") {
    snake[0].y--;
  } else if (direction == "right") {
    snake[0].x++;
  } else if (direction == "down") {
    snake[0].y++;
  }

  // Check for collisions
  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game over! Your score was " + score + ".");
    return;
  }

  // Check if snake eats food
  if (snake[0].x == food.x && snake[0].y == food.y) {
    snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
    placeFood();
    score++;
    if (score % 5 == 0) {
      interval -= 10;
      clearInterval(gameInterval);
      gameInterval = setInterval(update, interval);
    }
  }

  // Clear canvas and draw grid
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * gridSize
