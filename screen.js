export default class Screen {
    constructor(ctx, ship) {
        this.ctx = ctx;
        this.ship = ship;
    }
    drawScreen() {
        ctx.drawImage(ship, 658, 478, 110, 122);
    }
}