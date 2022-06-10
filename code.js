import Screen from '/screen.js';
var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
var img = new Image();
img.src = 'ship.png';
const screen = new Screen(ctx, ship);
img.addEventListener('load', screen.drawScreen(), false);