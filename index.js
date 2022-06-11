import Screen from './modules/screen.js';
import Ship from './modules/ship.js';


var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");


var shipImg = document.getElementById("ship")
const ship = new Ship(shipImg);
const screen = new Screen(ctx, ship);

function gameLoop() {
    ctx.clearRect(0, 0, 1000, 600);
    screen.drawScreen();
    ship.moveUp();
    requestAnimationFrame(gameLoop);
}
gameLoop();