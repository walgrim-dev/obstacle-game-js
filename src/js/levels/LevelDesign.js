import Obstacle from "../obstacles/Obstacle.js";

export default class LevelDesign {
    constructor(mapOfElements, canvas, ctx) {
        this.mapOfElements = mapOfElements;
        this.canvas = canvas;
        this.ctx = ctx;
        this.obstacles = [];
        this.tilesWidth = Math.round(this.canvas.width / 20);
        this.tilesHeight = Math.round(this.canvas.height / 20);
        this.basicPlayerPos = null;
        this.parseData();
    }

    parseData = () => {
        for (let i = 0; i < this.mapOfElements.length; i++) {
            for (let j = 0; j < this.mapOfElements.length; j++) {
                if (this.mapOfElements[i][j] === -1) {
                    this.basicPlayerPos = {
                        x: i * this.tilesWidth,
                        y: j * this.tilesHeight,
                        w: 48,
                        h: 48
                    }
                }
                if (this.mapOfElements[i][j] === 2) {
                    const obstacle = new Obstacle({
                        x: i * this.tilesWidth,
                        y: j * this.tilesHeight,
                        w: this.tilesWidth,
                        h: this.tilesHeight
                    });
                    obstacle.animation.textures.cutSize = 8;
                    this.obstacles.push(obstacle);
                }


                if (this.mapOfElements[i][j] === 3) {
                    const movingObstacle = new Obstacle({
                        x: i * this.tilesWidth,
                        y: j * this.tilesHeight,
                        w: this.tilesWidth,
                        h: this.tilesHeight
                    });
                    movingObstacle.animation.action = "movingObstacle";
                    movingObstacle.animation.textures.cutSize = 16;
                    this.obstacles.push(movingObstacle);
                }


                if (this.mapOfElements[i][j] === 1) {
                    const exitObstacle = new Obstacle({
                        x: i * this.tilesWidth,
                        y: j * this.tilesHeight,
                        w: this.tilesWidth,
                        h: this.tilesHeight
                    });
                    exitObstacle.animation.action = "exitObstacle";
                    this.obstacles.push(exitObstacle);
                }
            }
        }
    }
    /*
    generate() {
        console.log("called now")
        for (let tiles of this.obstacles) {
            tiles.animation.animate(this.ctx);
        }
        /*for (let i = 0; i < this.mapOfElements.length; i++) {
            for (let j = 0; j < this.mapOfElements.length; j++) {
                if (this.mapOfElements[i][j] === 2) {
                    this.ctx.save();
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }

                if (this.mapOfElements[i][j] === 3) {
                    this.ctx.save();
                    this.ctx.fillStyle = "blue";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }

                if (this.mapOfElements[i][j] === 1) {
                    this.ctx.save();
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(i * this.tilesWidth, j * this.tilesHeight, this.tilesWidth, this.tilesHeight);
                    this.ctx.restore();
                }
            }
        }
    }*/

    getPlayerPos = () => {
        if (this.basicPlayerPos === null) {
            throw new Error("Player position is not defined");
        }
        return this.basicPlayerPos;
    }

    getObstacles = () => {
        return this.obstacles;
    }
}