import Animate from "../Animate.js";
import {objectColliding} from "../../collisions/checkCollisions.js";
import GameEngine from "../../game/GameEngine.js";
import ObstacleTexture from "../texture/ObstacleTexture.js";
import {ActionType} from "../../action/Action.js";

export default class ObstacleAnimate {
    /**
     * @param {Obstacle} obstacle
     */
    constructor(obstacle) {
        // Fort couplage
        this.obstacle = obstacle;
        // Load texture
        this.textures = new ObstacleTexture('img/sprites.png', this.updateState);
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
            const obstacles = gameEngine.level.getObstacles().filter(o => o !== this.obstacle);
            const x1 = this.obstacle.coordinates.x;
            const y1 = this.obstacle.coordinates.y;
            const w1 = sequence.getCutSizeW();
            const h1 = sequence.getCutSizeH();

            let collidingObstacle = objectColliding(x1, y1, w1, h1, obstacles);
            if (collidingObstacle) {
                const collidingObsAction = collidingObstacle.action;
                const collidingObsWidth = collidingObstacle.animation.textures.getSequence(collidingObsAction).getCutSizeW();
                // droite ou gauche
                if (x1 + w1 > collidingObstacle.coordinates.x
                    || x1 < collidingObstacle.coordinates.x + collidingObsWidth) {
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
            this.obstacle.coordinates.y - offsetY,
            cutSizeW * 3,
            cutSizeH * 3);
        ctx.restore();
        if (this.delta === 30) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}