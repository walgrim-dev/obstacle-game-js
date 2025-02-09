import AnimationSequence from "../AnimationSequence.js";

export default class ObstacleTextureLoader {
    constructor(path) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.size = 16;
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            this.textures.set("move", new AnimationSequence(this.move()));
            // Callback to say that everything is loaded now
            setTimeout(cb);
        }
        this.spriteSheet.src = this.path;
    }

    getSequence = (action) => {
        return this.textures.get(action);
    }

    /**
     * @returns {*[][]}
     */
    move = () => {
        return [
            [80, 0],
            [96, 0]
        ]
    }
}