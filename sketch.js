var bike, bikeImg, bg, bgImg, ground
var obstacles, stone, box, rocket_a, laser, obstacleGroup, laserss, laserGroup, rocket, rocketGroup, rocketanimation
var gameState = 0 
var score = 0
var gameover, gameoverImg
var yes,no
function preload() {
  bikeImg = loadImage("imgs/bike1.png")
  bgImg = loadImage("imgs/bg.jpg")
  stone = loadImage("imgs/stone.png")
  box = loadImage("imgs/box.png")
  laser = loadAnimation("imgs/laser1.png", "imgs/laser2.png", "imgs/laser3.png", "imgs/laser4.png", "imgs/laser5.png", "imgs/laser6.png")
  rocketanimation = loadAnimation("imgs/rocket1.png", "imgs/rocket2.png", "imgs/rocket3.png", "imgs/rocket4.png", "imgs/rocket5.png")
  gameoverImg = loadImage("imgs/gameover.png")

}
function setup() {

  createCanvas(1300, 600);
  bg = createSprite(windowWidth / 2, windowHeight / 2)
  bg.addImage(bgImg)
  bg.scale = 1.8
  bike = createSprite(200, height - 100, 50, 50);

  bike.addImage(bikeImg)
  bike.scale = 0.3
  ground = createSprite(100, height - 25, 300, 20)
  ground.visible = false
  obstacleGroup = createGroup()
  laserGroup = createGroup()
  rocketGroup = createGroup()
  gameover=createSprite(width/2,height/2)
  gameover.addImage(gameoverImg)
  gameover.visible=false
  yes=createSprite(width/2-100,height/2+250,50,30)
  no=createSprite(width/2+100,height/2+250,50,30)
  yes.visible=false
  no.visible=false


}


function draw() {
  background(255, 255, 255);
  if (gameState == 0) {
    fill("red")
    
    textSize(30)
    strokeWeight(10)
    text("Press return/Enter to start", 100 - 20, 50)
    
    textSize(30)
    strokeWeight(10)
    text("Press Space key to jump", width / 2 - 20, 50)
    if (keyDown("enter")) {
      gameState = 1
    }
  } else if (gameState == 1) {
    bg.velocityX = -(7+score/100)
    score+=Math.round(getFrameRate()/60)
    textSize(20)
    text("SCORE: "+score,width-200,130)
    if (bg.x < 350) {
      bg.x = width / 2
    }

    if (keyDown("space") && bike.y >400) {
      bike.velocityY = -15
    }
    bike.velocityY = bike.velocityY + 0.5
    bike.collide(ground)
    if(bike.isTouching(obstacleGroup)||bike.isTouching(laserGroup)||bike.isTouching(rocketGroup)){
      bike.velocityY=0
      bg.velocityX=0
      bike.y=height-100
      gameState=2
     }

    spawn_obstacles()
    spawnlasers()
    spawnRockets()
  }
  else if(gameState==2){
    gameover.visible =true
    obstacleGroup.destroyEach()
    laserGroup.destroyEach()
    rocketGroup.destroyEach()
   if(mousePressedOver(yes)){
    gameState=1
     reset()
     
   }
   if(mousePressedOver(no)){
    gameState=0
     reset()
     
   }
  }
  drawSprites();
}
function spawn_obstacles() {
  if (frameCount % 150 == 0) {
    obstacles = createSprite(width + 50, height - 60)
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: obstacles.addImage(stone)
        obstacles.scale = 0.08
        break
      case 2: obstacles.addImage(box)
        obstacles.scale = 0.2
        break


    }
    obstacles.velocityX = -(7+score/100)
    obstacles.lifetime = width / 5
    obstacleGroup.add(obstacles)
  }

}
function spawnlasers() {
  if (frameCount % 320 == 0) {
    laserss = createSprite(width + 50, height - 100)


    laserss.addAnimation("laser", laser)
    laserss.scale = 0.3


    laserss.y = Math.round(random(150, height - 50))
    laserss.velocityX = -(30+score/100)
    laserss.lifetime = width / 5
    laserGroup.add(laserss)
  }
}
function spawnRockets() {
  if (frameCount % 500 == 0) {
    rocket = createSprite(width + 50, height - 100)


    rocket.addAnimation("rocket", rocketanimation)
    rocket.scale = 0.3


    rocket.y = Math.round(random(150, height - 50))
    rocket.velocityX = -(19+score/100)
    rocket.lifetime = width / 5
    rocketGroup.add(rocket)
  }
}
function reset(){
  gameover.visible=false
  score=0
  
}
