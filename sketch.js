var Rexinho, RexinhoCorrendo;

var lugardopezinho, lugardopezinhochaozinho;

var chaozinhoinvisivel;

var umanuvenzinha, grupodanuvenzinha;

var inuvenzinha;

var b1, b2, b3, b4, b5, b6, grudodosobstaculos;

var pontinho = 0;

var jogandinho = 1;

var naumjogandinho = 0;

var estadoJogandinho = jogandinho;


function preload(){

    RexinhoCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");

    lugardopezinhochaozinho = loadImage("ground2.png");

    inuvenzinha = loadImage("cloud.png");

    b1 = loadImage("obstacle1.png");

    b2 = loadImage("obstacle2.png");

    b3 = loadImage("obstacle3.png");

    b4 = loadImage("obstacle4.png");

    b5 = loadImage("obstacle5.png");

    b6 = loadImage("obstacle6.png");

}


function setup(){

    createCanvas(600,200);

    Rexinho = createSprite(50,160,20,50);

    Rexinho.addAnimation("correndo", RexinhoCorrendo);

    Rexinho.scale = 0.5;

    lugardopezinho= createSprite(200, 180, 400, 20);

    lugardopezinho.addImage("pezinhodolugar", lugardopezinhochaozinho)

    lugardopezinho.x = lugardopezinho.width / 2;

    borda = createEdgeSprites();

    chaozinhoinvisivel = createSprite(100, 190, 400, 10); 

    chaozinhoinvisivel.visible = false;

    //var numero = Math.round(random(1,50));

    //console.log(numero);

    //console.log("Oi"+5);

    grupodanuvenzinha = new Group();

    grudodosobstaculos = new Group();

    //Rexinho.debug = true;
    Rexinho.setCollider("circle", 0,0,35);

}


function draw(){

    background("white");

    text ("mortinhas:"+pontinho, 501, 51);

    if(estadoJogandinho === jogandinho){

        lugardopezinho.velocityX = -2;

        pontinho = pontinho+Math.round(frameCount/60);

        if (lugardopezinho.x < 0){

            lugardopezinho.x = lugardopezinho.width / 2;
        }
    
        if(keyDown("space") && Rexinho.y >= 150){
    
            Rexinho.velocityY = -10;
    
        }

        Rexinho.velocityY = Rexinho.velocityY + 1;

        nuvenhador();

        geraculador();

        if (grudodosobstaculos.isTouching (Rexinho)){

            estadoJogandinho = naumjogandinho;

        }

    } else if(estadoJogandinho === naumjogandinho){

        lugardopezinho.velocityX = 0;

        grudodosobstaculos.setVelocityXEach (0);
        
        grupodanuvenzinha.setVelocityXEach (0);

    }

    //console.log (Rexinho.y);

    //console.log (frameCount);

    Rexinho.collide(chaozinhoinvisivel);

    drawSprites();

}

function nuvenhador(){

    if (frameCount%60===0){

        umanuvenzinha=createSprite (600, 100, 40, 10);

        umanuvenzinha.addImage (inuvenzinha);

        umanuvenzinha.velocityX=-3;

        umanuvenzinha.depth=Rexinho.depth;

        Rexinho.depth=Rexinho.depth+1;

        grupodanuvenzinha.add(umanuvenzinha);

        umanuvenzinha.y=Math.round(random(10,101));

        umanuvenzinha.lifetime = 250;

    }


}

function geraculador(){

    if (frameCount%60===0){

        var umobstaculinho = createSprite (600, 165, 10, 40) ;

        umobstaculinho.velocityX = -6;

        var v1 = Math.round (random(1,6));

        switch (v1){
            case 1: umobstaculinho.addImage (b1);
            break;

            case 2: umobstaculinho.addImage (b2);
            break;

            case 3: umobstaculinho.addImage (b3);
            break;

            case 4: umobstaculinho.addImage (b4);
            break;

            case 5: umobstaculinho.addImage (b5);
            break;

            case 6: umobstaculinho.addImage (b6);
            break;

            default: break;

        }

        umobstaculinho.scale = 0.4;

        grudodosobstaculos.add(umobstaculinho);

        umobstaculinho.lifetime = 251;



    }

}