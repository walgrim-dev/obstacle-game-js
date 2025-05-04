import PlayerAnimate from '../animate/element/PlayerAnimate.js';
import {rectsOverlap, objectColliding} from "../collisions/checkCollisions.js";
import GameEngine from "../game/GameEngine.js";
import Animate from "../animate/Animate.js";
import WallAnimate from "../animate/element/WallAnimate.js";
import calculateDistanceToMove from "../animate/calculateDistanceToMove.js";
import Coordinates from "../tile/coordinates/Coordinates.js";
import {ActionType} from "../action/Action.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";

export default class Player {
    /**
     * @param {float} x X coordinate of the player
     * @param {float} y Y coordinate of the player
     * @param {float} vx X velocity of the player
     * @param {float} vy Y velocity of the player
     * @param {ActionType} action Action of the player
     */
    constructor(x, y, vx, vy, action) {
        this.coordinates = new Coordinates(x, y, vx, vy);
        this.animation = new PlayerAnimate(this);
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.action = action;
        this.size = ScaleFactor.PLAYER_SIZE;
        this.listenToKeys();
        //this.loaded = true
    }

    listenToKeys() {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') {
                this.moves.up = true;
                this.action = ActionType.MOVE_RIGHT;
            }
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') {
                this.moves.left = true;
                this.action = ActionType.MOVE_LEFT;
            }
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') {
                this.moves.down = true;
                this.action = ActionType.MOVE_RIGHT;
            }
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') {
                this.moves.right = true;
                this.action = ActionType.MOVE_RIGHT;
            }
        });

        addEventListener('keyup', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = false;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = false;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = false;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = false;

            // Détermine l'action en fonction des touches encore pressées
            if (this.moves.right) this.action = ActionType.MOVE_RIGHT;
            else if (this.moves.left) this.action = ActionType.MOVE_LEFT;
            else if (this.moves.up || this.moves.down) this.action = ActionType.MOVE_RIGHT;
            else this.action = ActionType.IDLE;
        });
    }

    /**
     * @returns {boolean}
     */
    isMoving() {
        return (this.moves.up || this.moves.down || this.moves.left || this.moves.right);
    }

    /**
     * @returns {DefaultObstacle|null} obstacle
     */
    isColliding() {
        return objectColliding(
            this.coordinates.x,
            this.coordinates.y,
            this.size,
            this.size,
            GameEngine.getInstance().level.getObstacles());
    }

    move(delta) {
        if (this.isMoving()) {
            // Tileinfo
            const collidingObstacle = this.isColliding();
            if (collidingObstacle) {
                if (collidingObstacle.action === ActionType.EXIT) {
                    // Hotfix
                    Animate.objToAnimate = Animate.objToAnimate.filter(o => o instanceof PlayerAnimate);
                    GameEngine.getInstance().updateLevel(GameEngine.getInstance().level.nextLevel());
                    this.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                    this.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;

                }
                else if (collidingObstacle.action === ActionType.MOVE) {
                    this.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                    this.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;
                }
            }

            if (this.moves.up) {
                this.coordinates.y -= calculateDistanceToMove(delta, this.coordinates.vx);
                if (this.isColliding()) {
                    this.coordinates.y += calculateDistanceToMove(delta, this.coordinates.vy);
                }
            }
            if (this.moves.down) {
                this.coordinates.y += calculateDistanceToMove(delta, this.coordinates.vy);
                if (this.isColliding()) {
                    this.coordinates.y -= calculateDistanceToMove(delta, this.coordinates.vy);
                }
            }
            if (this.moves.left) {
                this.coordinates.x -= calculateDistanceToMove(delta, this.coordinates.vx);
                if (this.isColliding()) {
                    this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);
                }
            }
            if (this.moves.right) {
                this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);
                if (this.isColliding()) {
                    this.coordinates.x -= calculateDistanceToMove(delta, this.coordinates.vx);
                }
            }
        }
        else {
            if (!GameEngine.getInstance()) return;
            const collidingObstacle = this.isColliding();
            if (collidingObstacle) {
                if (collidingObstacle.action === ActionType.MOVE) {
                    this.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                    this.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;
                }
            }
        }
    }
}