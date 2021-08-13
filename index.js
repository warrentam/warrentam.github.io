const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
}

class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        new InputHandler(this.paddle, this);
        this.lives = 3;
        this.levels = [level1, level2];
        this.currentLevel = 0;
    }
    start() {
        if (this.gamestate !== GAMESTATE.MENU&&
            this.gamestate !== GAMESTATE.NEWLEVEL) return; 
        
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;
    }
    
    update(deltaTime) {
        if (this.lives == 0){
            this.gamestate = GAMESTATE.GAMEOVER;
        }
        if (this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU||
            this.gamestate === GAMESTATE.GAMEOVER
            ) return;
        
        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();

        }
        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if(this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth/2, this.gameHeight/2)
        }
    
    
        if(this.gamestate == GAMESTATE.MENU){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Press SPACEBAR To Start', this.gameWidth/2, this.gameHeight/2)
        }

        if(this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', this.gameWidth/2, this.gameHeight/2)
        }
    }
    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else{
            this.gamestate = GAMESTATE.PAUSED;
        }
        
    }
}

class Paddle {
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

    // Ball Movement
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

class InputHandler {
    constructor(paddle, game) {

        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 37: // Left Key
                    paddle.moveLeft();
                    break;
                
                case 39: // Right Key
                    paddle.moveRight();
                    break;
                
                case 27:
                    game.togglePause();
                    break;
                
                case 32:
                    game.start();
                    break;
            }
        });
        
        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case 37: // Left Key
                    if (paddle.speed < 0) {
                        paddle.stop();
                    }
                    break;
                
                case 39: // Right Key
                    if (paddle.speed > 0) {
                        paddle.stop();
                    }
                    break;
            }
        });
    }
}


class Ball {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('img_ball')
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.reset();

    }

    reset() {
        this.position = {x: 10, y: 400 };
        this.speed = {x: 4, y: -2};
    }
    
    // Drawing Ball Image
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    // Updating Ball Movement
    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x
        }
        if (this.position.y < 0){
            this.speed.y = -this.speed.y
        }
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();
        }
        if (detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }
}  

class Brick {
    constructor(game, position) {
        this.game = game;
        this.image = document.getElementById('img_brick')
        this.position = position;
        this.width = 80;
        this.height = 24;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.markedForDeletion = false;

    }

    update() {
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }

    }
    
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

function buildLevel(game, level) {
    let bricks = [];
    level.forEach((row, rowIndex)=> {
        row.forEach((brick, brickIndex)=>{
            if(brick === 1) {
                let position ={
                    x: 80 * brickIndex,
                    y: 75 + 24 * rowIndex
                };
                bricks.push(new Brick(game, position));
            }
        });
    });
    return bricks
}

function detectCollision(ball, gameObject) {
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y
    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    if (bottomOfBall >= topOfObject && 
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideOfObject && 
        ball.position.x + ball.size <= rightSideOfObject) {
        return true;
        }
    else {
        return false;
    }
        
    

}

const level1 = [
    [0,1,1,0,0,0,0,1,1,0],
    //[1,1,1,1,1,1,1,1,1,1],
    //[1,1,1,1,1,1,1,1,1,1],
    //[1,1,1,1,1,1,1,1,1,1]
];

const level2 = [
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime;


function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);