canvas = document.getElementById('gameScreen')
ctx = canvas.getContext('2d')
ship = document.getElementById('ship')
let x = 450
let y = 500
let maxSpeed = 5
let xSpeed = 0
let ySpeed = 0
function listener() {
    document.addEventListener('keydown', event => {
        switch(event.keyCode) {
            case 37:
                xSpeed = -maxSpeed
                break
            case 39:
                xSpeed = maxSpeed
                break
            case 38:
                ySpeed = -maxSpeed
                break
            case 40:
                ySpeed = maxSpeed
        }
    })

    document.addEventListener('keyup', event => {
        switch(event.keyCode) {
            case 37:
                if (xSpeed<0) {
                    xSpeed = 0
                }
                break
            case 39:
                if (xSpeed > 0) {
                    xSpeed = 0
                }
                break
            case 38:
                if(ySpeed < 0) {
                    ySpeed = 0
                }
                break
            case 40:
                if (ySpeed > 0) {
                    ySpeed = 0
                }
                break
        }
    })
}
function gameLoop() {
    ctx.clearRect(0, 0, 1000, 600)
    ctx.drawImage(ship, x, y, 100, 100)
    x += xSpeed
    y += ySpeed
    if (x >= 900) {
        x = 900
    }
    if (x <= 0) {
        x = 0
    }
    listener()
    requestAnimationFrame(gameLoop)
}
gameLoop()
