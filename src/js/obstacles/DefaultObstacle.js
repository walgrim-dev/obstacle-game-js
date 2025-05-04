import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";
import Coordinates from "../tile/coordinates/Coordinates.js";
import {ActionType} from "../action/Action.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";

export default class DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     * @param {float} size Size of the obstacle
     */

    constructor(x, y, vx, vy, action, size) {
        this.coordinates = new Coordinates(x * ScaleFactor.TILE_SIZE, y * ScaleFactor.TILE_SIZE, vx, vy);
        this.action = action;
        this.size = size;
    }

    move = (delta) => {
        if (this.action === ActionType.MOVE) {
            this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);
        }
    }
}