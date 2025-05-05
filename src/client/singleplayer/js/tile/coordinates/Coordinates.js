export default class Coordinates {
    constructor(x, y, vx, vy) {
        this._x = x;
        this._y = y;
        this._vx = vx;
        this._vy = vy;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    get vx() {
        return this._vx;
    }
    get vy() {
        return this._vy;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    set vx(value) {
        this._vx = value;
    }

    set vy(value) {
        this._vy = value;
    }
}