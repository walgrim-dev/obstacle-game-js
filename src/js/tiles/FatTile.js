import Coordinates from "./coordinates/Coordinates.js";

/**
 * I called this a FatTile because it's a tile containing all the tiles for a texture
 */
export default class FatTile {
    /**
     * Constructor
     * @param {float} vx Velocity in game on x axis
     * @param {float} vy Velocity in game on y axis
     * @param state
     */
    constructor(vx, vy, state) {
        // This will contain all the tiles
        this.tilesInfos = [];
        this.vx = vx;
        this.vy = vy;
        this.state = state;
    }

    /**
     * Add a tile to the fat tile
     * @param {TileInfo} tileInfo
     */
    addTile(tileInfo) {
        this.tilesInfos.push(tileInfo);
    }

    /**
     * In theory will be unused
     * @param {TileInfo} tileInfo
     */
    removeTile(tileInfo) {
        const index = this.tilesInfos.indexOf(tileInfo);
        if (index > -1) {
            this.tilesInfos.splice(index, 1);
        }
    }
}