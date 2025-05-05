import {ActionType} from "../action/Action.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import DefaultObstacle from "./DefaultObstacle.js";
import ExitAnimate from "../animate/element/ExitAnimate.js";

export default class ExitObstacle extends DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     */

    constructor(x, y, vx, vy, action) {
        super(x, y, vx, vy, action, ScaleFactor.EXIT_SIZE);
        this.animation = new ExitAnimate(this);
    }

    move(delta) {
        //super.move(delta);
    }
}