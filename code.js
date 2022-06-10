import Screen from '/screen.js';
var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
var shipImg = document.getElementByIs("ship")
const screen = new Screen(ctx, shipImg);
shipImg.addEventListener('load', screen.drawScreen());