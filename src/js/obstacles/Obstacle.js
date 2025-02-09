import ObstacleAnimate from '../animate/elements/ObstacleAnimate.js';
import {objectColliding} from "../collisions/checkCollisions.js";
import GameEngine from "../game/GameEngine.js";

export default class Obstacle {
    constructor(coordinates) {
        this.animation = new ObstacleAnimate();
        this.animation.pos = coordinates;
        this.speed = 5;
        this.updateMovement();
    }

    updateMovement = () => {
        if (this.animation.action === "movingObstacle") {
            const before = this.animation.pos.x;

            this.animation.pos.x += this.speed;

            const gameEngine = GameEngine.getInstance();
            const obstacles = gameEngine.level.getObstacles().filter(o => o !== this);

            const obj = objectColliding(obstacles, this.animation.pos);

            if (obj) {
                this.animation.pos.x = before;
                this.speed *= -1;
            }
        }
        window.requestAnimationFrame(this.updateMovement);
    }
}