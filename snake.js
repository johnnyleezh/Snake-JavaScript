const cvs =document.getElementById("snake");
const ctx = cvs.getContext("2d");

//unit to use for canvas: 32 pixels
const box = 32;

const ground = new Image();
ground.src="img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";
// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake
// snake object will be stored in the array snake

let snake = [];

//snake[0] will be the head of the snake

snake[0] = {
    x: 9*box,
    y: 10*box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//EventListener for the keys

let d; 

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

//collision detection

function collision(head, array){
    for(let i=0; i< array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
       // ctx.fillStyle = ( i == 0 )? "black" : "white";
       ctx.fillStyle = (getSnakeColor(i));
       ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms
let game = setInterval(draw,150);

//random color generator for body of snake
function getSnakeColor(number)
{
    //going to make it a correl snake
    //head is black, yellow, black, red, yellow, red
    //take care of the head which is always black
    if (number === 0)
    return "black";
    //we also know that every odd number is always yellow
    if (number%2 != 0)
    return "yellow";
    //we know every even one is going to be either red or black but it depends on 
    //whether it's a multiple of 4 or 2
    if(number%4 === 0)
    return "red";

    if (number%2 ===0)
    return "black";


}
