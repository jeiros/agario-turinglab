// Global vars
var ball, paddle;
var brick_width = 10;
var brick_height = 2;
var brick_margin = 4;
var rows = 4;
var columns = 5;
var bricks = [];



function setup () {
  createCanvas(350, 350);

  // Build bricks
  var offsetX = width/2 - (columns)*(brick_margin + brick_width)/2;
  var offsetY = 20;
  for (var i =0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var brick = {
        x : i + offsetX,
        y : j + offsetY,
        width : brick_width,
        height : brick_height
      }
      bricks.push(brick);
    }
  }
  // Define ball object
  ball = {
    x : width/2,
    y : height-26,
    width : 10,
    height : 10,
    x_speed : 2*(Math.round(Math.random())*2-1),
    y_speed : -2
  }
  // Define padlle object
  paddle = {
    x : width/2,
    y : height-20,
    width : 60,
    height : 7
  }
}

function draw() {
  background('#005689');

  // Draw ball
  ellipse(ball.x, ball.y, ball.width, ball.height);
  // Draw paddle
  rect(paddle.x - (paddle.width/2), paddle.y, paddle.width, paddle.height);
  // Move ball
  ball.x += ball.x_speed;
  ball.y += ball.y_speed;
  // Move paddle
  paddle.x  = mouseX;
  // Make ball bounce off the edges
  if (ball.x >= width || ball.x <= 0) {
    ball.x_speed = -ball.x_speed;
  } else if (ball.y >= height || ball.y <= 0) {
    ball.y_speed = -ball.y_speed;
  }
  // Is ball touching paddle
  collidingWithBall(paddle);
}

function collidingWithBall(someObject) {
  if (ball.y == someObject.y) {
    // Ball has to be at the same y position and between the edges of the paddle to be in contact
    if ((ball.x >= paddle.x - (paddle.width/2)) && (ball.x <= paddle.x + (paddle.width/2))) {
      ball.y_speed = -ball.y_speed;
      return true;
    }
  }
}

