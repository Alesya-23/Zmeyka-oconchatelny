const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src= "image.png";

const foodImg = new Image();
foodImg.src= "food.png";

let box = 73;

let score = 0;

let food = {
 x: Math.floor((Math.random() * 11)) * box,
 y: Math.floor((Math.random() * 10 + 1)) * box,

};

let snake = [];
 snake[0] = {
	x: 5 * box,
	y: 6 * box
};

document.addEventListener("keydown", direction);

let dir;


function direction(event) {
    if(event.keyCode==37 && dir!="right")
    	dir="left";
    else if(event.keyCode==38 && dir!="down")
    	dir="up";
    else if(event.keyCode==40 && dir!="up")
    	dir="down";
    else if(event.keyCode==39 && dir!="left")
    	dir="right";

}
 function eatTail(head,arr){
 	for(let i = 0; i<arr.length;i++){
 		if(head.x==arr[i].x && head.y==arr[i].y)
 			clearInterval(game)
 	}

 }


function drawGame () {
 ctx.drawImage(ground, 0, 0);
 
 ctx.drawImage(foodImg, food.x, food.y);

 for(let i = 0; i < snake.length; i++){
 	ctx.fillStyle = i == 0 ? "red" : "yellow";
 	ctx.fillRect(snake[i].x, snake[i].y, box, box);
 }
 ctx.fillStyle = "blue";
 ctx.font= "60px Arival";
 ctx.fillText(score,box*1.35,box*0.95);

 let snakeX = snake[0].x;
 let snakeY = snake[0].y;

 if(snakeX ==food.x && snakeY == food.y){
    score++;
    food = {
    	x: Math.floor((Math.random() * 10)) * box,
        y: Math.floor((Math.random() * 9 + 1)) * box,
    };

   } else {
    	snake.pop();

 }

if(snakeX < box || snakeX > box*9.99 || 
	snakeY < box*1.2 || snakeY>box*9)	
	clearInterval(game)
 if (dir == "left") snakeX -= box;
 if (dir == "right") snakeX += box;
 if (dir == "up") snakeY -= box;
 if (dir == "down") snakeY += box;

 let newHead = {

 	x:snakeX,
 	y:snakeY
 };
 
  eatTail(newHead, snake)
 snake.unshift(newHead);
 }

let game = setInterval(drawGame, 160);
