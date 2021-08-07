export default class Paddle {
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