import PlayerAnimate from '../animate/elements/PlayerAnimate.js';
import {checkCollisions, objectColliding} from "../collisions/checkCollisions.js";
import GameEngine from "../game/GameEngine.js";
import Animate from "../animate/Animate.js";
import ObstacleAnimate from "../animate/elements/ObstacleAnimate.js";

export default class Player {
    constructor() {
        this.animation = new PlayerAnimate();
        this.speed = 5;
        this.level = 1;
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.isMoving = false;
        this.listenToKeys();
        this.updateMovement();
    }

    listenToKeys = () => {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = true;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = true;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = true;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = true;

            if (this.moves.up || this.moves.down || this.moves.left || this.moves.right) {
                this.animation.action = "move";
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
                this.animation.action = "idle";
                this.isMoving = false;
            }
        });
    }

    updateMovement = () => {
        if (this.isMoving) {
            // Calcul du déplacement prévu
            let dx = 0, dy = 0;
            if (this.moves.up) dy -= this.speed;
            if (this.moves.down) dy += this.speed;
            if (this.moves.left) dx -= this.speed;
            if (this.moves.right) dx += this.speed;

            // Création d'un nouvel objet de position pour le collider
            const newPos = {
                x: this.animation.pos.x + dx,
                y: this.animation.pos.y + dy,
                w: this.animation.pos.w,
                h: this.animation.pos.h
            };

            if (!checkCollisions(GameEngine.getInstance().level.getObstacles(), newPos)) {
                this.animation.updatePos(dx, dy);
            }

            let obstacle = objectColliding(GameEngine.getInstance().level.getObstacles(), newPos);
            if (obstacle) {
                if (obstacle.animation.action === "exitObstacle") {
                    // Hotfix
                    Animate.objToAnimate = Animate.objToAnimate.filter(o => o instanceof PlayerAnimate);
                    GameEngine.getInstance().updateLevel(GameEngine.getInstance().level.nextLevel());
                    this.animation.pos = GameEngine.getInstance().level.getPlayerPos();
                }
                if (obstacle.animation.action === "movingObstacle") {
                    console.log(GameEngine.getInstance().level.basicPlayerPos);
                    this.animation.test(GameEngine.getInstance().level.basicPlayerPos.x, GameEngine.getInstance().level.basicPlayerPos.y);
                }
            }
        } else {
            if (GameEngine.getInstance()) {
                let obstacle = objectColliding(GameEngine.getInstance().level.getObstacles(), this.animation.actualPos());
                if (obstacle) {
                    if (obstacle.animation.action === "movingObstacle") {
                        console.log(GameEngine.getInstance().level.basicPlayerPos);
                        this.animation.test(GameEngine.getInstance().level.basicPlayerPos.x, GameEngine.getInstance().level.basicPlayerPos.y);
                    }
                }
            }
        }
        requestAnimationFrame(this.updateMovement);
    }
}