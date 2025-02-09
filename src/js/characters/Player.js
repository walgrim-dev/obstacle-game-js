import PlayerAnimate from '../animate/elements/PlayerAnimate.js';

export default class Player {
    constructor() {
        this.animation = new PlayerAnimate();
        this.speed = 10;
        this.level = 1;
    }

    movement = () => {
        addEventListener('keydown', (ev) => {
            if (ev.key === 'ArrowUp' || ev.key === 'z') {
                this.animation.action = "move";
            } else if (ev.key === 'ArrowLeft' || ev.key === 'q') {
                this.animation.action = "move";
            } else if (ev.key === 'ArrowDown' || ev.key === 's') {
                this.animation.action = "move";
            } else if (ev.key === 'ArrowRight' || ev.key === 'd') {
                this.animation.action = "move";
            }
        });

        addEventListener('keyup', (ev) => {
            if (ev.key === 'ArrowUp' || ev.key === 'z') {
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowLeft' || ev.key === 'q') {
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowDown' || ev.key === 's') {
                this.animation.action = "idle";
            } else if (ev.key === 'ArrowRight' || ev.key === 'd') {
                this.animation.action = "idle";
            }
        });
    }
}