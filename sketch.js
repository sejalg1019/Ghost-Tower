var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower, towerImg, ghost, ghostImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var bar, barsGroup;
var spookySound

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  barsGroup = new Group();
  
  ghost.setCollider("circle",0,0,90);
  
  spookySound.loop();
}

function draw(){
  background(0);
  
  if(gameState=== PLAY){
    if(tower.y>400){
    tower.y = tower.width/2;
  } 
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    
  if(barsGroup.isTouching(ghost)||ghost.y>600){
    gameState = END;
    ghost.destroy();
  }
  
  spawnDoors();
  
  drawSprites();
  }
  
  if(gameState===END){
    fill("yellow");
    textSize(30);
    text("GAME OVER",250,250);
  }
  
}

function spawnDoors(){
  if(frameCount % 200 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    door.x = Math.round(random(120,400));
    doorsGroup.add(door);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climber.x = door.x;
    climbersGroup.add(climber);
    bar = createSprite(200,15);
    bar.shapeColor = "green";
    bar.velocityY = 1;
    bar.lifetime = 800;
    bar.width = climber.width;
    bar.height = 2;
    bar.x = door.x;
    barsGroup.add(bar);
    ghost.depth =  door.depth;
    ghost.depth+=1
  }
}