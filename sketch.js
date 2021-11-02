const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig2;
var backgroundImg,bg,platform;
var bird, resorte;
var ground;
var log1,log2,log3,log4,log5,log6;
var box2,box3,box4,box5;
var gameState = "resortera"
var score = 0;
function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    //chain = new Chain(bird.body,log6.body);
    resorte = new Resortera(bird.body,{x:200,y:50});
      
}

function draw(){
    if(backgroundImg)    background(backgroundImg);
    noStroke();
    textSize(35);
    fill("white");
    text("puntuacion"+score,width-300,50);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    //chain.display();   
    resorte.display();
    
}

function mouseDragged(){
    if(gameState !== "lanzar"){
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
    }
    

}
function mouseReleased(){
    resorte.fly();
    gameState = "lanzar";
}

function keyPressed(){
    if(keyCode ===32 && bird.body.speed < 0.5){
        resorte.attach(bird.body);
        gameState = "resortera";
        bird.trajectory =[];
        Matter.Body.setPosition(bird.body,{x:200,y:67});
        console.log(bird.body.speed);
    }


}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Mexico_city");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    //console.log(hour);
    if(hour >= 06 && hour <= 17){
        bg = "sprites/bg.png";
    }else{
        bg = "sprites/bg2.jpeg";
    }
    backgroundImg = loadImage(bg);
}