import Animate from "../Animate.js";
import ObstacleTextureLoader from "../textures/ObstacleTextureLoader.js";
import {objectColliding} from "../../collisions/checkCollisions.js";
import GameEngine from "../../game/GameEngine.js";

export default class ObstacleAnimate {
    constructor(obstacle, tileInfo) {
        // Pas bon je le changerai plus tard
        this.obstacle = obstacle;
        this.textures = new ObstacleTextureLoader('img/sprites.png');
        this.textures.load(this.updateState);
        this.tileInfo = tileInfo;
        this.state = false;
        this.delta = 0;
        Animate.objToAnimate.push(this);
    }

    updateState = () => {
        this.state = true;
    }

    animate = (ctx) => {
        // Move obstacle (if movingObstacle)
        this.obstacle.move();
        // Detect collisions
        const gameEngine = GameEngine.getInstance();
        if (gameEngine == null) return;

        const obstacles = gameEngine.level.getObstacles().filter(o => o !== this.obstacle);
        const x1 = this.tileInfo.coordinates.x;
        const y1 = this.tileInfo.coordinates.y;
        const w1 = this.tileInfo.size.w;
        const h1 = this.tileInfo.size.h;


        let collidingObstacle = objectColliding(x1, y1, w1, h1, obstacles);
        if (collidingObstacle) {
            this.tileInfo.coordinates.vx *= -1;
        }

        ctx.save();
        let sequence = this.textures.getSequence(this.tileInfo.state);
        let x = sequence.getX();
        let y = sequence.getY();
        ctx.drawImage(this.textures.spriteSheet,
            x,
            y,
            this.tileInfo.size.cutSize,
            this.tileInfo.size.cutSize,
            this.tileInfo.coordinates.x,
            this.tileInfo.coordinates.y,
            this.tileInfo.size.w,
            this.tileInfo.size.h);
        ctx.restore();
        if (this.delta === 30) {
            sequence.nextFrame();
            this.delta = 0;
        }
        this.delta++;
    }
}