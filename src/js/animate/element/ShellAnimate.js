import Animate from "../Animate.js";
import {objectColliding} from "../../collisions/checkCollisions.js";
import GameEngine from "../../game/GameEngine.js";
import {ActionType} from "../../action/Action.js";
import {ScaleFactor} from "../../scale/ScaleFactor.js";
import ShellTexture from "../texture/ShellTexture.js";

export default class ShellAnimate {
    /**
     * @param {ShellObstacle} obstacle
     */
    constructor(obstacle) {
        // Fort couplage
        this.obstacle = obstacle;
        // Load texture
        this.textures = new ShellTexture('img/parts.png', this.updateState);
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

        const oldX = this.obstacle.coordinates.x;

        if (this.obstacle.action === ActionType.MOVE) {
            this.obstacle.move(delta);
        }

        //console.log(delta)

        if (this.obstacle.action === ActionType.MOVE) {
            // ça là c'est nul
            const obstacles = gameEngine.level.getObstacles().filter(o => o !== this.obstacle);

            const x1 = this.obstacle.coordinates.x;
            const y1 = this.obstacle.coordinates.y;

            let collidingObstacle = objectColliding(x1, y1, this.obstacle.size, this.obstacle.size, obstacles);
            if (collidingObstacle) {
                // droite ou gauche
                if (x1 + this.obstacle.size > (collidingObstacle.coordinates.x * collidingObstacle.size)
                    || x1 < collidingObstacle.coordinates.x + collidingObstacle.size) {
                    this.obstacle.coordinates.x = oldX;
                }
                this.obstacle.coordinates.vx *= -1;
            }
        }
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
        sequence.nextFrame();
        if (this.delta === 30) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}