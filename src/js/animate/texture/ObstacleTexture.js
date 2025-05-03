import AnimationSequence from "../sequence/AnimationSequence.js";
import TileInfo from "../../tile/TileInfo.js";
import FatTile from "../../tile/FatTile.js";
import {ActionType} from "../../action/Action.js";

export default class ObstacleTexture {
    constructor(path, callFunc) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.load(callFunc);
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            // Load sequences for each movements of the element
            this.textures.set(ActionType.IDLE, new AnimationSequence(this.idle()));
            this.textures.set(ActionType.MOVE, new AnimationSequence(this.movingEnnemies()));
            this.textures.set(ActionType.EXIT, new AnimationSequence(this.exit()));
            // Callback to say that everything is loaded now
            setTimeout(cb);
        }
        this.spriteSheet.src = this.path;
    }

    /**
     *
     * @param {ActionType} action
     * @returns {AnimationSequence} sequence
     */
    getSequence = (action) => {
        return this.textures.get(action);
    }

    /**
     * @returns {FatTile}
     */
    idle = () => {
        return new FatTile([new TileInfo(128, 192, 16, 16)]);
    }

    /**
     * @returns {FatTile}
     */
    movingEnnemies = () => {
        return new FatTile([
            new TileInfo(80, 0, 16, 16),
            new TileInfo(96, 0, 16, 16)
        ]);
    }

    /**
     * @returns {FatTile}
     */
    exit = () => {
        return new FatTile([
            new TileInfo(64, 72, 16, 16),
            new TileInfo(80, 72, 16, 16),
            new TileInfo(96, 72, 16, 16),
            new TileInfo(112, 72, 16, 16)
        ]);
    }
}