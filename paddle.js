export default class Paddle {
    constructor(gameWidth, gameHeight) {
        this.width = 150;
        this.height = 30;


        this.position = {
           x: 0,
           y: 0

        };


    }
    draw(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
//x: gameWidth / 2 - this.width / 2,
           // y: gameHeight - this.height - 10