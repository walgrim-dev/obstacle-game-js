import {ActionType} from "../action/Action.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import DefaultObstacle from "./DefaultObstacle.js";
import ShellAnimate from "../animate/element/ShellAnimate.js";

export default class ShellObstacle extends DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     */

    constructor(x, y, vx, vy, action) {
        super(x, y, vx, vy, action, ScaleFactor.SHELL_SIZE);
        this.animation = new ShellAnimate(this);
    }

    move(delta) {
        super.move(delta);
    }
}