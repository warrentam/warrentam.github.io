import Paddle from '/src/paddle.js';
import InputHandler from '/src/inputhandler.js';
import Ball from '/src/ball.js';

export default class Game {
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