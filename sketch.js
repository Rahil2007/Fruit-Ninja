var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,swordImage;
var alien,alienGroup;
var alien1Image,alien2Image;
var fruit;
var fruitImage1,fruitImage2,fruitImage3,fruitImage4;
var fruitGroup;
var gameOver,gameOverImage;
var background1,backgroundImage;
var knifeSound1,knifeSound2,knifeSound3,knifeSound4;
var gameOverSound,gameStartSound;
var score=0

function preload(){
swordImage=loadImage("sword.png");
alien1Image=loadImage("alien1.png");
alien2Image=loadImage("alien2.png");
fruit1Image=loadImage("fruit1.png");  
fruit2Image=loadImage("fruit2.png");  
fruit3Image=loadImage("fruit3.png");   
fruit4Image=loadImage("fruit4.png");  
gameOverImage=loadImage("gameover.png");
backgroundImage=loadImage("Wiki-background.jpg");
knifeSound1=loadSound("blade-dragon-swipe-1.wav");
knifeSound2=loadSound("blade-cherry-blossom-1-1.wav");
knifeSound3=loadSound("blade-water-1.wav");
knifeSound4=loadSound("blade-rainbow-1.wav");
gameOverSound=loadSound("Game-over.wav");
gameStartSound=loadSound("Game-start.wav");
}

function setup(){
//creating the canvas and the background
  createCanvas(400,400);
  background1=createSprite(200,200);  
  background1.addImage("background",backgroundImage);
  background1.scale=0.5;

//creating the game sprites
  sword=createSprite(200,200);
  sword.addImage("sword",swordImage);
  sword.scale=0.5;
 
  gameOver=createSprite(200,200);
  gameOver.addImage("gameOver",gameOverImage);

//creating the groups
  fruitGroup=new Group();
  alienGroup=new Group();
  
  gameStartSound.play();
}
//functions to spawn the fruits and aliens
function fruits(){
  if(World.frameCount%150===0){
   var rand = Math.round(random(1,3));
      switch(rand) {
      case 1: fruit=createSprite(0,Math.round(random(30,370)));
      fruit.velocityX=(3+(score/4));
              break;
      case 2: fruit=createSprite(Math.round(random(30,370)),400);
          fruit.velocityY=-3
           fruit.velocityY=-(3+(score/4));
              break;
      case 3: fruit=createSprite(400,Math.round(random(30,370)));
          fruit.velocityX=-3
          fruit.velocityX=-(3+(score/4));
              break;
      }
    fruit.scale=0.2;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
    }
    
    fruit.lifetime=400;
    
    fruitGroup.add(fruit);
  }
}
    
function aliens(){
  if(World.frameCount%250===0){
   var rand = Math.round(random(1,3));
      switch(rand) {
      case 1: alien=createSprite(0,Math.round(random(30,370)));
      alien.velocityX=4
          alien.velocityX=(4+(score/4))
              break;
      case 2: alien=createSprite(Math.round(random(30,370)),400);
          alien.velocityY=-4
         alien.velocityY=-(4+(score/4))
              break;
      case 3: alien=createSprite(400,Math.round(random(30,370)));
          alien.velocityX=-4
          alien.velocityX=-(4+(score/4))
              break;
      }
    
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: alien.addImage(alien1Image);
              break;
      case 2: alien.addImage(alien2Image);
              break;
    }
    
    alien.lifetime=400;
    
    alienGroup.add(alien);
  }
}

function draw(){
  drawSprites();
  
  if(gameState===PLAY) {
//making the sord move with the mouse
    sword.y=mouseY;
    sword.x=mouseX;
    
    gameOver.visible=false
    
//spawning the fruits and aliens
    fruits();
    aliens();
    
//making it so that the sword destroys the fruits and aliens on touching them
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      var rand = Math.round(random(1,4));
      switch(rand) {
      case 1: knifeSound1.play();
              break;
      case 2: knifeSound2.play();
              break;
      case 3: knifeSound3.play();
              break;
      case 4: knifeSound4.play();
              break;
      }
    }
    
    if(alienGroup.isTouching(sword)){
      alienGroup.destroyEach();
      gameState=END ;
      gameOverSound.play();
    }
  
  } else if(gameState===END){
//making the gameOver sprite visible
      gameOver.visible=true;
    
// making text to say that on pressing space the game resets
      fill(250)
      textSize=40
      text("Press Space To Reset",130,250)
  
      fruitGroup.destroyEach();
    
//making it so that the game resets on pressing space
      if(keyWentDown("space")){
      score=0;
      gameState=PLAY;
      gameStartSound.play();
      }
    }
//setting a collider for the sword
  sword.setCollider("rectangle",20,-20,20,85,40);
//making the scoreboard
  fill(250);
  text("Score:- "+score,30,35)
}

