import AnimationSequence from "../sequence/AnimationSequence.js";
import PlayerTexture from "../texture/PlayerTexture.js";
import Animate from "../Animate.js";
import {ScaleFactor} from "../../scale/ScaleFactor.js";

export default class PlayerAnimate {
    constructor(player) {
        this.player = player;
        this.textures = new PlayerTexture('img/smw_mario_sheet.png', this.updateState);
        this.state = false;
        this.delta = 0;
        Animate.objToAnimate.push(this);
    }

    updateState = () => {
        this.state = true;
    }

    animate = (ctx, delta, offsetX, offsetY) => {
        // Move player
        this.player.move(delta);

        ctx.save();
        const sequence = this.textures.getSequence(this.player.action);
        const cutSizeW = sequence.getCutSizeW();
        const cutSizeH = sequence.getCutSizeH();
        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(
            this.textures.spriteSheet,
            x,
            y,
            cutSizeW,
            cutSizeH,
            this.player.coordinates.x - offsetX,
            this.player.coordinates.y - offsetY,
            this.player.size,
            this.player.size);
        ctx.restore();
        if (this.delta === 15) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}