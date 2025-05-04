import {ActionType} from "../action/Action.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import ShellObstacle from "../obstacles/ShellObstacle.js";
import WallObstacle from "../obstacles/WallObstacle.js";
import ExitObstacle from "../obstacles/ExitObstacle.js";

export default class LevelDesign {
    constructor(mapOfElements, canvas, ctx) {
        this.mapOfElements = mapOfElements;
        this.canvas = canvas;
        this.ctx = ctx;
        this.obstacles = [];
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
                        x: i * ScaleFactor.TILE_SIZE + 1,
                        y: j * ScaleFactor.TILE_SIZE + 1
                    }
                }
                if (this.mapOfElements[i][j] === 2) {
                    const obstacle = new WallObstacle(
                        j,
                        i,
                        0,
                        0,
                        ActionType.IDLE);
                    this.obstacles.push(obstacle);
                }
                if (this.mapOfElements[i][j] === 3) {
                    const movingObstacle = new ShellObstacle(
                        j,
                        i,
                        400,
                        400,
                        ActionType.MOVE);
                    this.obstacles.push(movingObstacle);
                }
                if (this.mapOfElements[i][j] === 1) {
                    const exitObstacle = new ExitObstacle(
                        j,
                        i,
                        0,
                        0,
                        ActionType.IDLE);
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