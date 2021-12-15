var Rexinho, RexinhoCorrendo, Morrinho;

var lugardopezinho, lugardopezinhochaozinho;

var chaozinhoinvisivel;

var umanuvenzinha, grupodanuvenzinha;

var inuvenzinha;

var b1, b2, b3, b4, b5, b6, grupodosobstaculos;

var pontinho = 0;

var jogandinho = 1;

var naumjogandinho = 0;

var estadoJogandinho = jogandinho;

var gamiuvir, igamiuvir;

var ristarti, iristarti;

var pulinho;

var mortinho;

var salvinho;

var mensagem = "Isso é uma mensagem";


function preload(){

    RexinhoCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");

    Morrinho = loadAnimation("trex_collided.png");

    lugardopezinhochaozinho = loadImage("ground2.png");

    inuvenzinha = loadImage("cloud.png");

    b1 = loadImage("obstacle1.png");

    b2 = loadImage("obstacle2.png");

    b3 = loadImage("obstacle3.png");

    b4 = loadImage("obstacle4.png");

    b5 = loadImage("obstacle5.png");

    b6 = loadImage("obstacle6.png");

    igamiuvir = loadImage ("gameOver.png");

    iristarti = loadImage ("restart.png");

    pulinho = loadSound ("jump.mp3");

    mortinho = loadSound ("die.mp3");

    salvinho = loadSound ("checkPoint.mp3");

}


function setup(){

    createCanvas(windowWidth,windowHeight);

    Rexinho = createSprite(50,height-70,20,50);

    Rexinho.addAnimation("correndo", RexinhoCorrendo);

    Rexinho.addAnimation("uhu", Morrinho);

    Rexinho.scale = 0.5;

    gamiuvir = createSprite (width/2, height/2-50);

    gamiuvir.addImage (igamiuvir);

    ristarti = createSprite (width/2, height/2);

    ristarti.addImage (iristarti);

    gamiuvir.scale = 0.5;

    ristarti.scale = 0.5;

    lugardopezinho= createSprite(width/2, height-80, width, 125);

    lugardopezinho.addImage("pezinhodolugar", lugardopezinhochaozinho)

    lugardopezinho.x = lugardopezinho.width / 2;

    borda = createEdgeSprites();

    chaozinhoinvisivel = createSprite(width/2, height-10, width, 125); 

    chaozinhoinvisivel.visible = false;

    //var numero = Math.round(random(1,50));

    //console.log(numero);

    //console.log("Oi"+5);

    grupodanuvenzinha = new Group();

    grupodosobstaculos = new Group();

    //Rexinho.debug = true;
    Rexinho.setCollider("circle", 0,0,35);

}


function draw(){

    //console.log(mensagem);

    background("white");

    text ("pontinhus:"+pontinho, 501, 51);

    if(estadoJogandinho === jogandinho){

        gamiuvir.visible = false;
    
        ristarti.visible = false;

        lugardopezinho.velocityX = -(2+pontinho/100);

        pontinho = pontinho+Math.round(frameRate()/60);

        if (pontinho > 0 && pontinho %100 === 0){
            salvinho.play ();
        }

        if (lugardopezinho.x < 0){

            lugardopezinho.x = lugardopezinho.width / 2;
        }
    
        if(keyDown("space") || touches > 0 && Rexinho.y >= 150){
    
            Rexinho.velocityY = -12;

            pulinho.play ();

            touches = [];
    
        }

        Rexinho.velocityY = Rexinho.velocityY + 1;

        nuvenhador();

        geraculador();

        if (grupodosobstaculos.isTouching (Rexinho)){

            estadoJogandinho = naumjogandinho;

            mortinho.play ();

        }

    } else if(estadoJogandinho === naumjogandinho){

        lugardopezinho.velocityX = 0;

        Rexinho.velocityY = 0;

        Rexinho.changeAnimation ("uhu", Morrinho);

        gamiuvir.visible = true;
    
        ristarti.visible = true;

        grupodosobstaculos.setLifetimeEach (-1);

        grupodanuvenzinha.setLifetimeEach (-1);

        grupodosobstaculos.setVelocityXEach (0);
        
        grupodanuvenzinha.setVelocityXEach (0);

        if(mousePressedOver(ristarti)){
            resetador();
        }

    }

    //console.log (Rexinho.y);

    //console.log (frameCount);

    Rexinho.collide(chaozinhoinvisivel);

    drawSprites();

}

function resetador(){

    estadoJogandinho = jogandinho;

    gamiuvir.visible = false;

    ristarti.visible = false;

    grupodanuvenzinha.destroyEach();

    grupodosobstaculos.destroyEach();

    Rexinho.changeAnimation ("correndo", RexinhoCorrendo);

    pontinho = 0;
}

function nuvenhador(){

    if (frameCount%60===0){

        umanuvenzinha=createSprite (width+20, height-300, 40, 10);

        umanuvenzinha.addImage (inuvenzinha);

        umanuvenzinha.velocityX=-3;

        umanuvenzinha.depth=Rexinho.depth;

        Rexinho.depth=Rexinho.depth+1;

        grupodanuvenzinha.add(umanuvenzinha);

        umanuvenzinha.y=Math.round(random(10,height/2));

        umanuvenzinha.lifetime = 250;

    }


}

function geraculador(){

    if (frameCount%60===0){

        var umobstaculinho = createSprite (width, height-95, 10, 40) ;

        umobstaculinho.velocityX = -(6+pontinho/100) ;

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

        grupodosobstaculos.add(umobstaculinho);

        umobstaculinho.lifetime = 250;



    }

}