import AnimationSequence from "../AnimationSequence.js";

export default class ObstacleTextureLoader {
    constructor(path, callFunc) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.load(callFunc);
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            // lil trick
            this.textures.set("idle", new AnimationSequence(this.idle()));
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
            [128, 192, 16, 16]
        ]
    }

    movingEnnemies = () => {
        return [
            [80, 0, 16, 16],
            [96, 0, 16, 16]
        ]
    }

    exit = () => {
        return [
            [64, 72, 16, 16],
            [80, 72, 16, 16],
            [96, 72, 16, 16],
            [112, 72, 16, 16]
        ]
    }
}