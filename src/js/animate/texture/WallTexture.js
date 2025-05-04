import AnimationSequence from "../sequence/AnimationSequence.js";
import TileInfo from "../../tile/TileInfo.js";
import FatTile from "../../tile/FatTile.js";
import {ActionType} from "../../action/Action.js";

export default class WallTexture {
    constructor(path, callFunc) {
        this.path = path;
        this.spriteSheet = new Image();
        this.textures = new Map();
        this.load(callFunc);
    }

    load(cb) {
        this.spriteSheet.onload = () => {
            // Load sequences for each movements of the element
            this.textures.set(ActionType.IDLE, new AnimationSequence(this.idleTexture()));
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
    idleTexture = () => {
        return new FatTile([new TileInfo(0, 0, 64, 64)]);
    }
}