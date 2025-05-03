import Animate from "../Animate.js";
import ObstacleTextureLoader from "../textures/ObstacleTextureLoader.js";
import {objectColliding} from "../../collisions/checkCollisions.js";
import GameEngine from "../../game/GameEngine.js";
import calculateDistanceToMove from "../calculateDistanceToMove.js";

export default class ObstacleAnimate {
    constructor(obstacle, tileInfo) {
        // Pas bon je le changerai plus tard
        this.obstacle = obstacle;
        this.textures = new ObstacleTextureLoader('img/sprites.png');
        this.textures.load(this.updateState);
        this.tileInfo = tileInfo;
        this.state = false;
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

        const oldX = this.tileInfo.coordinates.x;
        this.obstacle.move(delta);

        //console.log(delta)

        if (this.tileInfo.state === "movingObstacle") {
            const obstacles = gameEngine.level.getObstacles().filter(o => o !== this.obstacle);
            const x1 = this.tileInfo.coordinates.x;
            const y1 = this.tileInfo.coordinates.y;
            const w1 = this.tileInfo.size.w;
            const h1 = this.tileInfo.size.h;

            let collidingObstacle = objectColliding(x1, y1, w1, h1, obstacles);
            if (collidingObstacle) {
                // droite ou gauche
                if (this.tileInfo.coordinates.x + this.tileInfo.size.w > collidingObstacle.animation.tileInfo.coordinates.x
                    || this.tileInfo.coordinates.x < collidingObstacle.animation.tileInfo.coordinates.x + collidingObstacle.animation.tileInfo.size.w) {
                    this.tileInfo.coordinates.x = oldX;
                }
                this.tileInfo.coordinates.vx *= -1;
            }
        }
        ctx.save();
        let sequence = this.textures.getSequence(this.tileInfo.state);

        const cutSizeW = sequence.getCutSizeW();
        const cutSizeH = sequence.getCutSizeH();

        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(this.textures.spriteSheet,
            x,
            y,
            cutSizeW,
            cutSizeH,
            this.tileInfo.coordinates.x - offsetX,
            this.tileInfo.coordinates.y - offsetY,
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