import Paddle from 'paddle.js';
import InputHandler from 'inputhandler.js';
import Ball from 'ball.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball;
new InputHandler(paddle);
paddle.draw(ctx);
let lastTime;


function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, 800, 600);
    paddle.update(deltaTime);
    paddle.draw(ctx);
    ball.draw(ctx);
    
    requestAnimationFrame(gameLoop);

}
gameLoop();
