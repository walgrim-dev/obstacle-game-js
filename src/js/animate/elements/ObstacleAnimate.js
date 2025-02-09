import ObstacleTextureLoader from "../textures/ObstacleTextureLoader.js";
import Animate from "../Animate.js";

export default class ObstacleAnimate {
    constructor(ctx) {
        this.textures = new ObstacleTextureLoader('img/sprites.png');
        this.ctx = ctx;
        this.action = "idle";
        Animate.objToAnimate.push(this);
    }

    set newContext(context) {
        this.context = context;
    }

    animate = () => {
        this.ctx.save();
        let sequence = this.textures.getSequence(this.action);
        let x = sequence.getX();
        let y = sequence.getY();
        this.ctx.drawImage(this.textures.spriteSheet, sequence.getX(), sequence.getY(), 16, 16, 0, 0, 16, 16);
        this.ctx.restore();
        sequence.nextFrame();
    }
}