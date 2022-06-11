export default class Input {
    constructor(ctx, ship) {
        this.ctx = ctx;
        this.ship = ship;
    }
    inputCheck(event) {
        if (event.keyCode == 229) {
            return;
          }
    }
}