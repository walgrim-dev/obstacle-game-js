import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";

export default class DefaultObstacle {
    move = (delta) => {
        const tileInfo = this.animation.tileInfo;
        if (tileInfo.state === "movingObstacle") {
            tileInfo.coordinates.x += calculateDistanceToMove(delta, tileInfo.coordinates.vx);
        }
    }
}