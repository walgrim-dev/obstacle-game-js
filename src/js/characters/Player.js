import PlayerAnimate from '../animate/elements/PlayerAnimate.js';

export default class Player {
    constructor() {
        this.animation = new PlayerAnimate();
        this.speed = 10;
        this.level = 1;
    }

    movement = () => {
        addEventListener('keydown', (ev) => {
            if (ev.key === 'ArrowUp') {
                console.log("Arrow up");
            }
        })
    }
}