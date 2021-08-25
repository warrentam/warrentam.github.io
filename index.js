let canvas = document.getElementById('gameScreen')
let ctx = canvas.getContext('2d')
let asteroidArray = []
class Asteroid {
    constructor() {
        this.sprite1 = document.getElementById('asteroid1')
        this.sprite2 = document.getElementById('asteroid2')
        this.sprite3 = document.getElementById('asteroid3')
        this.width = 50
        this.height = 50
        this.x = xRandomPosition()
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
function xRandomPosition() {
    return Math.floor(Math.random() * 900)
}
function asteroidGenerationTiming() {
    return Math.floor(Math.random() * 50)
}
function asteroidPushToArray() {
    if (asteroidGenerationTiming() == 25) {
        if (asteroidArray.length < 10) {
            asteroidArray.push(new Asteroid)
        }
    }
}
function gameLoop() {
    ctx.clearRect(0, 0, 1000, 600)
    asteroidGenerationTiming()
    asteroidPushToArray()
    asteroidArray.forEach(asteroid => {
        asteroid.draw()
    })
    requestAnimationFrame(gameLoop)
}
gameLoop()