var player,playerimg,playerpulo
var solo1,soloverdadeiro,soloverdadeiro2,soloi
var estado = "Play"
var inimigo,inimigogp,inimigoimg
var inimigo2,inimigo3,inimigo4,inimigo5
var bg,bgq
var estrelai,estrela
var gameov
var pontos = 0
var powerup,PT,gp
var boost = false
function preload(){
    bgq = loadImage("cenario.png")
    inimigoimg = loadImage("inimigoverde.png");inimigo2 = loadImage("inimigoamarelo.png");inimigo3 = loadImage("inimigoazul.png");inimigo4 = loadImage("inimigoPreto.png");inimigo5 = loadImage("inimigovermleho.png");
    playerimg = loadAnimation("aaaa.png","0.png");
    playerpulo = loadAnimation("jump.png")
    soloi = loadImage("ground2.png")
    estrelai = loadImage("estrela.png")
gameov = loadAnimation("fimdeJogo.png")
    PT = loadAnimation("powerupyellow.png","powerupgreen.png","powerupazul.png","powerupred.png")
}

function inimigos(){
    
    if(frameCount % 95 == 0 ){
        inimigo = createSprite(width + 20,283);
        inimigo.velocityX = solo1.velocityX;
        inimigo.lifeTime = 200;
        var boo = Math.round(random(1,5));
        inimigo.setCollider("rectangle",-15,0,50,50)
        switch(boo){
            case 1: inimigo.addImage(inimigoimg); break;
            case 2: inimigo.addImage(inimigo2); break;
            case 3: inimigo.addImage(inimigo3); break;
            case 4: inimigo.addImage(inimigo4); break; 
            case 5: inimigo.addImage(inimigo5); break;
            default:break;
        }
        inimigogp.add(inimigo)
    }
}
function setup() {
   createCanvas(windowWidth,400)
   inimigogp = new Group();
   gp = new Group();
   bg = createSprite(width/4,50);
   bg.addImage(bgq)
   soloverdadeiro2 = createSprite(width/2,350);
    soloverdadeiro2.width = width
    solo1 = createSprite(width/2,303);
    solo1.addImage(soloi)
    
    solo1.velocityX = -5;
for(var i = 0; i <=149; i++){
    estrela = createSprite(Math.round(random(1,1500)),Math.round(random(1,300)))
    estrela.scale = 0.4
    estrela.addImage(estrelai)
    estrela.depth = 0
}
    player = createSprite(width/13,200)
   player.scale = 0.2
   player.addAnimation("run",playerimg)
   player.addAnimation("pulo",playerpulo)
   player.addAnimation("morrer",gameov)
   soloverdadeiro = createSprite(player.x,solo1.y + 57)
   soloverdadeiro.visible = false;
   player.setCollider("circle",0,0,150)
}
    

function draw() {
    background("Black")
    drawSprites()
    player.collide(soloverdadeiro)
    if (estado == "Play"){
        if (frameCount%20 == 0){
        pontos++
        }
        fill("White");
        text("Pontos: "+ pontos,width - 100,100)
        console.log(frameCount)
        inimigos();
        if((keyDown("Space")) && player.y == 280 || player.y == 279){  
            player.velocityY = - 6.51
        }
     if (solo1.x <= 300){
    solo1.x = width/1.5
         }
         if(player.y != 280){
            player.changeAnimation("pulo")
         }else{
             player.changeAnimation("run")
         }
    player.velocityY += 0.16;
    if (player.isTouching(inimigogp)){
        console.log("tocou")
        estado = "End"
    }
    solo1.velocityX -= 0.01
    if(player.isTouching(gp)){
        gp.destroyEach()
        boost = true
            }
 }
 if(estado == "End"){
     stroke("White")
     fill("Blue");
 text("Pressione Espaço para continuar",width/2,350)
    player.changeAnimation("morrer");
    player.x = width/2
    player.y = height/2
    player.rotation = -90
    solo1.velocityX = 0
    inimigogp.setVelocityXEach(0);
    inimigogp.setLifetimeEach(-1)
    if(keyDown("Space")){
        reset()
  
}
 }
 
}
function reset(){
    estado = "Play"
    player.rotation = 0
    inimigogp.destroyEach();
    player.y = 200
    player.x = width/13
    solo1.velocityX = -5
    pontos = 0
}
