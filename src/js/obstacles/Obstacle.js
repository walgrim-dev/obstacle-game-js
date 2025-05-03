import ObstacleAnimate from '../animate/element/ObstacleAnimate.js';
import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";
import FatTile from "../tile/FatTile.js";
import Coordinates from "../tile/coordinates/Coordinates.js";
import {ActionType} from "../action/Action.js";

export default class Obstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     */
    constructor(x, y, vx, vy, action) {
        this.coordinates = new Coordinates(x, y, vx, vy);
        this.animation = new ObstacleAnimate(this);
        this.action = action;
    }

    move = (delta) => {
        if (this.action === ActionType.MOVE) {
            this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);
        }
    }
}