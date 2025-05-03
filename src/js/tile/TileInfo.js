import Coordinates from "./coordinates/Coordinates.js";

export default class TileInfo {
    constructor(x, y, cutSizeW, cutSizeH) {
        // Coordinates of where the tile starts
        this.coordinates = new Coordinates(x, y, 0.0, 0.0);
        // Infos about the tile
        this.infos = {
            /**
             * Only need those two values because size will be same for both size in game
             */
            cutSizeW: cutSizeW,
            cutSizeH: cutSizeH,
        }
    }
}