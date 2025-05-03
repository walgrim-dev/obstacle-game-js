import AnimationSequence from "../AnimationSequence.js";
import GameManager from "../../game/GameEngine.js";

export default class PlayerTextureLoader {
    constructor(path) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            this.textures.set("idle", new AnimationSequence(this.idle()));
            this.textures.set("move", new AnimationSequence(this.move()));
            // Callback to say that everything is loaded now
            setTimeout(cb);
        }
        this.spriteSheet.src = this.path;
    }

    getSequence = (action) => {
        return this.textures.get(action);
    }

    // x, y, cutsizeW, cutsizeH
    idle = () => {
        return [
            [129, 0, 14, 20],
        ]
    }

    /**
     * @returns {*[][]}
     */
    move = () => {
        return [
            [64, 0, 60, 64],
            [128, 32, 52, 60],
            [48, 88, 16, 16],
            [0, 124, 44, 64]
        ]
    }
}