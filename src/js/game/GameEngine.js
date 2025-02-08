import loadTextures from "../animate/loadedTextures.js";

const TEXTURES = loadTextures();

export default class GameEngine {
    constructor(canvas) {
        this.canvas = document.querySelector(canvas);
        this.ctx = this.canvas.getContext('2d');
        console.log(TEXTURES);
    }

    prepare() {

    }

    start() {

    }
}