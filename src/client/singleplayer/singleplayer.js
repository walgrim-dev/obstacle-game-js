import './css/style.css'
import GameEngine from "./js/game/GameEngine.js";

/**
 * On load
 */
export async function execSingle() {
    let gameEngine = new GameEngine('#gameCanvas');
    gameEngine.launch();
}

