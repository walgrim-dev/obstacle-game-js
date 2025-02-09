import PlayerAnimate from '../animate/elements/PlayerAnimate.js';

export default class Player {
    constructor() {
        this.animation = new PlayerAnimate();
        this.speed = 5;
        this.level = 1;
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.isMoving = false;
        this.listenToKeys();
        this.updateMovement();
    }

    listenToKeys = () => {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z') this.moves.up = true;
            else if (ev.key === 'q') this.moves.left = true;
            else if (ev.key === 's') this.moves.down = true;
            else if (ev.key === 'd') this.moves.right = true;

            this.animation.action = "move";
            this.isMoving = true;
        });

        addEventListener('keyup', (ev) => {
            if (ev.key === 'z') this.moves.up = false;
            else if (ev.key === 'q') this.moves.left = false;
            else if (ev.key === 's') this.moves.down = false;
            else if (ev.key === 'd') this.moves.right = false;

            if (!this.moves.up && !this.moves.down && !this.moves.left && !this.moves.right) {
                this.animation.action = "idle";
                this.isMoving = false;
            }
        });
    }

    updateMovement = () => {
        if (this.isMoving) {
            let dx = 0, dy = 0;
            if (this.moves.up) dy -= this.speed;
            if (this.moves.down) dy += this.speed;
            if (this.moves.left) dx -= this.speed;
            if (this.moves.right) dx += this.speed;

            this.animation.updatePos(dx, dy);
        }
        requestAnimationFrame(this.updateMovement);
    }
}
