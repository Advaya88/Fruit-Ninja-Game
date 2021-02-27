var PLAY = 1;
var END = 0;
var gameState = 1;
var ground
var score = 0
var fruit,enemy;


function preload(){
  swordImage = loadImage("sword.png");
 fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  MonsterImage = loadAnimation("alien1.png","alien2.png");
  
  
  
  
}



function setup(){
  createCanvas(600, 600);
  
  FruitsGroup = new Group();
  EnemyGroup = new Group();

//creating sword
  sword = createSprite(40,200,20,20);
  sword.addImage("sword", swordImage);
  sword.scale = 0.7;
    
}







function draw(){
background("cyan");

 
if(gameState === PLAY){
    
  
   //move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;
 
    // Increase score if sword is touching fruit
if (FruitsGroup.isTouching(sword)){
      FruitsGroup.destroyEach();
    score = score+2;
  
}
  
   if (EnemyGroup.isTouching(sword)){
      EnemyGroup.destroyEach();
   gameState = END
      }
  }
    else if(gameState === END){
    FruitsGroup.destroyEach();
      FruitsGroup.setVelocityXEach(0);
 EnemyGroup.destroyEach();
      EnemyGroup.setVelocityXEach(0);
      sword.addImage("sword", gameOverImage);
           
           
           }
    
//Display score
  textSize(25);
  text("Score : "+ score,250,50);

//Callfruit and enemy function
spawnfruits();
enemy();

  
drawSprites();
}
  
function enemy(){
     if(World.frameCount % 200 === 0){
     Monster = createSprite(400,200,20,20);
       Monster.addAnimation("moving", MonsterImage);
       Monster.y = Math.round(random(100,300));
       Monster.velocityX = -8
       Monster.setLifetime = 50
       EnemyGroup.add(Monster);
        
        
        }
     
   }

function spawnfruits(){
      if(World.frameCount % 80 === 0){
        fruits = createSprite(400,200,20,20); 
        fruits.scale = 0.2;
        
        
        r = Math.round(random(1,4));
        if(r == 1){
          fruits.addImage(fruit1Image);
        }else if(r == 2) {
          fruits.addImage(fruit2Image);
        }else if(r == 3){
          fruits.addImage(fruit3Image);
        }else {
          fruits.addImage(fruit4Image)
          
          }
        
        fruits.y = Math.round(random(50,340));
          fruits.velocityX = -7;
          fruits.setLifetime = 100;
          FruitsGroup.add(fruits);
        
        
      }
    }