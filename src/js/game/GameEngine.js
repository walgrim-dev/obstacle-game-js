import PlayerTextureLoader from "../animate/textures/PlayerTextureLoader.js";
import Animate from "../animate/Animate.js";
import Player from "../characters/Player.js";

export default class GameEngine {
    constructor(canvas) {
        this.canvas = document.querySelector(canvas);
        this.ctx = this.canvas.getContext('2d');
        this.animate = new Animate(this.canvas, this.ctx);
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