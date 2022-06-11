export default class Screen {
    constructor(ctx, ship) {
        this.ctx = ctx;
        this.ship = ship;
    }
    drawScreen() {
        this.ctx.drawImage(this.ship, this.ship.x, this.ship.y, this.ship.width, this.ship.height);
    }
}