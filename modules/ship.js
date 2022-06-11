export default class Ship {
    constructor(shipImg) {
        this.shipImg = shipImg;
        this.width = 100;
        this.height = 100;
        this.x = 450;
        this.y = 520;
        this.speed = 2
    }
    moveUp() {
        this.y -= this.speed;
    }
    
}