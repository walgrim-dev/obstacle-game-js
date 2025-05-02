import Coordinates from "./Coordinates.js";

export default class TileInfo {
    constructor(x, y, vx, vy, w, h, cutSize, state) {
        this.coordinates = new Coordinates(x, y, vx, vy);

        this.size = {
            w: w,
            h: h,
            cutSize: cutSize
        }

        this.state = state;
    }
}