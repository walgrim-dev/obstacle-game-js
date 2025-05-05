import AnimationSequence from "../sequence/AnimationSequence.js";
import TileInfo from "../../tile/TileInfo.js";
import FatTile from "../../tile/FatTile.js";
import {ActionType} from "../../action/Action.js";
import {ScaleFactor} from "../../scale/ScaleFactor.js";

export default class ExitTexture {
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
            //this.textures.set(ActionType.MOVE, new AnimationSequence(this.movingEnnemies()));
            //this.textures.set(ActionType.EXIT, new AnimationSequence(this.exit()));
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
        return new FatTile([
            new TileInfo(49, 153, 14, 16),
            new TileInfo(65, 153, 14, 16),
            new TileInfo(81, 153, 14, 16),
            new TileInfo(113, 153, 14, 16),
            new TileInfo(129, 153, 14, 16)
        ]);
    }
}