//link to  BG image
var gridBG = 'https://s3-eu-west-1.amazonaws.com/turing-resources/web/p5.js/assets/agar.bg.png';
var virusLink = 'https://s3-eu-west-1.amazonaws.com/turing-uploads/rylWc39AU';
var timer = 0;
//load background image before game starts
function preload(){
  bg = loadImage(gridBG);
  virusImage = loadImage(virusLink);
}



//Setup runs once at the beginning
function setup() {
  createCanvas(500, 500);
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
    var xPosition = random(500);
    var yPosition = random(500);
    drawSprites(newFood(xPosition, yPosition));
  }
  allViruses = new Group();
  for (var j=0; j <10; j++) {
    var xPositionVir = random(500);
    var yPositionVir = random(500);
    drawSprites(newVirus(xPositionVir, yPositionVir));
  }
  newEnemy('red');
}

function eatFood(player1, food) {
  food.remove();
  player1.scale += 0.05;
  newFood(random(500), random(500));
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
  enemy = createSprite(400, 400, 50, 50);
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

/*function enemyMove() {
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
}*/


function enemyMove() {
  if (timer % 50 ===0 ) {
    enemy.velocity.x = random([1, -1])*enemy.speed;
    enemy.velocity.y = random([1, -1])*enemy.speed;
  }
  timer++;
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
