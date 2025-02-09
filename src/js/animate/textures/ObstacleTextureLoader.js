import AnimationSequence from "../AnimationSequence.js";

export default class ObstacleTextureLoader {
    constructor(path) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.cutSize = 8;
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            this.textures.set("idle", new AnimationSequence(this.idle()));
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
    idle = () => {
        return [
            [128, 192]
        ]
    }
}