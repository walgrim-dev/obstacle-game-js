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
            this.textures.set(ActionType.IDLE, new AnimationSequence(this.idleTexture()));
            this.textures.set(ActionType.MOVE_RIGHT, new AnimationSequence(this.moveRightTexture()));
            this.textures.set(ActionType.MOVE_LEFT, new AnimationSequence(this.moveLeftTexture()));
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
            new TileInfo(129, 0, 20, 20)
        ]);
    }

    /**
     * @returns {FatTile}
     */
    moveRightTexture = () => {
        return new FatTile([
            new TileInfo(328, 0, 19, 20),
            new TileInfo(208, 0, 19, 20),
        ]);
    }

    /**
     * @returns {FatTile}
     */
    moveLeftTexture = () => {
        return new FatTile([
            new TileInfo(169, 0, 19, 20),
            new TileInfo(49, 0, 19, 20),
        ]);
    }
}