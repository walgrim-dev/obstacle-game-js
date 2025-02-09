import AnimationSequence from "../AnimationSequence.js";

export default class PlayerTextureLoader {
    constructor(path) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.size = 16;
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

    idle = () => {
        return [
            [0, 88]
        ]
    }

    /**
     * @returns {*[][]}
     */
    move = () => {
        return [
            [16, 88],
            [32, 88],
            [64, 88]
        ]
    }
}