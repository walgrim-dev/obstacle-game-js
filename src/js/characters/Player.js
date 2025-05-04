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

    listenToKeys = () => {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = true;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = true;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = true;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = true;

            //if (this.moves.up || this.moves.down || this.moves.left || this.moves.right) {
            if (this.moves.right || this.moves.up && this.moves.right || this.moves.down && this.moves.right) {
                this.action = ActionType.MOVE_RIGHT;
            }
            else if (this.moves.left || this.moves.up && this.moves.left || this.moves.down && this.moves.left) {
                this.action = ActionType.MOVE_LEFT;
            }
            else {
                this.action = ActionType.MOVE_RIGHT;
            }

        });

        addEventListener('keyup', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = false;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = false;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = false;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = false;

            if (!this.moves.up && !this.moves.down && !this.moves.left && !this.moves.right) {
                this.action = ActionType.IDLE;
            }
        });
    }

    move = (delta) => {
        if (this.action === ActionType.MOVE_LEFT
            || this.action === ActionType.MOVE_RIGHT
            || this.action === ActionType.MOVE_UP
            || this.action === ActionType.MOVE_DOWN) {
            // Tileinfo
            if (this.moves.up) this.coordinates.y -= calculateDistanceToMove(delta, this.coordinates.vx);
            if (this.moves.down) this.coordinates.y += calculateDistanceToMove(delta, this.coordinates.vy);
            if (this.moves.left) this.coordinates.x -= calculateDistanceToMove(delta, this.coordinates.vx);
            if (this.moves.right) this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);

            const collidingObstacle = objectColliding(
                this.coordinates.x,
                this.coordinates.y,
                this.size,
                this.size,
                GameEngine.getInstance().level.getObstacles());

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
                } else {
                    if (this.moves.right) {
                        this.coordinates.x -= calculateDistanceToMove(delta, this.coordinates.vx);
                    }
                    if (this.moves.left) {
                        this.coordinates.x += calculateDistanceToMove(delta, this.coordinates.vx);
                    }
                    if (this.moves.up) {
                        this.coordinates.y += calculateDistanceToMove(delta, this.coordinates.vy);
                    }
                    if (this.moves.down) {
                        this.coordinates.y -= calculateDistanceToMove(delta, this.coordinates.vy);
                    }
                }
            }
        } else {
            if (GameEngine.getInstance()) {
                const collidingObstacle = objectColliding(
                    this.coordinates.x,
                    this.coordinates.y,
                    this.size,
                    this.size,
                    GameEngine.getInstance().level.getObstacles());
                if (collidingObstacle) {
                    if (collidingObstacle.action === ActionType.MOVE) {
                        this.coordinates.x = GameEngine.getInstance().level.basicPlayerPos.x;
                        this.coordinates.y = GameEngine.getInstance().level.basicPlayerPos.y;
                    }
                }
            }
        }
    }
}