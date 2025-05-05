import Animate from "../Animate.js";
import GameEngine from "../../game/GameEngine.js";
import WallTexture from "../texture/WallTexture.js";

export default class WallAnimate {
    /**
     * @param {WallObstacle} obstacle
     */
    constructor(obstacle) {
        // Fort couplage
        this.obstacle = obstacle;
        // Load texture
        this.textures = new WallTexture('img/parts.png', this.updateState);
        // Loadng state
        this.state = false;
        // Delta for frame animation
        this.delta = 0;
        Animate.objToAnimate.push(this);
    }

    updateState = () => {
        this.state = true;
    }

    animate = (ctx, delta, offsetX, offsetY) => {
        // Move obstacle (if movingObstacle)

        /*
        for (let i = 0; i < 1000000; i++) {

        }*/
        // Detect collisions
        const gameEngine = GameEngine.getInstance();
        if (gameEngine == null) return;

        const sequence = this.textures.getSequence(this.obstacle.action);

        ctx.save();

        const cutSizeW = sequence.getCutSizeW();
        const cutSizeH = sequence.getCutSizeH();

        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(this.textures.spriteSheet,
            x,
            y,
            cutSizeW,
            cutSizeH,
            this.obstacle.coordinates.x - offsetX,
            this.obstacle.coordinates.y  - offsetY,
            this.obstacle.size,
            this.obstacle.size);
        ctx.restore();
        if (this.delta === 30) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}