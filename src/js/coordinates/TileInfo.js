export default class TileInfo {
    constructor(x, y, vx, vy, w, h, cutSize, state) {
        this.coordinates = {
            x: x,
            y: y,
            vx: vx,
            vy: vy,
        }

        this.size = {
            w: w,
            h: h,
            cutSize: cutSize
        }

        this.state = state;
    }
}