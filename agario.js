//link to  BG image
var gridBG = 'pics/agarbg.png';
var virusLink = 'pics/virus.png';
var timer = 0;
var canvasWidth = 500;
var canvasHeight = 500;

//load background image before game starts
function preload(){
  bg = loadImage(gridBG);
  virusImage = loadImage(virusLink);
}

//Setup runs once at the beginning
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  var playerColor = '#'+ Math.random().toString(16).substr(-6); // Random color player
  player = createSprite(width/2, height/2, 50, 50);
  player.draw = function() {
    fill(playerColor);
    ellipse(0, 0, 30, 30);
    player.overlap(allFood, eatFood);
    //player.overlap(enemy, eatPlayer);
  }
  player.setCollider('circle', 0, 0, 5);
  player.scale = 1;
  player.speed = 2;
  
  allFood = new Group();
  for (var i = 0; i < 20; i++) {
    var xPosition = random(canvasWidth);
    var yPosition = random(canvasHeight);
    drawSprites(newFood(xPosition, yPosition));
  }
  allViruses = new Group();
  for (var j=0; j <10; j++) {
    var xPositionVir = random(canvasWidth);
    var yPositionVir = random(canvasHeight);
    drawSprites(newVirus(xPositionVir, yPositionVir));
  }
  newEnemy('red');
}

function eatFood(player1, food) {
  food.remove();
  player1.scale += 0.05;
  // Spawn a new food sprite on a random location
  newFood(random(canvasWidth), random(canvasHeight));
}

function newFood(x,y) {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  food = createSprite(x, y, 10, 10);
  food.draw = function() {
    fill(r, g, b);
    ellipse(0, 0, 10, 10);
  }
  allFood.add(food);
}

function newVirus(x, y) {
  virus = createSprite(x, y, 10, 10);
  virus.addImage(virusImage);
  virus.setCollider('circle', 0, 0, 50);
  virus.scale = 0.2;
  allViruses.add(virus);
}

function newEnemy(enemyColor) {
  enemy = createSprite(random(canvasWidth), random(canvasHeight), 50, 50);
  enemy.draw = function() {
    fill(enemyColor);
    ellipse(0, 0, 15, 15);
    enemy.overlap(allFood, eatFood);
    enemy.overlap(player, eatPlayer);
  }
  enemy.setCollider('circle', 0, 0, 15);
  enemy.scale = random(1, 3);
  enemy.speed = 2 / enemy.scale;
}

function enemyMove() {
  // Player will be chasen until eaten
  // After that, the enemy will move randomly
  if (player.removed === true) {
    if (timer % 50 ===0 ) {
      enemy.velocity.x = random([1, -1])*enemy.speed;
      enemy.velocity.y = random([1, -1])*enemy.speed;
    }
    timer++;
  } else {
    if (player.position.x > enemy.position.x) {
      enemy.velocity.x = enemy.speed;
    }
    if (player.position.x < enemy.position.x) {
      enemy.velocity.x = -enemy.speed;
    }
    if (player.position.y > enemy.position.y) {
      enemy.velocity.y = enemy.speed;
    }
    if (player.position.y < enemy.position.y) {
      enemy.velocity.y = -enemy.speed;
    }
  }
}

function eatPlayer(player1, player2) {
  if (player2.overlapPoint(player1.position.x, player1.position.y)) {
    if (player1.scale > player2.scale) {
      player1.scale += player2.scale/2;
      player2.remove();
    }
    if (player1.scale < player2.scale) {
      player2.scale += player1.scale/2;
      player1.remove();
    }
  }
}

//Draw runs forever 
function draw() {
  background(bg);
  drawSprites(allViruses);
  drawSprites(allFood);
  drawSprite(player);
  drawSprite(enemy);
  enemyMove();
  if (enemy.removed === true) {
    newEnemy('red');
  }
  if (mouseX > player.position.x) {
    player.velocity.x = player.speed;
  }
  if (mouseX < player.position.x) {
    player.velocity.x = -player.speed;
  }
  if (mouseY > player.position.y) {
    player.velocity.y = player.speed;
  }
  if (mouseY < player.position.y) {
    player.velocity.y = -player.speed;
  }
  
}