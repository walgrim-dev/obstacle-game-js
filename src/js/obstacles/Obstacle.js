import ObstacleAnimate from '../animate/elements/ObstacleAnimate.js';
import {objectColliding} from "../collisions/checkCollisions.js";
import GameEngine from "../game/GameEngine.js";

export default class Obstacle {
    constructor(tileInfo) {
        this.animation = new ObstacleAnimate(this, tileInfo);
    }

    move = () => {
        const tileInfo = this.animation.tileInfo;
        if (tileInfo.state === "movingObstacle") {
            tileInfo.coordinates.x += tileInfo.coordinates.vx;
            /*
            const before = this.animation.tileInfo;

            this.animation.pos.x += this.speed;

            const gameEngine = GameEngine.getInstance();
            const obstacles = gameEngine.level.getObstacles().filter(o => o !== this);

            const obj = objectColliding(obstacles, this.animation.pos);

            if (obj) {
                this.animation.pos.x = before;
                this.speed *= -1;
            }
             */
        }
        //window.requestAnimationFrame(this.updateMovement);
    }
}