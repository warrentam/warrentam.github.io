export default class InputHandler {
    constructor(paddle) {

        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case 37: // Left Key
                    paddle.moveLeft();
                    break;
                
                case 39: // Right Key
                    paddle.moveRight();
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