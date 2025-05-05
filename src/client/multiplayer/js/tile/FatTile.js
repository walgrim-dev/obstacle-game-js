import Coordinates from "./coordinates/Coordinates.js";

/**
 * I called this a FatTile because it's a tile containing all the tile for a texture
 */
export default class FatTile {
    /**
     * Constructor
     * @param {TileInfo[]} tiles
     */
    constructor(tiles) {
        // This will contain all the tile -> for animation
        this.tilesInfos = tiles;
    }

    /**
     * Add a tile to the fat tile
     * @param {TileInfo} tileInfo
     */
    addTile(tileInfo) {
        this.tilesInfos.push(tileInfo);
    }

    /**
     *
     * @param {int} index
     * @returns {TileInfo} Tile returned
     */
    getTile(index) {
        return this.tilesInfos[index];
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

    /**
     * Get the number of tile in the fat tile
     * @returns {int} Number of tile
     */
    getNumberOfTiles() {
        return this.tilesInfos.length;
    }
}