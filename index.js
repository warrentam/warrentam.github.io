class Paddle {
    constructor(gameWidth, gameHeight) {
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 10;
        this.speed = 0;


        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10

        };


    }
    draw() {
        ctx.fillStyle = '#0ff'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime) {
        if (!deltaTime) {
            return;
        } 
        this.position.x += this.speed;  
        if (this.position.x < 0) {
            this.position.x = 0;
        }     
        if (this.position.x > 650) {
            this.position.x = 650;
        }
    }
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

class Ball {
    constructor() {
        this.image = document.getElementById('img_ball')
    }
    draw() {
        ctx.drawImage(this.image, 10, 10, 16, 16);
    }
    update() {
        
    }
}   

class InputHandler {
    constructor(paddle) {
        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                
                case 39:
                    paddle.moveRight();
                    break;
            }
        });
        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case 37:
                    if (paddle.speed < 0) {
                    paddle.stop();
                    }
                    break;
                
                case 39:
                    if (paddle.speed > 0) {
                    paddle.stop();
                    }
                    break;
            }
        });
    }
}
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball;
new InputHandler(paddle);
paddle.draw();
let lastTime;


function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, 800, 600);
    paddle.update(deltaTime);
    paddle.draw();
    ball.draw();
    
    requestAnimationFrame(gameLoop);

}
gameLoop();
