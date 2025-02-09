import AnimationSequence from "../AnimationSequence.js";

export default class ObstacleTextureLoader {
    constructor(path, callFunc) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.cutSize = 16;
        this.load(callFunc);
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            this.textures.set("idle", new AnimationSequence(this.idle()));
            // lil trick
            this.textures.set("movingObstacle", new AnimationSequence(this.movingEnnemies()));
            this.textures.set("exitObstacle", new AnimationSequence(this.exit()));
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

    movingEnnemies = () => {
        return [
            [80, 0],
            [96, 0]
        ]
    }

    exit = () => {
        return [
            [64, 72],
            [80, 72],
            [96, 72],
            [112, 72]
        ]
    }
}