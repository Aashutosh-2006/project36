//Create variables here
var  dog, happyDog, database, foodS, foodStock;
var d1,d2;
var b1,b2;
var fedTime,lastFed;
var foodObj;



function preload()
{
  //load images here
  d1=loadImage("dogImg.png");
  d2=loadImage("dogImg1.png");
}

function setup() {
  
  database=firebase.database();
   console.log(database);
  
  createCanvas(1000, 800);
  
  dog=createSprite(750,500,50,50);
  dog.addImage(d1);
  dog.scale=0.25;

  foodObj=new Food(10,200,50,50);

  b1=createButton("Feed the dog");
  b1.position(700,95);
  b1.mousePressed(feedDog);

  b2=createButton("Add Food");
  b2.position(800,95);
  b2.mousePressed(addfoods);

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

/*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d2);
}*/

  

  /*display(foodObj);
  display(b1);
  display(b2);*/

  //add styles here
text("Notes:Press UP_ARROW Key To Feed Drago Milk!");
fill("blue");
stroke("Green");

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();

 
})

fill(255,255,254);
textSize(15);
if("lastFed>=12"){
  text("Last Feed:"+lastFed%12+"PM",350,30);
}else if(lastFed==0){
text("Last Feed:12 AM",350,30);
}else{
  text("Last Feed:"+lastFed+"AM",350,30);
}
foodObj.display()
drawSprites()
}

function writeStock(x){

  if(x<=0){
x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function readStock(data){
  foodS=data.val();
}
function addfoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
dog.addImage(d2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}