let canvas = document.getElementById('gameScreen')
let ctx = canvas.getContext('2d')
let asteroidArray = []
let laserArray = []
class Asteroid {
    constructor() {
        this.sprite1 = document.getElementById('asteroid1')
        this.sprite2 = document.getElementById('asteroid2')
        this.sprite3 = document.getElementById('asteroid3')
        this.width = 50
        this.height = 50
        this.x = asteroidRandomizer.xRandomPosition()
        this.y = 0
        this.sprite = 1
        this.spriteNumber = Math.floor(Math.random() * 3 + 1)
        if (this.spriteNumber == 1) {
            this.sprite = this.sprite1
        }
        if (this.spriteNumber == 2) {
            this.sprite = this.sprite2
        }
        if (this.spriteNumber == 3) {
            this.sprite = this.sprite3
        }
    }
    
    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
        this.y += 5
        if (this.y > 600) {
            asteroidArray.shift()
        }
    }
}

class AsteroidRandomizer {
    constructor() {}
    xRandomPosition() {
        return Math.floor(Math.random() * 900)
    }
    asteroidGenerationTiming() {
        return Math.floor(Math.random() * 50)
    }
    asteroidPushToArray() {
        if (this.asteroidGenerationTiming() == 25) {
            if (asteroidArray.length < 10) {
                asteroidArray.push(new Asteroid)
            }
        }
        if (asteroidArray.length == 0) {
            asteroidArray.push(new Asteroid)
        }
    }

}
class Ship {
    constructor() {
        this.sprite = document.getElementById('ship')
        this.x = 450
        this.y = 520
        this.width = 100
        this.height = 100
        this.maxSpeed = 5
        this.xSpeed = 0
        this.ySpeed = 0
    }
    draw() {
        this.x += this.xSpeed
        this.y += this.ySpeed
        collisionDetector.edgeDetector()
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    }
    left() {
        this.xSpeed = -this.maxSpeed
    }
    right() {
        this.xSpeed = this.maxSpeed
    }
    ascend() {
        this.ySpeed = -this.maxSpeed
    }
    descend() {
        this.ySpeed = this.maxSpeed
    }
    stopx() {
        this.xSpeed = 0
    }
    stopy() {
        this.ySpeed = 0
    }

}
class Laser {
    constructor() {
        this.sprite = document.getElementById('laser')
        this.x = ship.x - 1
        this.y = ship.y - 120
        this.width = 100
        this.height = 200
        this.speed = -10
    }
    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
        this.y += this.speed
        if(this.y < -90) {
            laserArray.shift()
        }
    }
    spawnLaser() {
        laserArray.push(new Laser);
    }
}
class InputHandler {
    constructor() {
        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 32:
                    if(laserArray.length < 10) {
                        laser.spawnLaser();
                    }
                    else {
                    }
                    break
                case 37:
                    ship.left()
                    break
                case 39:
                    ship.right()
                    break
                case 38:
                    ship.ascend()
                    break
                case 40:
                    ship.descend()
                    break

            }
        })
        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case 32:
                    break
                case 37:
                    if (ship.xSpeed < 0) {
                        ship.stopx()
                    }
                    break
                case 39:
                    if (ship.xSpeed > 0) {
                        ship.stopx()
                    }
                    break
                case 38:
                    if (ship.ySpeed < 0){
                        ship.stopy()
                    }
                    break
                case 40:
                    if (ship.ySpeed > 0) {
                        ship.stopy()
                    }
                    break

            }
        })
    }
}
class CollisionDetector {
    constructor() {}
    edgeDetector() {
        if (ship.x >= 910) {
            ship.x = 910
        }
        if (ship.x <= -10) {
            ship.x = -10
        }
        if(ship.y >= 520) {
            ship.y = 520
        }
        if (ship.y <= -10) {
            ship.y = -10
        }
    }
}
let collisionDetector = new CollisionDetector
let ship = new Ship
new InputHandler
let asteroidRandomizer = new AsteroidRandomizer
let laser = new Laser
function gameLoop() {
    ctx.clearRect(0, 0, 1000, 600)
    collisionDetector.edgeDetector()
    ship.draw()
    laserArray.forEach(laser => {
        laser.draw();
    });
    asteroidRandomizer.asteroidGenerationTiming()
    asteroidRandomizer.asteroidPushToArray()
    asteroidArray.forEach(asteroid => {
        asteroid.draw()
    })
    requestAnimationFrame(gameLoop)
}
gameLoop()