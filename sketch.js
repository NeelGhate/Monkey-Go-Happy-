//Global Variables
var monkey, monkeyend, banana, stone1, stone2, stone3, score, rand, stoneI, jungle, jungleI, groundimage, monkey_running, gameState, banana, bananaI, gameover, gameoverI, bscore, ground



function preload() {
  //adding the animations
  groundimage = loadImage("ground.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",
    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",
    "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaI = loadImage("Banana.png");
  stoneI = loadImage("stone.png");
  gameoverI = loadImage("gameOver.png");
  jungleI = loadImage("jungle.jpg");
  // monkeyend = loadAnimation("Monkey_01.png");

}


function setup() {
  //createCanvas(600,300);
  createCanvas(800, 400);

  jungle = createSprite(0, 200, 800, 400)
  jungle.addImage("jungle", jungleI);
  jungle.velocityX = -6;

  // create the player
  monkey = createSprite(70, 330, 25, 80);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //create infinite ground
  ground = createSprite(200, 370, 1600, 2);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * World.frameCount / 100);
  ground.visible = false;

  gameState = "play";


  bscore = 0;


  gameover = createSprite(250, 200, 400, 50);
  gameover.addImage("gameover", gameoverI);
  gameover.visible = false;


}


function draw() {
  background(255);
  monkey.debug = true;

  if (gameState === "play") {
    score = score + Math.round(getFrameRate() / 60);
  }

  if (gameState == "play") {


    // infinting the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (jungle.x < 0) {
      jungle.x = jungle.width / 2;
    }

    if (keyDown("up") && monkey.y >= 330) {
      monkey.velocityY = -8;
    }

    //setting the gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    //stoping the monkey from falling
    monkey.collide(ground);

    //calling all the function
    spawnBananas();
    spawnobstacles();
    spawnobstacles2();

    //collecting the bananas 
    if (banana != null && monkey.isTouching(banana) == true) {
      banana.destroy();
      bscore = bscore + 1;
    }

    if (bscore == 10) {
      text("You Win", 100, 200);
      ground.velocityX = 0;
      stone1.velocityX = 0;
      banana.velocityX = 0;
      monkey.velocityX = 0;
      monkey.velocityY = 0;
      gameState = "end";
    }

    if (stone1 != null && monkey.isTouching(stone1) == true) {
      ground.velocityX = 0;
      stone1.velocityX = 0;
      banana.velocityX = 0;
      monkey.velocityX = 0;
      monkey.velocityY = 0;
      gameover.visible = true;
      banana.lifetime = -1;
      stone1.lifetime = -1;
      monkey.collide(stone1);
      gameState = "end";
    }

    switch (score) {
      case 10:
        monkey.scale = 0.2;
        break;
      case 20:
        monkey.scale = 0.3;
        break;
      case 30:
        monkey.scale = 0.4;
        break;
      case 40:
        monkey.scale = 0.5;
        break;

      default:
        break;
    }


  } // playState


  if (gameState == "end") {
    jungle.velocityX = 0;
    text("Press R to Restart", 300, 150);
    // monkey.changeAnimation("ended",monkeyend);
    if (keyDown("r")) {
      gameState = "play";
      bscore = 0;
      gameover.visible = false;
      banana.destroy();
      stone1.destroy();

    }
  }



  drawSprites();
  textSize(30);
  fill("red")
  text("Bananas Collected: " + bscore, 300, 100);
} // function draw

function spawnBananas() {
  if (World.frameCount % 100 == 0) {
    banana = createSprite(800, 368, 20, 20);
    // banana.x = Math.round(random(200,750));
    banana.collide(ground);
    banana.addImage("banana", bananaI);
    banana.scale = 0.05;
    banana.velocityX = -(6 + 3 * World.frameCount / 100);
    //banana.collide(ground);


    banana.debug = true;
    banana.lifetime = 210;
  }
}

function spawnobstacles() {

  if (World.frameCount % 80 == 0) {
    stone1 = createSprite(800, 368, 10, 70);
    stone1.addImage("stone1", stoneI);
    stone1.velocityX = -(6 + 3 * World.frameCount / 100);
    stone1.scale = 0.1
    stone1.lifetime = 134;
    stone1.setCollider("rectangle", 0, 0, 7, 50);
  }
}

function spawnobstacles2() {
  if (World.frameCount == 500)
    if (World.frameCount % 130 == 0) {
      stone2 = createSprite(800, 315, 10, 70);
      stone2.addImage("stone1", stoneI);
      stone2.velocityX = -(6 + 3 * World.frameCount / 100);
      stone2.scale = 0.1
      stone2.lifetime = 134;
    }
}