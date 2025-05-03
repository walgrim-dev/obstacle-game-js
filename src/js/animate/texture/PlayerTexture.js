import AnimationSequence from "../sequence/AnimationSequence.js";
import TileInfo from "../../tile/TileInfo.js";
import FatTile from "../../tile/FatTile.js";
import {ActionType} from "../../action/Action.js";

export default class PlayerTexture {
    constructor(path, callFunc) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.load(callFunc);
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            this.textures.set(ActionType.IDLE, new AnimationSequence(this.idle()));
            this.textures.set(ActionType.MOVE, new AnimationSequence(this.move()));
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
        return new FatTile([
            new TileInfo(129, 0, 14, 20)
        ]);
    }


    /**
     * @returns {FatTile}
     */
    move = () => {
        return new FatTile([
            new TileInfo(64, 0, 60, 64),
            new TileInfo(128, 32, 52, 60),
            new TileInfo(48, 88, 16, 16),
            new TileInfo(0, 124, 44, 64)
        ]);
    }
}