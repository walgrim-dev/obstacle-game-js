import Obstacle from "../obstacles/Obstacle.js";
import {ActionType} from "../action/Action.js";

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
                /**
                 * Faire en sorte de prendre l'index du numéro et d'utiliser une map/pour le lier à une classe
                 * créer l'objet correspondant et le mettre dans le tableau des obstacles
                 */
                if (this.mapOfElements[i][j] === -1) {
                    this.basicPlayerPos = {
                        x: i * this.tilesWidth+1,
                        y: j * this.tilesHeight+1
                    }
                }
                if (this.mapOfElements[i][j] === 2) {
                    const obstacle = new Obstacle(
                        j * this.tilesWidth,
                        i * this.tilesHeight,
                        0,
                        0,
                        ActionType.IDLE);
                    this.obstacles.push(obstacle);
                }
                if (this.mapOfElements[i][j] === 3) {
                    const movingObstacle = new Obstacle(
                        j * this.tilesWidth,
                        i * this.tilesHeight,
                        400,
                        400,
                        ActionType.MOVE);
                    this.obstacles.push(movingObstacle);
                }
                if (this.mapOfElements[i][j] === 1) {
                    const exitObstacle = new Obstacle(
                        j * this.tilesWidth,
                        i * this.tilesHeight,
                        0,
                        0,
                        ActionType.EXIT);
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