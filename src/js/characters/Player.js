import PlayerAnimate from '../animate/elements/PlayerAnimate.js';

export default class Player {
    constructor() {
        this.animation = new PlayerAnimate();
        this.speed = 10;
        this.level = 1;
        this.listenToKeys();
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }

    listenToKeys = () => {
        addEventListener('keydown', (ev) => {
            if (ev.key === 'z') {
                this.animation.action = "move";
                this.moves.up = true;
                if (this.moves.left) {
                    this.animation.updatePos(-this.speed, 0);
                } else if (this.moves.right) {
                    this.animation.updatePos(this.speed, 0);
                }
                this.animation.updatePos(0, -this.speed);
            } else if (ev.key === 'q') {
                this.animation.action = "move";
                this.moves.left = true;
                if (this.moves.up) {
                    this.animation.updatePos(0, -this.speed);
                } else if (this.moves.down) {
                    this.animation.updatePos(0, this.speed);
                }
                this.animation.updatePos(-this.speed, 0);
            } else if (ev.key === 's') {
                this.animation.action = "move";
                this.moves.down = true;
                if (this.moves.left) {
                    this.animation.updatePos(-this.speed, 0);
                } else if (this.moves.right) {
                    this.animation.updatePos(this.speed, 0);
                }
                this.animation.updatePos(0, this.speed);
            } else if (ev.key === 'd') {
                this.animation.action = "move";
                this.moves.right = true;
                if (this.moves.up) {
                    this.animation.updatePos(0, -this.speed);
                } else if (this.moves.down) {
                    this.animation.updatePos(0, this.speed);
                }
                this.animation.updatePos(this.speed, 0);
            }
        });

        addEventListener('keyup', (ev) => {
            this.animation.action = "idle";
            if (ev.key === 'z') {
                this.moves.up = false;
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowLeft' || ev.key === 'q') {
                this.moves.left = false;
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowDown' || ev.key === 's') {
                this.moves.down = false;
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowRight' || ev.key === 'd') {
                this.moves.right = false;
                this.animation.action = "idle";
            }
        });
    }
}