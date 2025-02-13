import ObstacleAnimate from '../animate/elements/ObstacleAnimate.js';
import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";

export default class Obstacle {
    constructor(tileInfo) {
        this.animation = new ObstacleAnimate(this, tileInfo);
    }

    move = (delta) => {
        const tileInfo = this.animation.tileInfo;
        if (tileInfo.state === "movingObstacle") {
            tileInfo.coordinates.x += calculateDistanceToMove(delta, tileInfo.coordinates.vx);
        }
    }
}