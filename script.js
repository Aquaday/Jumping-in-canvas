console.log('Hello!');

let canvas = document.querySelector('#canvas');

let context;

canvas.height = 400;
canvas.width = 400;

context = canvas.getContext('2d');

let playerX = 0;
let playerY = 375;

let velocityX = 0;
let velocityY = 0;

let updateSpeed = 30;
let jumpSpeed = 5;

let isJumping = false;

let obstacleX = 0
let obstacleY = 0
let obstacleSize = 25
let obstacleSpeed = 5
let obstaclesArray = []

let gameUpdating = setInterval(update, updateSpeed);

function update() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  playerX += velocityX;
  playerY += velocityY;

  context.fillStyle = 'red';
  context.fillRect(playerX, playerY, 25, 25);

  if (obstaclesArray.length > 0) {
  for (let i = 0; i < obstaclesArray.length; i++){
    obstaclesArray[i][0] -= obstacleSpeed

    context.fillStyle= "yellow"
    context.fillRect(obstaclesArray[i][0], obstaclesArray[i][1], obstacleSize, obstacleSize)
    console.log(obstaclesArray[i])
    if (obstaclesArray[i][0] < -50) {
      obstaclesArray.shift(0)
    }
    if ((obstaclesArray[i][0] >= playerX && obstaclesArray[i][0] <= (playerX + 25)) &&
      (obstaclesArray[i][1] >= playerY && obstaclesArray[i][1] <= (playerY + 25))) {
      console.log("gameOver")
      clearInterval(gameUpdating)
    }
    
  }
}
  

}

document.addEventListener('keydown', jump);

let counting = 0;

function jump(e) {
  if (e.code === 'ArrowUp' && !isJumping) {
    createObstacle()
    isJumping = true;
    let timerId = setInterval(() => {
      velocityY = -jumpSpeed;
      counting += 1;
      if (counting === 15) {
        clearInterval(timerId);
        velocityY = 0;
        let fallingTimerId = setInterval(() => {
          velocityY = +jumpSpeed;
          counting -= 1;
          if (counting === 0) {
            clearInterval(fallingTimerId);
            velocityY = 0;
            isJumping = false;
          }
        }, updateSpeed);
      }
    }, updateSpeed);
  }
}


function createObstacle() {
  obstaclesArray.push([canvas.width, (canvas.height - obstacleSize)])
  console.log(obstaclesArray[0][0])
}

