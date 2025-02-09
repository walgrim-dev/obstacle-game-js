function checkCollisions(obstacleList, collider) {
    for (let obstacle of obstacleList) {
        if (
            collider.x < obstacle.animation.pos.x + obstacle.animation.pos.w &&
            collider.x + collider.w > obstacle.animation.pos.x &&
            collider.y < obstacle.animation.pos.y + obstacle.animation.pos.h &&
            collider.y + collider.h > obstacle.animation.pos.y
        ) {
            return true;
        }
    }
    return false;
}

function objectColliding(obstacleList, collider) {
    for (let obstacle of obstacleList) {
        if (
            collider.x < obstacle.animation.pos.x + obstacle.animation.pos.w &&
            collider.x + collider.w > obstacle.animation.pos.x &&
            collider.y < obstacle.animation.pos.y + obstacle.animation.pos.h &&
            collider.y + collider.h > obstacle.animation.pos.y
        ) {
            return obstacle;
        }
    }
    return null;
}

export { checkCollisions, objectColliding };