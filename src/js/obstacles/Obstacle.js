import ObstacleAnimate from '../animate/elements/ObstacleAnimate.js';

export default class Obstacle {
    constructor(coordinates) {
        this.animation = new ObstacleAnimate();
        this.animation.pos = coordinates;
        this.speed = 5;
    }
}