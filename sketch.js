//calling variables
  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
  //loading image for background  
    backgroundImage= loadImage("download.jpg");
  
  //loading animation for monkey
  monkey_running= loadAnimation ("2-2-car-transparent.png");
  
  //loading images for banana and obstacles
    bananaImage= loadImage("5a364041411e44.8325067215135048332667.png");
    obstacleImage= loadImage("5a3a88b6442283.81391830151378552627915517.png");
}

function setup() {
  //creating canvas  
    createCanvas(1200,500);
  
  //creating background sprite
    backgroundy= createSprite (200,500);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.velocityX= -2;
    backgroundy.scale=7.5
    
  //creating monkey sprite
    monkey= createSprite (100,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
  //creating ground sprite
    ground= createSprite (0,390,800,10);
    ground.visible= false;
  
  //creating groups for banana and obstacles
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
  //assigning background color
    background("white");
  
  //to know the position of monkey to make more changes
    console.log(monkey.y);
  
  //reseting background
    if (backgroundy.x<100) {
      backgroundy.x= 200
    }   
  
  //making the monkey jump  
    if (keyDown ("space")) {
      monkey.velocityY= -20;  
    }    
    
  //adding gravity to monkey
    monkey.velocityY= monkey.velocityY + 0.8;
  
  //preventing the monkey from falling off the ground
    monkey.collide (ground);
  
  //scoring system and changing size of the monkey
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
    }
  
   
  //calling user-defined functions
    spawnBananas();
    spawnObstacles();
  
  //drawing sprites
    drawSprites();
  
  //displaying score
    stroke ("white");
    textSize (18);
    text ("Score: "+score,190,70);  
}

//function for bananas
function spawnBananas () {
  if (frameCount%140===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.1;
    banana.velocityX= -7;
    
    //adding lifetime to bananas
      banana.lifetime= 150;
    
    //adding banana to banana group
      bananaGroup.add(banana);
  }
}

//function for obstacles
function spawnObstacles () {
  if (frameCount%110===0) {
    obstacle= createSprite (800,340,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -8;
    
    //adding obstacle to obstacle group
      obstacleGroup.add(obstacle);
  }
}