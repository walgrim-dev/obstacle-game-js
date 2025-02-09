import PlayerTextureLoader from "../animate/textures/PlayerTextureLoader.js";
import Animate from "../animate/Animate.js";
import Player from "../characters/Player.js";
import FirstLevel from "../levels/FirstLevel.js";

export default class GameEngine {
    constructor(canvas) {
        this.canvas = document.querySelector(canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.animate = new Animate(this, this.canvas, this.ctx);
        this.level = new FirstLevel(this.canvas, this.ctx);
    }

    launch() {
        // Player initialize itself + the textures behind + bindings
        this.player = new Player();
        this.player.movement();
        this.play();
    }

    play = () => {
        this.animate.animate();
        requestAnimationFrame(this.play);
    }
}