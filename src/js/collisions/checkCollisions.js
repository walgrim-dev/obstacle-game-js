/**
 * Checks the horizontal and vertical projection overlap
 * true if intersect
 * @param x1
 * @param y1
 * @param w1
 * @param h1
 * @param x2
 * @param y2
 * @param w2
 * @param h2
 * @returns {boolean}
 */

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true;    // If previous tests failed, then both axis projections
}

/**
 * Return the obstacle overlaping
 * @param x1
 * @param y1
 * @param w1
 * @param h1
 * @param obstacleList
 * @returns {Obstacle|null}
 */
function objectColliding(x1, y1, w1, h1, obstacleList) {
    for (let obstacle of obstacleList) {
        const x2 = obstacle.animation.tileInfo.coordinates.x;
        const y2 = obstacle.animation.tileInfo.coordinates.y;
        const w2 = obstacle.animation.tileInfo.size.w;
        const h2 = obstacle.animation.tileInfo.size.h;
        if (rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2)) {
            return obstacle;
        }
    }
    return null;
}


export { rectsOverlap, objectColliding };