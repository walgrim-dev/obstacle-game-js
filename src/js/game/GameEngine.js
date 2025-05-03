import Animate from "../animate/Animate.js";
import Player from "../characters/Player.js";
import FirstLevel from "../levels/FirstLevel.js";
import TileInfo from "../tile/FatTile.js";
import OrthogonalCamera from "../camera/OrthogonalCamera.js";
import {ActionType} from "../action/Action.js";

export default class GameEngine {
    static instance = null;

    /**
     * Class constructor
     * @param canvasName
     * @returns {GameEngine}
     */
    constructor(canvasName) {
        if (GameEngine.instance) {
            return GameEngine.instance;
        }

        // Get canvas
        this.canvas = document.querySelector(canvasName);
        this.ctx = this.canvas.getContext('2d');
        // Resize canvas
        this.resize();

        // Game Structure
        this.animate = new Animate(this, this.canvas, this.ctx);
        this.level = new FirstLevel(this.canvas, this.ctx);
        this.player = new Player(
            this.level.getPlayerStartingPos().x,
            this.level.getPlayerStartingPos().y,
            350,
            350,
            ActionType.IDLE);
        this.camera = new OrthogonalCamera()
        GameEngine.instance = this;
    }

    /**
     * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth width of source image
     * @param {Number} srcHeight height of source image
     * @param {Number} maxWidth maximum available width
     * @param {Number} maxHeight maximum available height
     * @return {Object} { width, height }
     */
    static calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {width: srcWidth * ratio, height: srcHeight * ratio};
    }

    /**
     * Singleton returning GameEngine instance
     * @returns {GameEngine|null}
     */
    static getInstance() {
        if (!GameEngine.instance) {
            return null;
        }
        return GameEngine.instance;
    }

    /**
     * Resize canvas to fit the window size
     */
    resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.onresize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    /**
     * Launch the game, load assets and start the game loop
     */
    launch() {
        const audio = new Audio('music/flower_garden.ogg');
        audio.volume = 0.1;
        document.addEventListener("click", () => {
            audio.play().then().catch((e) => console.log(e))
        })
        this.play();
    }

    // GameLoop
    play = (time) => {
        // Update orthognal camera
        this.camera.updateX(this.player.coordinates.x - this.canvas.width / 2);
        this.camera.updateY(this.player.coordinates.y - this.canvas.height / 2);
        this.animate.animate(time, this.camera.coordinates.x, this.camera.coordinates.y);
        window.requestAnimationFrame(this.play);
    }

    // Update current level to next one
    updateLevel = (level) => {
        this.level = level;
    }
}