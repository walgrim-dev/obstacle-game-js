import Animate from "../Animate.js";
import ObstacleTextureLoader from "../textures/ObstacleTextureLoader.js";

export default class ObstacleAnimate {
    constructor() {
        this.textures = new ObstacleTextureLoader('img/sprites.png');
        this.textures.load(this.updateState);
        this.action = "idle";
        this.state = false;
        this.delta = 0;
        this.pos = null;
        Animate.objToAnimate.push(this);
    }

    updatePos = (x, y) => {
        this.pos.x += x;
        this.pos.y += y;
    }

    set newMovement(movement) {
        this.action = movement;
    }

    updateState = () => {
        this.state = true;
    }

    animate = (ctx) => {
        ctx.save();
        let sequence = this.textures.getSequence(this.action);
        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(this.textures.spriteSheet, x, y, this.textures.cutSize, this.textures.cutSize, this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        ctx.restore();
        if (this.delta === 30) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}