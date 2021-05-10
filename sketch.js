var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastfed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastfed=data.val();
}
)
 
  //write code to display text lastFed time here
  fill(0);
  textSize(40);
  if(lastfed>=12){
    text("last Fed:"+lastfed%12+"pm",235,30 );
  }
  else if(lastfed==0){
    text("last fed: 12:00am",350,30);
  } 
  else{
text("last fed:"+lastfed+"am",350,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val=foodobj.getFoodStock();
  if(food_stock_val <= 0){
    foodobj.updateFoodStock(food_stock_val*0);
  }
  else{
    foodobj.updateFoodStock(food_stock_val-1);
  }
database.ref('/').update({
  Food:foodObj.getFoodStock,
  FeedTime: hour()
})
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
