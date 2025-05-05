import GameEngine from "./game/GameEngine.js";

/**
 * On load
 */
window.onload = execMulti();

export async function execMulti() {
    let gameEngine = new GameEngine('#gameCanvas');
    gameEngine.launch();
}