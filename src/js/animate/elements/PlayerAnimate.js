import AnimationSequence from "../AnimationSequence.js";
import PlayerTextureLoader from "../textures/PlayerTextureLoader.js";
import Animate from "../Animate.js";

export default class PlayerAnimate {
    constructor() {
        this.textures = new PlayerTextureLoader('img/sprites.png');
        this.textures.load(this.updateState);
        this.action = "idle";
        this.state = false;
        Animate.objToAnimate.push(this);
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
        ctx.drawImage(this.textures.spriteSheet, x, y, this.textures.cutSize, this.textures.cutSize, 20, 20, this.textures.canvasSize, this.textures.canvasSize);
        ctx.restore();
        sequence.nextFrame();
    }
}