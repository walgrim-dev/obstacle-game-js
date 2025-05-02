import Obstacle from "../obstacles/Obstacle.js";
import TileInfo from "../coordinates/TileInfo.js";
import GameEngine from "../game/GameEngine.js";

export default class LevelDesign {
    constructor(mapOfElements, canvas, ctx) {
        this.mapOfElements = mapOfElements;
        this.canvas = canvas;
        this.ctx = ctx;
        this.obstacles = [];
        this.tilesWidth = this.canvas.width / 20;
        this.tilesHeight = this.canvas.width / 20;
        this.basicPlayerPos = null;
        this.parseData();
    }

    parseData = () => {
        for (let i = 0; i < this.mapOfElements.length; i++) {
            for (let j = 0; j < this.mapOfElements.length; j++) {
                if (this.mapOfElements[i][j] === -1) {
                    this.basicPlayerPos = {
                        x: i * this.tilesWidth+1,
                        y: j * this.tilesHeight+1
                    }
                }
                if (this.mapOfElements[i][j] === 2) {
                    const tileInfo = new TileInfo(j * this.tilesWidth,
                        i * this.tilesHeight, 0, 0, this.tilesWidth, this.tilesHeight, 8, "idle");
                    const obstacle = new Obstacle(tileInfo);
                    this.obstacles.push(obstacle);
                }


                if (this.mapOfElements[i][j] === 3) {
                    const tileInfo = new TileInfo(j * this.tilesWidth,
                        i * this.tilesHeight + (this.tilesHeight * 0.05 / 2), 400, 400, this.tilesWidth, this.tilesHeight*0.95, 16, "movingObstacle");
                    const movingObstacle = new Obstacle(tileInfo);
                    this.obstacles.push(movingObstacle);
                }


                if (this.mapOfElements[i][j] === 1) {
                    const tileInfo = new TileInfo(j * this.tilesWidth,
                        i * this.tilesHeight, 20, 20, this.tilesWidth, this.tilesHeight, 16, "exitObstacle");
                    const exitObstacle = new Obstacle(tileInfo);
                    this.obstacles.push(exitObstacle);
                }
            }
        }
    }

    getPlayerStartingPos = () => {
        if (this.basicPlayerPos === null) {
            throw new Error("Player position is not defined");
        }
        const playerPos = {};
        Object.assign(playerPos, this.basicPlayerPos);
        return playerPos;
    }

    getObstacles = () => {
        return this.obstacles;
    }
}