import AnimationSequence from "../AnimationSequence.js";
import PlayerTextureLoader from "../textures/PlayerTextureLoader.js";
import Animate from "../Animate.js";

export default class PlayerAnimate {
    constructor(player, tileInfo) {
        this.player = player;
        this.textures = new PlayerTextureLoader('img/sprites.png');
        this.textures.load(this.updateState);
        this.tileInfo = tileInfo;
        this.state = false;
        this.delta = 0;
        Animate.objToAnimate.push(this);
    }

    updateState = () => {
        this.state = true;
    }

    animate = (ctx, delta) => {
        // Move player
        this.player.move(delta);

        ctx.save();
        let sequence = this.textures.getSequence(this.tileInfo.state);
        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(this.textures.spriteSheet,
            x,
            y,
            this.tileInfo.size.cutSize,
            this.tileInfo.size.cutSize,
            this.tileInfo.coordinates.x,
            this.tileInfo.coordinates.y,
            this.tileInfo.size.w,
            this.tileInfo.size.h);
        ctx.restore();
        if (this.delta === 15) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}