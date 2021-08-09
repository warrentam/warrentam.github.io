class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
    }
    start() {
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [this.ball, this.paddle];
        new InputHandler(this.paddle);
    }
    
    update(deltaTime) {
        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx));
    }
}

class Paddle {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 10;
        this.speed = 0;


        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10

        };


    }
    draw(ctx) {
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime) {
         
        this.position.x += this.speed;  
        if (this.position.x < 0) {
            this.position.x = 0;
        }     
        if (this.position.x > 650) {
            this.position.x = 650;
        }
    }

    // Ball Movement
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
}  

class InputHandler {
    constructor(paddle) {

        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 37: // Left Key
                    paddle.moveLeft();
                    break;
                
                case 39: // Right Key
                    paddle.moveRight();
                    break;
            }
        });
        
        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case 37: // Left Key
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }
                    break;
                
                case 39: // Right Key
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;
            }
        });
    }
}


class Ball {
    constructor(game) {
        this.image = document.getElementById('img_ball')
        this.position = {x: 10, y: 10 };
        this.speed = {x: 4, y: 2};
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

    }
    
    // Drawing Ball Image
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    // Updating Ball Movement
    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x
        }
        if (this.position.y + this.size> this.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y
        }

    }
}   


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
let lastTime;


function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);