import WallAnimate from '../animate/element/WallAnimate.js';
import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";
import {ActionType} from "../action/Action.js";
import DefaultObstacle from "./DefaultObstacle.js";

export default class WallObstacle extends DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     */
    constructor(x, y, vx, vy, action) {
        super(x, y, vx, vy, action, 63);
        this.animation = new WallAnimate(this);
    }

    move(delta) {
        super.move(delta);
    }
}