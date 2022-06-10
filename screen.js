export default class Screen {
    constructor(ctx, ship) {
        this.ctx = ctx;
        this.ship = ship;
    }
    drawScreen() {
        this.ctx.drawImage(ship, 658, 478, 110, 122);
    }
}