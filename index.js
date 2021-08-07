import Game from '/src/game.js';


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
new InputHandler(paddle);
paddle.draw(ctx);
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
