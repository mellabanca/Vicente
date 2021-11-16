var Rexinho, RexinhoCorrendo;

function preload(){

  RexinhoCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
}

function setup(){
  createCanvas(600,200);
  Rexinho = createSprite(50,160,20,50);
  Rexinho.addAnimation("correndo", RexinhoCorrendo);
  Rexinho.scale = 0.5;

  borda = createEdgeSprites();
}


function draw(){
  background("white");

  if(keyDown("space")){
    Rexinho.velocityY = -10;
  }
  Rexinho.velocityY = Rexinho.velocityY + 1;

  Rexinho.collide(borda[3]);

  drawSprites();
}