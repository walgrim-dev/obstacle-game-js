import ObstacleAnimate from '../animate/elements/ObstacleAnimate.js';

export default class Obstacle {
    constructor() {
        this.animation = new ObstacleAnimate();
        this.speed = 10;
    }
}