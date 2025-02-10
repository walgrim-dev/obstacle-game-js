import Animate from "../animate/Animate.js";
import Player from "../characters/Player.js";
import FirstLevel from "../levels/FirstLevel.js";

const audio = new Audio('music/flower_garden.ogg');

export default class GameEngine {
    static instance = null;
    constructor(canvas) {
        if (GameEngine.instance) {
            return GameEngine.instance;
        }
        this.canvas = document.querySelector(canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.animate = new Animate(this, this.canvas, this.ctx);
        this.level = new FirstLevel(this.canvas, this.ctx);
        this.player = new Player();
        GameEngine.instance = this;
    }

    static getInstance() {
        if (!GameEngine.instance) {
            throw new Error('GameEngine is not initialized');
        }
        return GameEngine.instance;
    }

    launch() {
        const audio = new Audio('music/flower_garden.ogg');
        audio.volume = 0.1;
        document.addEventListener("click", () => {
            audio.play().then().catch((e) => console.log(e))
        })
        this.play();
    }

    play = () => {
        this.animate.animate();
        window.requestAnimationFrame(this.play);
    }

    updateLevel = (level) => {
        this.level = level;
    }
}