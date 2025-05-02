import PlayerAnimate from '../animate/elements/PlayerAnimate.js';
import {rectsOverlap, objectColliding} from "../collisions/checkCollisions.js";
import GameEngine from "../game/GameEngine.js";
import Animate from "../animate/Animate.js";
import ObstacleAnimate from "../animate/elements/ObstacleAnimate.js";
import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";

export default class Player {
    constructor(tileInfo) {
        this.animation = new PlayerAnimate(this, tileInfo);
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.isMoving = false;
        this.listenToKeys();
        this.loaded = true
    }

    listenToKeys = () => {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = true;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = true;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = true;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = true;

            if (this.moves.up || this.moves.down || this.moves.left || this.moves.right) {
                this.animation.tileInfo.state = "move";
                this.isMoving = true;
            }
        });

        addEventListener('keyup', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = false;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = false;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = false;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = false;

            if (!this.moves.up && !this.moves.down && !this.moves.left && !this.moves.right) {
                this.animation.tileInfo.state = "idle";
                this.isMoving = false;
            }
        });
    }

    move = (delta) => {
        const tileInfo = this.animation.tileInfo;
        if (this.isMoving) {
            // Tileinfo
            if (this.moves.up) tileInfo.coordinates.y -= calculateDistanceToMove(delta, tileInfo.coordinates.vx);
            if (this.moves.down) tileInfo.coordinates.y += calculateDistanceToMove(delta, tileInfo.coordinates.vy);
            if (this.moves.left) tileInfo.coordinates.x -= calculateDistanceToMove(delta, tileInfo.coordinates.vx);
            if (this.moves.right) tileInfo.coordinates.x += calculateDistanceToMove(delta, tileInfo.coordinates.vx);

            const collidingObstacle = objectColliding(tileInfo.coordinates.x,
                tileInfo.coordinates.y,
                tileInfo.size.w,
                tileInfo.size.h,
                GameEngine.getInstance().level.getObstacles());

            if (collidingObstacle) {
                if (collidingObstacle.animation.tileInfo.state === "exitObstacle") {
                    // Hotfix
                    Animate.objToAnimate = Animate.objToAnimate.filter(o => o instanceof PlayerAnimate);
                    GameEngine.getInstance().updateLevel(GameEngine.getInstance().level.nextLevel());
                    tileInfo.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                    tileInfo.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;

                }
                else if (collidingObstacle.animation.tileInfo.state === "movingObstacle") {
                    tileInfo.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                    tileInfo.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;
                } else {
                    if (this.moves.right) {
                        tileInfo.coordinates.x -= calculateDistanceToMove(delta, tileInfo.coordinates.vx);
                    }
                    if (this.moves.left) {
                        tileInfo.coordinates.x += calculateDistanceToMove(delta, tileInfo.coordinates.vx);
                    }
                    if (this.moves.up) {
                        tileInfo.coordinates.y += calculateDistanceToMove(delta, tileInfo.coordinates.vy);
                    }
                    if (this.moves.down) {
                        tileInfo.coordinates.y -= calculateDistanceToMove(delta, tileInfo.coordinates.vy);
                    }
                }
            }
        } else {
            if (GameEngine.getInstance()) {
                const collidingObstacle = objectColliding(tileInfo.coordinates.x,
                    tileInfo.coordinates.y,
                    tileInfo.size.w,
                    tileInfo.size.h,
                    GameEngine.getInstance().level.getObstacles());
                if (collidingObstacle) {
                    if (collidingObstacle.animation.tileInfo.state === "movingObstacle") {
                        tileInfo.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                        tileInfo.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;
                    }
                }
            }
        }
    }
}