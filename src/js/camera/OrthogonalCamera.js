import Coordinates from "../tile/coordinates/Coordinates.js";

export default class OrthogonalCamera {
    constructor() {
        this.coordinates = new Coordinates(0.0, 0.0, 0.0, 0.0)
    }

    updateX = (value) => {
        this.coordinates.x = value;
    }

    updateY = (value) => {
        this.coordinates.y = value;
    }
}