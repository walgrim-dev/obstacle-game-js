import AnimationSequence from "../AnimationSequence.js";
import PlayerTextureLoader from "../textures/PlayerTextureLoader.js";
import Animate from "../Animate.js";

export default class PlayerAnimate {
    constructor() {
        this.textures = new PlayerTextureLoader('img/sprites.png');
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

    updateState = () => {
        this.state = true;
    }

    animate = (ctx) => {
        ctx.save();
        let sequence = this.textures.getSequence(this.action);
        let x = sequence.getX();
        let y = sequence.getY();
        console.log(this.pos);
        ctx.drawImage(this.textures.spriteSheet, x, y, this.textures.cutSize, this.textures.cutSize, this.pos.x, this.pos.y, this.textures.canvasSize, this.textures.canvasSize);
        ctx.restore();
        if (this.delta === 15) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}