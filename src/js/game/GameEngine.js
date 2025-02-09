import Animate from "../animate/Animate.js";
import Player from "../characters/Player.js";
import FirstLevel from "../levels/FirstLevel.js";

const audio = new Audio('music/flower_garden.ogg');

export default class GameEngine {
    constructor(canvas) {
        this.canvas = document.querySelector(canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.animate = new Animate(this, this.canvas, this.ctx);
        this.level = new FirstLevel(this.canvas, this.ctx);
        this.player = new Player();
    }

    launch() {
        this.play();
    }

    play = () => {
        this.animate.animate();
        requestAnimationFrame(this.play);
    }

    nextLevel = () => {

    }
}